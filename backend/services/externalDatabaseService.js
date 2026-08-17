const mysql =
  require("mysql2/promise");

const {
  Client,
} = require("pg");

const quotePostgresIdentifier = (
  value
) =>
  `"${String(value).replace(
    /"/g,
    '""'
  )}"`;

const quoteMySQLIdentifier = (
  value
) =>
  `\`${String(value).replace(
    /`/g,
    "``"
  )}\``;

async function connectPostgreSQL(
  config
) {
  const client =
    new Client({
      host:
        config.host,
      port:
        Number(
          config.port ||
            5432
        ),
      database:
        config.database,
      user:
        config.username,
      password:
        config.password,
      connectionTimeoutMillis:
        10000,
      statement_timeout:
        20000,
      query_timeout:
        20000,
    });

  await client.connect();

  return client;
}

async function connectMySQL(
  config
) {
  return mysql.createConnection({
    host:
      config.host,
    port:
      Number(
        config.port ||
          3306
      ),
    database:
      config.database,
    user:
      config.username,
    password:
      config.password,
    connectTimeout:
      10000,
  });
}

async function getPostgresRowCount(
  client,
  schema,
  table
) {
  try {
    const result =
      await client.query(`
        SELECT COUNT(*)::bigint AS total
        FROM ${quotePostgresIdentifier(
          schema
        )}.${quotePostgresIdentifier(
          table
        )}
      `);

    return Number(
      result.rows[0]
        ?.total ||
        0
    );
  } catch {
    return 0;
  }
}

async function getMySQLRowCount(
  connection,
  table
) {
  try {
    const [
      rows,
    ] =
      await connection.query(`
        SELECT COUNT(*) AS total
        FROM ${quoteMySQLIdentifier(
          table
        )}
      `);

    return Number(
      rows[0]
        ?.total ||
        0
    );
  } catch {
    return 0;
  }
}

async function getPostgreSQLTables(
  client
) {
  const tableResult =
    await client.query(`
      SELECT
        table_schema,
        table_name
      FROM information_schema.tables
      WHERE table_type = 'BASE TABLE'
        AND table_schema NOT IN (
          'pg_catalog',
          'information_schema'
        )
      ORDER BY
        table_schema,
        table_name
    `);

  const tables = [];

  for (
    const table
    of tableResult.rows
  ) {
    const columnResult =
      await client.query(
        `
        SELECT
          column_name,
          data_type,
          udt_name,
          is_nullable,
          column_default
        FROM information_schema.columns
        WHERE table_schema = $1
          AND table_name = $2
        ORDER BY ordinal_position
        `,
        [
          table.table_schema,
          table.table_name,
        ]
      );

    const rowCount =
      await getPostgresRowCount(
        client,
        table.table_schema,
        table.table_name
      );

    tables.push({
      schema:
        table.table_schema,
      name:
        table.table_name,
      rows:
        rowCount,
      columns:
        columnResult.rows.map(
          (
            column
          ) => ({
            name:
              column.column_name,
            type:
              column.data_type,
            nativeType:
              column.udt_name,
            nullable:
              column.is_nullable ===
              "YES",
            default:
              column.column_default,
          })
        ),
    });
  }

  return tables;
}

async function getMySQLTables(
  connection,
  database
) {
  const [
    tableRows,
  ] =
    await connection.query(
      `
      SELECT
        TABLE_NAME
      FROM information_schema.TABLES
      WHERE TABLE_SCHEMA = ?
        AND TABLE_TYPE = 'BASE TABLE'
      ORDER BY TABLE_NAME
      `,
      [
        database,
      ]
    );

  const tables = [];

  for (
    const table
    of tableRows
  ) {
    const tableName =
      table.TABLE_NAME;

    const [
      columnRows,
    ] =
      await connection.query(
        `
        SELECT
          COLUMN_NAME,
          DATA_TYPE,
          COLUMN_TYPE,
          IS_NULLABLE,
          COLUMN_DEFAULT
        FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = ?
          AND TABLE_NAME = ?
        ORDER BY ORDINAL_POSITION
        `,
        [
          database,
          tableName,
        ]
      );

    const rowCount =
      await getMySQLRowCount(
        connection,
        tableName
      );

    tables.push({
      schema:
        database,
      name:
        tableName,
      rows:
        rowCount,
      columns:
        columnRows.map(
          (
            column
          ) => ({
            name:
              column.COLUMN_NAME,
            type:
              column.DATA_TYPE,
            nativeType:
              column.COLUMN_TYPE,
            nullable:
              column.IS_NULLABLE ===
              "YES",
            default:
              column.COLUMN_DEFAULT,
          })
        ),
    });
  }

  return tables;
}

const normalizeName = (
  value
) =>
  String(
    value || ""
  )
    .toLowerCase()
    .replace(
      /[^a-z0-9]/g,
      ""
    );

const containsAny = (
  text,
  words
) =>
  words.some(
    (word) =>
      text.includes(
        normalizeName(
          word
        )
      )
  );

function detectCategory(
  table
) {
  const tableName =
    normalizeName(
      table.name
    );

  const columns =
    table.columns.map(
      (column) =>
        normalizeName(
          column.name
        )
    );

  const combined =
    [
      tableName,
      ...columns,
    ].join(" ");

  if (
    containsAny(
      combined,
      [
        "customer",
        "client",
        "partner",
        "contact",
        "buyer",
      ]
    )
  ) {
    return "customers";
  }

  if (
    containsAny(
      combined,
      [
        "product",
        "item",
        "inventory",
        "stock",
        "warehouse",
        "material",
      ]
    )
  ) {
    return "inventory";
  }

  if (
    containsAny(
      combined,
      [
        "sale",
        "sales",
        "order",
        "invoice",
        "revenue",
      ]
    )
  ) {
    return "sales";
  }

  if (
    containsAny(
      combined,
      [
        "payment",
        "account",
        "journal",
        "ledger",
        "transaction",
        "expense",
        "income",
        "cash",
        "receivable",
        "payable",
      ]
    )
  ) {
    return "finance";
  }

  return "other";
}

function buildGroups(
  tables
) {
  const map = {
    finance: {
      id:
        "finance",
      name:
        "Санхүү",
      items:
        [],
    },
    customers: {
      id:
        "customers",
      name:
        "Харилцагч",
      items:
        [],
    },
    inventory: {
      id:
        "inventory",
      name:
        "Бараа",
      items:
        [],
    },
    sales: {
      id:
        "sales",
      name:
        "Борлуулалт",
      items:
        [],
    },
    other: {
      id:
        "other",
      name:
        "Бусад",
      items:
        [],
    },
  };

  for (
    const table
    of tables
  ) {
    const category =
      detectCategory(
        table
      );

    map[
      category
    ].items.push({
      schema:
        table.schema,
      name:
        table.name,
      rows:
        table.rows,
      columns:
        table.columns,
      selected:
        true,
    });
  }

  return Object.values(
    map
  ).filter(
    (group) =>
      group.items.length >
      0
  );
}

const findMatchingColumns = (
  tables,
  keywords
) => {
  const matches = [];

  for (
    const table
    of tables
  ) {
    for (
      const column
      of table.columns
    ) {
      const normalized =
        normalizeName(
          column.name
        );

      if (
        keywords.some(
          (
            keyword
          ) =>
            normalized.includes(
              normalizeName(
                keyword
              )
            )
        )
      ) {
        matches.push({
          schema:
            table.schema,
          table:
            table.name,
          column:
            column.name,
        });
      }
    }
  }

  return matches;
};

function buildMappings(
  tables
) {
  const definitions = [
    {
      id:
        "income",
      icon:
        "💰",
      name:
        "Орлого (Income)",
      keywords: [
        "income",
        "revenue",
        "sales",
        "amount",
        "total",
      ],
    },
    {
      id:
        "expense",
      icon:
        "📊",
      name:
        "Зардал (Expense)",
      keywords: [
        "expense",
        "cost",
        "purchase",
        "debit",
      ],
    },
    {
      id:
        "cash",
      icon:
        "🏦",
      name:
        "Мөнгөн хөрөнгө (Cash)",
      keywords: [
        "cash",
        "balance",
        "bank",
        "payment",
      ],
    },
    {
      id:
        "receivable",
      icon:
        "📥",
      name:
        "Авлага (Receivable)",
      keywords: [
        "receivable",
        "customerbalance",
        "amountdue",
        "dueamount",
      ],
    },
    {
      id:
        "payable",
      icon:
        "📤",
      name:
        "Өглөг (Payable)",
      keywords: [
        "payable",
        "supplierbalance",
        "vendorbalance",
      ],
    },
    {
      id:
        "inventory",
      icon:
        "📦",
      name:
        "Бараа материал (Inventory)",
      keywords: [
        "inventory",
        "stock",
        "quantity",
        "qty",
      ],
    },
  ];

  return definitions.map(
    (
      definition
    ) => {
      const matches =
        findMatchingColumns(
          tables,
          definition.keywords
        );

      return {
        id:
          definition.id,
        icon:
          definition.icon,
        name:
          definition.name,
        matches,
        count:
          matches.length,
        status:
          matches.length >
          0
            ? "Таарсан"
            : "Олдсонгүй",
      };
    }
  );
}

const numericTypes = [
  "smallint",
  "integer",
  "bigint",
  "decimal",
  "numeric",
  "real",
  "double precision",
  "float",
  "double",
  "tinyint",
  "mediumint",
  "int",
];

const isNumericColumn = (
  column
) =>
  numericTypes.some(
    (
      type
    ) =>
      String(
        column.type ||
          ""
      )
        .toLowerCase()
        .includes(
          type
        )
  );

const scoreAmountColumn = (
  column
) => {
  const name =
    normalizeName(
      column.name
    );

  let score = 0;

  if (
    name.includes(
      "revenue"
    )
  ) {
    score += 15;
  }

  if (
    name.includes(
      "income"
    )
  ) {
    score += 15;
  }

  if (
    name.includes(
      "totalamount"
    )
  ) {
    score += 12;
  }

  if (
    name.includes(
      "amount"
    )
  ) {
    score += 8;
  }

  if (
    name.includes(
      "total"
    )
  ) {
    score += 5;
  }

  if (
    name.includes(
      "price"
    )
  ) {
    score += 2;
  }

  if (
    name.includes(
      "cost"
    ) ||
    name.includes(
      "expense"
    )
  ) {
    score -= 8;
  }

  return score;
};

async function calculatePostgresIncome(
  client,
  tables
) {
  const candidates = [];

  for (
    const table
    of tables
  ) {
    for (
      const column
      of table.columns
    ) {
      if (
        !isNumericColumn(
          column
        )
      ) {
        continue;
      }

      const score =
        scoreAmountColumn(
          column
        );

      if (
        score <= 0
      ) {
        continue;
      }

      candidates.push({
        schema:
          table.schema,
        table:
          table.name,
        column:
          column.name,
        score,
      });
    }
  }

  candidates.sort(
    (
      a,
      b
    ) =>
      b.score -
      a.score
  );

  if (
    !candidates.length
  ) {
    return {
      total:
        null,
      source:
        null,
    };
  }

  const candidate =
    candidates[0];

  try {
    const result =
      await client.query(`
        SELECT
          COALESCE(
            SUM(
              ${quotePostgresIdentifier(
                candidate.column
              )}
            ),
            0
          ) AS total
        FROM
          ${quotePostgresIdentifier(
            candidate.schema
          )}.${quotePostgresIdentifier(
            candidate.table
          )}
      `);

    return {
      total:
        Number(
          result.rows[0]
            ?.total ||
            0
        ),
      source:
        candidate,
    };
  } catch {
    return {
      total:
        null,
      source:
        null,
    };
  }
}

async function calculateMySQLIncome(
  connection,
  tables
) {
  const candidates = [];

  for (
    const table
    of tables
  ) {
    for (
      const column
      of table.columns
    ) {
      if (
        !isNumericColumn(
          column
        )
      ) {
        continue;
      }

      const score =
        scoreAmountColumn(
          column
        );

      if (
        score <= 0
      ) {
        continue;
      }

      candidates.push({
        table:
          table.name,
        column:
          column.name,
        score,
      });
    }
  }

  candidates.sort(
    (
      a,
      b
    ) =>
      b.score -
      a.score
  );

  if (
    !candidates.length
  ) {
    return {
      total:
        null,
      source:
        null,
    };
  }

  const candidate =
    candidates[0];

  try {
    const [
      rows,
    ] =
      await connection.query(`
        SELECT
          COALESCE(
            SUM(
              ${quoteMySQLIdentifier(
                candidate.column
              )}
            ),
            0
          ) AS total
        FROM
          ${quoteMySQLIdentifier(
            candidate.table
          )}
      `);

    return {
      total:
        Number(
          rows[0]
            ?.total ||
            0
        ),
      source:
        candidate,
    };
  } catch {
    return {
      total:
        null,
      source:
        null,
    };
  }
}

function buildDashboardDefinitions(
  groups,
  mappings
) {
  const dashboards = [
    {
      id:
        "overview",
      icon:
        "📊",
      name:
        "Удирдлагын самбар",
      ready:
        groups.length >
        0,
    },
  ];

  const definitions = [
    {
      id:
        "receivable",
      icon:
        "📥",
      name:
        "Авлага",
    },
    {
      id:
        "payable",
      icon:
        "📤",
      name:
        "Өглөг",
    },
    {
      id:
        "income",
      icon:
        "💰",
      name:
        "Орлого/Зардал",
    },
    {
      id:
        "cash",
      icon:
        "🏦",
      name:
        "Мөнгөн урсгал",
    },
    {
      id:
        "inventory",
      icon:
        "📦",
      name:
        "Бараа материал",
    },
  ];

  for (
    const definition
    of definitions
  ) {
    const mapping =
      mappings.find(
        (item) =>
          item.id ===
          definition.id
      );

    dashboards.push({
      id:
        definition.id,
      icon:
        definition.icon,
      name:
        definition.name,
      ready:
        Boolean(
          mapping &&
            mapping.count >
              0
        ),
    });
  }

  return dashboards;
}

async function readPostgreSQLDatabase(
  config
) {
  const client =
    await connectPostgreSQL(
      config
    );

  try {
    const info =
      await client.query(`
        SELECT
          current_database() AS database_name,
          current_user AS username,
          version() AS version
      `);

    const tables =
      await getPostgreSQLTables(
        client
      );

    const groups =
      buildGroups(
        tables
      );

    const mappings =
      buildMappings(
        tables
      );

    const income =
      await calculatePostgresIncome(
        client,
        tables
      );

    const dashboards =
      buildDashboardDefinitions(
        groups,
        mappings
      );

    return {
      connected:
        true,
      dbType:
        "postgresql",
      database:
        info.rows[0]
          .database_name,
      username:
        info.rows[0]
          .username,
      version:
        info.rows[0]
          .version,
      tables,
      groups,
      mappings,
      metrics: {
        tableCount:
          tables.length,
        totalRows:
          tables.reduce(
            (
              total,
              table
            ) =>
              total +
              Number(
                table.rows ||
                  0
              ),
            0
          ),
        incomeTotal:
          income.total,
        incomeSource:
          income.source,
      },
      dashboards,
    };
  } finally {
    await client.end();
  }
}

async function readMySQLDatabase(
  config
) {
  const connection =
    await connectMySQL(
      config
    );

  try {
    const [
      infoRows,
    ] =
      await connection.query(`
        SELECT
          DATABASE() AS database_name,
          CURRENT_USER() AS username,
          VERSION() AS version
      `);

    const tables =
      await getMySQLTables(
        connection,
        config.database
      );

    const groups =
      buildGroups(
        tables
      );

    const mappings =
      buildMappings(
        tables
      );

    const income =
      await calculateMySQLIncome(
        connection,
        tables
      );

    const dashboards =
      buildDashboardDefinitions(
        groups,
        mappings
      );

    return {
      connected:
        true,
      dbType:
        "mysql",
      database:
        infoRows[0]
          .database_name,
      username:
        infoRows[0]
          .username,
      version:
        infoRows[0]
          .version,
      tables,
      groups,
      mappings,
      metrics: {
        tableCount:
          tables.length,
        totalRows:
          tables.reduce(
            (
              total,
              table
            ) =>
              total +
              Number(
                table.rows ||
                  0
              ),
            0
          ),
        incomeTotal:
          income.total,
        incomeSource:
          income.source,
      },
      dashboards,
    };
  } finally {
    await connection.end();
  }
}

async function testAndReadDatabase(
  config
) {
  if (
    config.dbType ===
    "postgresql"
  ) {
    return readPostgreSQLDatabase(
      config
    );
  }

  if (
    config.dbType ===
    "mysql"
  ) {
    return readMySQLDatabase(
      config
    );
  }

  if (
    config.dbType ===
    "mssql"
  ) {
    throw new Error(
      "Microsoft SQL Server одоогоор тохируулагдаагүй байна."
    );
  }

  throw new Error(
    "Database төрөл буруу байна."
  );
}

module.exports = {
  testAndReadDatabase,
};