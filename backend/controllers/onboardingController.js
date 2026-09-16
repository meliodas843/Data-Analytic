const db =
  require(
    "../config/db"
  );

const {
  testAndReadDatabase,
} =
  require(
    "../services/externalDatabaseService"
  );

const cleanHost = (
  host
) =>
  String(
    host || ""
  )
    .trim()
    .replace(
      /^https?:\/\//,
      ""
    )
    .replace(
      /:\d+$/,
      ""
    );

const buildConfig = (
  body
) => ({
  dbType:
    String(
      body.dbType ||
        ""
    )
      .trim()
      .toLowerCase(),
  host:
    cleanHost(
      body.host
    ),
  port:
    Number(
      body.port
    ),
  database:
    String(
      body.database ||
        ""
    ).trim(),
  username:
    String(
      body.username ||
        ""
    ).trim(),
  password:
    String(
      body.password ||
        ""
    ),
});

exports.saveCompanyInfo =
  async (
    req,
    res
  ) => {
    const connection =
      await db.getConnection();

    try {
      const userId =
        req.user.id;

      const {
        registrationNumber,
        address,
        employeeCount,
        system,
        logo,
      } =
        req.body;

      await connection.beginTransaction();

      const [
        users,
      ] =
        await connection.query(
          `
          SELECT
            id,
            company_id,
            company_name,
            full_name,
            email,
            phone
          FROM users
          WHERE id = ?
          LIMIT 1
          `,
          [
            userId,
          ]
        );

      if (
        users.length ===
        0
      ) {
        await connection.rollback();

        return res
          .status(404)
          .json({
            success:
              false,

            message:
              "Хэрэглэгч олдсонгүй.",
          });
      }

      const user =
        users[0];

      const companyName =
        String(
          user.company_name ||
            ""
        ).trim();

      if (
        !companyName
      ) {
        await connection.rollback();

        return res
          .status(400)
          .json({
            success:
              false,

            message:
              "Компанийн нэр олдсонгүй.",
          });
      }

      const email =
        String(
          user.email ||
            ""
        )
          .trim()
          .toLowerCase();

      let companyId =
        user.company_id;

      if (
        companyId
      ) {
        const [
          existingCompany,
        ] =
          await connection.query(
            `
            SELECT id
            FROM companies
            WHERE id = ?
            LIMIT 1
            `,
            [
              companyId,
            ]
          );

        if (
          existingCompany.length
        ) {
          await connection.query(
            `
            UPDATE companies
            SET
              name = ?,
              email = ?,
              phone = ?,
              registration_number = ?,
              address = ?,
              employee_count = ?,
              source_system = ?,
              logo = COALESCE(?, logo),
              status = 'active'
            WHERE id = ?
            `,
            [
              companyName,
              email,
              user.phone ||
                null,
              registrationNumber ||
                null,
              address ||
                null,
              employeeCount ||
                null,
              system ||
                null,
              logo ||
                null,
              companyId,
            ]
          );
        } else {
          companyId =
            null;
        }
      }

      if (
        !companyId &&
        registrationNumber
      ) {
        const [
          companies,
        ] =
          await connection.query(
            `
            SELECT id
            FROM companies
            WHERE registration_number = ?
            LIMIT 1
            `,
            [
              registrationNumber,
            ]
          );

        if (
          companies.length
        ) {
          companyId =
            companies[0].id;

          await connection.query(
            `
            UPDATE companies
            SET
              name = ?,
              email = ?,
              phone = ?,
              address = ?,
              employee_count = ?,
              source_system = ?,
              logo = COALESCE(?, logo),
              status = 'active'
            WHERE id = ?
            `,
            [
              companyName,
              email,
              user.phone ||
                null,
              address ||
                null,
              employeeCount ||
                null,
              system ||
                null,
              logo ||
                null,
              companyId,
            ]
          );
        }
      }

      if (
        !companyId
      ) {
        const [
          result,
        ] =
          await connection.query(
            `
            INSERT INTO companies (
              name,
              domain,
              email,
              phone,
              registration_number,
              address,
              employee_count,
              source_system,
              status,
              sync_status,
              sync_time,
              logo,
              color,
              created_by
            )
            VALUES (
              ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            )
            `,
            [
              companyName,
              null,
              email,
              user.phone ||
                null,
              registrationNumber ||
                null,
              address ||
                null,
              employeeCount ||
                null,
              system ||
                null,
              "active",
              "pending",
              null,
              logo ||
                companyName
                  .charAt(0)
                  .toUpperCase(),
              "#16A34A",
              userId,
            ]
          );

        companyId =
          result.insertId;
      }

      await connection.query(
        `
        UPDATE users
        SET
          company_id = ?,
          registration_number = ?,
          company_address = ?,
          employee_count = ?,
          source_system = ?,
          onboarding_step = 2
        WHERE id = ?
        `,
        [
          companyId,
          registrationNumber ||
            null,
          address ||
            null,
          employeeCount ||
            null,
          system ||
            null,
          userId,
        ]
      );

      await connection.commit();

      return res.json({
        success:
          true,

        message:
          "Компанийн мэдээлэл хадгалагдлаа.",

        company: {
          id:
            companyId,

          name:
            companyName,

          logo:
            logo ||
            null,

          status:
            "active",
        },
      });
    } catch (
      error
    ) {
      await connection.rollback();

      console.error(
        "SAVE COMPANY INFO ERROR:",
        error
      );

      return res
        .status(500)
        .json({
          success:
            false,

          message:
            "Компанийн мэдээлэл хадгалж чадсангүй.",

          error:
            error.message,
        });
    } finally {
      connection.release();
    }
  };

exports.testConnection =
  async (
    req,
    res
  ) => {
    try {
      const {
        type,
      } =
        req.body;

      if (
        type ===
        "excel"
      ) {
        return res.json({
          success:
            true,
          message:
            "Файл сонгогдлоо.",
        });
      }

      if (
        type ===
        "1c"
      ) {
        return res
          .status(400)
          .json({
            success:
              false,
            message:
              "1C бодит холболтын adapter одоогоор тохируулагдаагүй байна.",
          });
      }

      if (
        type !==
        "database"
      ) {
        return res
          .status(400)
          .json({
            success:
              false,
            message:
              "Холболтын төрөл буруу байна.",
          });
      }

      const config =
        buildConfig(
          req.body
        );

      if (
        !config.dbType ||
        !config.host ||
        !config.port ||
        !config.database ||
        !config.username ||
        !config.password
      ) {
        return res
          .status(400)
          .json({
            success:
              false,
            message:
              "Database холболтын мэдээллийг бүрэн оруулна уу.",
          });
      }

      const result =
        await testAndReadDatabase(
          config
        );

      return res.json({
        success:
          true,
        message:
          "Холболт амжилттай.",
        connection: {
          dbType:
            result.dbType,
          database:
            result.database,
          username:
            result.username,
          version:
            result.version,
        },
        tables:
          result.tables,
        groups:
          result.groups,
        mappings:
          result.mappings,
        metrics:
          result.metrics,
        dashboards:
          result.dashboards,
      });
    } catch (
      error
    ) {
      console.error(
        "TEST CONNECTION ERROR:",
        error
      );

      return res
        .status(400)
        .json({
          success:
            false,
          message:
            "Мэдээллийн сантай холбогдож чадсангүй.",
          error:
            error.message,
        });
    }
  };

exports.saveConnection =
  async (
    req,
    res
  ) => {
    try {
      const userId =
        req.user.id;

      const {
        type,
        dbType,
        host,
        port,
        database,
        username,
        password,
        filename,
      } =
        req.body;

      if (
        !type
      ) {
        return res
          .status(400)
          .json({
            success:
              false,
            message:
              "Холболтын төрөл шаардлагатай.",
          });
      }

      let analysis =
        null;

      if (
        type ===
        "database"
      ) {
        const config =
          buildConfig(
            req.body
          );

        analysis =
          await testAndReadDatabase(
            config
          );
      }

      const [
        existing,
      ] =
        await db.query(
          `
          SELECT id
          FROM user_data_sources
          WHERE user_id = ?
          LIMIT 1
          `,
          [
            userId,
          ]
        );

      if (
        existing.length >
        0
      ) {
        await db.query(
          `
          UPDATE user_data_sources
          SET
            source_type = ?,
            db_type = ?,
            host = ?,
            port = ?,
            database_name = ?,
            username = ?,
            source_password = ?,
            file_name = ?,
            connection_status = 'connected'
          WHERE user_id = ?
          `,
          [
            type,
            dbType ||
              null,
            host
              ? cleanHost(
                  host
                )
              : null,
            port ||
              null,
            database ||
              null,
            username ||
              null,
            password ||
              null,
            filename ||
              null,
            userId,
          ]
        );
      } else {
        await db.query(
          `
          INSERT INTO user_data_sources (
            user_id,
            source_type,
            db_type,
            host,
            port,
            database_name,
            username,
            source_password,
            file_name,
            connection_status
          )
          VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
          )
          `,
          [
            userId,
            type,
            dbType ||
              null,
            host
              ? cleanHost(
                  host
                )
              : null,
            port ||
              null,
            database ||
              null,
            username ||
              null,
            password ||
              null,
            filename ||
              null,
            "connected",
          ]
        );
      }

      await db.query(
        `
        UPDATE users
        SET onboarding_step = 3
        WHERE id = ?
        `,
        [
          userId,
        ]
      );

      return res.json({
        success:
          true,
        message:
          "Холболтын мэдээлэл хадгалагдлаа.",
        analysis,
      });
    } catch (
      error
    ) {
      console.error(
        "SAVE CONNECTION ERROR:",
        error
      );

      return res
        .status(500)
        .json({
          success:
            false,
          message:
            "Холболтын мэдээлэл хадгалж чадсангүй.",
          error:
            error.message,
        });
    }
  };

exports.getDatabaseData =
  async (
    req,
    res
  ) => {
    try {
      const userId =
        req.user.id;

      const [
        rows,
      ] =
        await db.query(
          `
          SELECT
            source_type,
            db_type,
            host,
            port,
            database_name,
            username,
            source_password
          FROM user_data_sources
          WHERE user_id = ?
          LIMIT 1
          `,
          [
            userId,
          ]
        );

      if (
        rows.length ===
        0
      ) {
        return res
          .status(404)
          .json({
            success:
              false,
            message:
              "Database холболтын мэдээлэл олдсонгүй.",
          });
      }

      const source =
        rows[0];

      if (
        source.source_type !==
        "database"
      ) {
        return res
          .status(400)
          .json({
            success:
              false,
            message:
              "Энэ хэрэглэгч Database source ашиглахгүй байна.",
          });
      }

      const result =
        await testAndReadDatabase({
          dbType:
            source.db_type,
          host:
            source.host,
          port:
            source.port,
          database:
            source.database_name,
          username:
            source.username,
          password:
            source.source_password,
        });

      return res.json({
        success:
          true,
        connection: {
          dbType:
            result.dbType,
          database:
            result.database,
          username:
            result.username,
          version:
            result.version,
        },
        tables:
          result.tables,
        groups:
          result.groups,
        mappings:
          result.mappings,
        metrics:
          result.metrics,
        dashboards:
          result.dashboards,
      });
    } catch (
      error
    ) {
      console.error(
        "GET DATABASE DATA ERROR:",
        error
      );

      return res
        .status(500)
        .json({
          success:
            false,
          message:
            "Database мэдээлэл уншихад алдаа гарлаа.",
          error:
            error.message,
        });
    }
  };

exports.completeOnboarding =
  async (
    req,
    res
  ) => {
    try {
      const userId =
        req.user.id;

      const {
        selectedTables,
        mapping,
        dashboards,
        metrics,
      } =
        req.body;

      await db.query(
        `
        UPDATE users
        SET
          onboarding_completed = 1,
          onboarding_step = 4
        WHERE id = ?
        `,
        [
          userId,
        ]
      );

      return res.json({
        success:
          true,
        message:
          "Dashboard бэлэн боллоо.",
        selectedTables:
          selectedTables ||
          [],
        mapping:
          mapping ||
          [],
        dashboards:
          dashboards ||
          [],
        metrics:
          metrics ||
          {},
      });
    } catch (
      error
    ) {
      console.error(
        "COMPLETE ONBOARDING ERROR:",
        error
      );

      return res
        .status(500)
        .json({
          success:
            false,
          message:
            "Dashboard үүсгэхэд алдаа гарлаа.",
          error:
            error.message,
        });
    }
  };

exports.getStatus =
  async (
    req,
    res
  ) => {
    try {
      const userId =
        req.user.id;

      const [
        rows,
      ] =
        await db.query(
          `
          SELECT
            onboarding_step,
            onboarding_completed,
            registration_number,
            company_address,
            employee_count,
            source_system
          FROM users
          WHERE id = ?
          LIMIT 1
          `,
          [
            userId,
          ]
        );

      if (
        rows.length ===
        0
      ) {
        return res
          .status(404)
          .json({
            success:
              false,
            message:
              "Хэрэглэгч олдсонгүй.",
          });
      }

      return res.json({
        success:
          true,
        onboarding:
          rows[0],
      });
    } catch (
      error
    ) {
      return res
        .status(500)
        .json({
          success:
            false,
          message:
            "Setup мэдээлэл авахад алдаа гарлаа.",
          error:
            error.message,
        });
    }
  };