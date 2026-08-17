const mysql = require("mysql2/promise");
const db = require("../config/db");

function getUserId(req) {
  return (
    req.user?.id ||
    req.user?.userId ||
    null
  );
}

exports.testConnection = async (
  req,
  res
) => {
  let connection;

  try {
    const {
      databaseType,
      host,
      port,
      database,
      username,
      password,
    } = req.body;

    if (
      !host ||
      !database ||
      !username
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Database information is incomplete.",
      });
    }

    if (
      databaseType &&
      databaseType !== "mysql"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Only MySQL is currently supported.",
      });
    }

    connection =
      await mysql.createConnection({
        host,
        port: Number(port || 3306),
        user: username,
        password: password || "",
        database,
        connectTimeout: 10000,
        multipleStatements: false,
      });

    await connection.query(
      "SELECT 1 AS connected"
    );

    const [tables] =
      await connection.query(
        `
        SELECT TABLE_NAME AS table_name
        FROM information_schema.TABLES
        WHERE TABLE_SCHEMA = ?
        ORDER BY TABLE_NAME
        `,
        [database]
      );

    res.json({
      success: true,
      message:
        "Database connection successful.",
      tables: tables.map(
        (item) => item.table_name
      ),
    });
  } catch (error) {
    console.error(
      "Test company database:",
      error
    );

    res.status(400).json({
      success: false,
      message:
        "Could not connect to the database.",
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

exports.saveConnection = async (
  req,
  res
) => {
  let connection;

  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    const {
      companyName,
      databaseType,
      host,
      port,
      database,
      username,
      password,
    } = req.body;

    if (
      !companyName ||
      !host ||
      !database ||
      !username
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Required information is missing.",
      });
    }

    if (
      databaseType &&
      databaseType !== "mysql"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Only MySQL is currently supported.",
      });
    }

    connection =
      await mysql.createConnection({
        host,
        port: Number(port || 3306),
        user: username,
        password: password || "",
        database,
        connectTimeout: 10000,
        multipleStatements: false,
      });

    await connection.query(
      "SELECT 1 AS connected"
    );

    const [users] = await db.query(
      `
      SELECT
        id,
        company_id
      FROM users
      WHERE id = ?
      LIMIT 1
      `,
      [userId]
    );

    if (!users.length) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    let companyId =
      users[0].company_id;

    if (!companyId) {
      const [companyResult] =
        await db.query(
          `
          INSERT INTO companies (
            name,
            status,
            sync_status
          )
          VALUES (?, ?, ?)
          `,
          [
            companyName,
            "active",
            "connected",
          ]
        );

      companyId =
        companyResult.insertId;

      await db.query(
        `
        UPDATE users
        SET company_id = ?
        WHERE id = ?
        `,
        [companyId, userId]
      );
    } else {
      await db.query(
        `
        UPDATE companies
        SET
          name = ?,
          status = ?,
          sync_status = ?
        WHERE id = ?
        `,
        [
          companyName,
          "active",
          "connected",
          companyId,
        ]
      );
    }

    const [existing] =
      await db.query(
        `
        SELECT id
        FROM company_databases
        WHERE company_id = ?
        LIMIT 1
        `,
        [companyId]
      );

    if (existing.length) {
      await db.query(
        `
        UPDATE company_databases
        SET
          db_type = ?,
          db_host = ?,
          db_port = ?,
          db_name = ?,
          db_username = ?,
          db_password = ?,
          connection_status = ?,
          updated_at = NOW()
        WHERE company_id = ?
        `,
        [
          "mysql",
          host,
          Number(port || 3306),
          database,
          username,
          password || "",
          "connected",
          companyId,
        ]
      );
    } else {
      await db.query(
        `
        INSERT INTO company_databases (
          company_id,
          db_type,
          db_host,
          db_port,
          db_name,
          db_username,
          db_password,
          connection_status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          companyId,
          "mysql",
          host,
          Number(port || 3306),
          database,
          username,
          password || "",
          "connected",
        ]
      );
    }

    res.json({
      success: true,
      message:
        "Database configuration saved.",
      companyId,
    });
  } catch (error) {
    console.error(
      "Save company database:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Database configuration could not be saved.",
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

exports.getTables = async (
  req,
  res
) => {
  let connection;

  try {
    const userId = getUserId(req);

    const [rows] = await db.query(
      `
      SELECT
        cd.*
      FROM company_databases cd
      INNER JOIN users u
        ON u.company_id = cd.company_id
      WHERE u.id = ?
      LIMIT 1
      `,
      [userId]
    );

    if (!rows.length) {
      return res.status(404).json({
        success: false,
        message:
          "Company database is not configured.",
      });
    }

    const config = rows[0];

    connection =
      await mysql.createConnection({
        host: config.db_host,
        port: Number(
          config.db_port || 3306
        ),
        user: config.db_username,
        password: config.db_password,
        database: config.db_name,
        connectTimeout: 10000,
        multipleStatements: false,
      });

    const [tables] =
      await connection.query(
        `
        SELECT TABLE_NAME AS table_name
        FROM information_schema.TABLES
        WHERE TABLE_SCHEMA = ?
        ORDER BY TABLE_NAME
        `,
        [config.db_name]
      );

    res.json({
      success: true,
      database: config.db_name,
      tables,
    });
  } catch (error) {
    console.error(
      "Get company tables:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Could not retrieve database tables.",
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};