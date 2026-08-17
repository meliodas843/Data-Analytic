const db =
  require("../config/db");

const {
  Pool,
} =
  require("pg");

const createExternalPool =
  (source) => {
    return new Pool({
      host:
        source.host,

      port:
        Number(
          source.port ||
            5432
        ),

      database:
        source.database_name,

      user:
        source.username,

      password:
        source.source_password,

      max:
        2,

      idleTimeoutMillis:
        10000,

      connectionTimeoutMillis:
        10000,
    });
  };

const getUserDataSource =
  async (userId) => {
    const [
      sources,
    ] =
      await db.query(
        `
        SELECT
          id,
          user_id,
          source_type,
          host,
          port,
          database_name,
          username,
          source_password,
          external_company_id,
          file_name,
          connection_status
        FROM user_data_sources
        WHERE user_id = ?
          AND connection_status = 'connected'
        ORDER BY id DESC
        LIMIT 1
        `,
        [
          userId,
        ]
      );

    if (
      sources.length ===
      0
    ) {
      return null;
    }

    return sources[0];
  };

exports.getOverviewKpis =
  async (
    req,
    res
  ) => {
    let externalDb =
      null;

    try {
      const userId =
        req.user.id;

      const source =
        await getUserDataSource(
          userId
        );

      if (!source) {
        return res
          .status(404)
          .json({
            success:
              false,

            message:
              "Холбогдсон мэдээллийн сан олдсонгүй.",
          });
      }

      if (
        source.source_type !==
          "database" &&
        source.source_type !==
          "postgresql" &&
        source.source_type !==
          "postgres"
      ) {
        return res
          .status(400)
          .json({
            success:
              false,

            message:
              "KPI мэдээллийг PostgreSQL мэдээллийн сангаас авах боломжтой.",
          });
      }

      externalDb =
        createExternalPool(
          source
        );

      const result =
        await externalDb.query(
          `
          SELECT
            ABS(
              COALESCE(
                SUM(
                  CASE
                    WHEN aa.account_type = 'income'
                    THEN aml.balance
                  END
                ),
                0
              )
              +
              COALESCE(
                SUM(
                  CASE
                    WHEN aa.account_type = 'income_other'
                    THEN aml.balance
                  END
                ),
                0
              )
            ) AS revenue,

            COALESCE(
              SUM(
                CASE
                  WHEN aa.account_type = 'expense_direct_cost'
                  THEN aml.balance
                END
              ),
              0
            )
            +
            COALESCE(
              SUM(
                CASE
                  WHEN aa.account_type = 'expense'
                  THEN aml.balance
                END
              ),
              0
            ) AS expense,

            COALESCE(
              SUM(
                CASE
                  WHEN aa.account_type = 'asset_receivable'
                    AND am.move_type = 'out_invoice'
                  THEN aml.amount_residual
                END
              ),
              0
            ) AS receivable,

            -COALESCE(
              SUM(
                CASE
                  WHEN aa.account_type = 'liability_payable'
                  THEN aml.amount_residual
                END
              ),
              0
            ) AS payable

          FROM public.account_move_line aml

          LEFT JOIN public.res_branch rb
            ON rb.id = aml.branch_id

          LEFT JOIN public.account_account aa
            ON aa.id = aml.account_id

          LEFT JOIN public.account_move am
            ON am.id = aml.move_id

          LEFT JOIN public.res_partner rp
            ON rp.id = aml.partner_id

          LEFT JOIN public.res_company rc
            ON rc.id = aml.company_id

          LEFT JOIN public.account_code_type act
            ON aa.code_group_id = act.id

          WHERE am.state = 'posted'
          `
        );

      const row =
        result.rows[0] ||
        {};

      const revenue =
        Number(
          row.revenue ||
            0
        );

      const expense =
        Number(
          row.expense ||
            0
        );

      const receivable =
        Number(
          row.receivable ||
            0
        );

      const payable =
        Number(
          row.payable ||
            0
        );

      return res.json({
        success:
          true,

        kpis: {
          revenue,
          expense,
          receivable,
          payable,
        },
      });
    } catch (
      error
    ) {
      console.error(
        "GET OVERVIEW KPIS ERROR:",
        error
      );

      return res
        .status(500)
        .json({
          success:
            false,

          message:
            "Dashboard KPI мэдээлэл авахад алдаа гарлаа.",

          error:
            error.message,
        });
    } finally {
      if (
        externalDb
      ) {
        try {
          await externalDb.end();
        } catch (
          error
        ) {
          console.error(
            "POSTGRES POOL CLOSE ERROR:",
            error.message
          );
        }
      }
    }
  };

exports.getDashboardConnectionStatus =
  async (
    req,
    res
  ) => {
    try {
      const userId =
        req.user.id;

      const source =
        await getUserDataSource(
          userId
        );

      if (!source) {
        return res.json({
          success:
            true,

          connected:
            false,

          source:
            null,
        });
      }

      return res.json({
        success:
          true,

        connected:
          true,

        source: {
          id:
            source.id,

          type:
            source.source_type,

          host:
            source.host,

          port:
            source.port,

          database:
            source.database_name,

          username:
            source.username,

          status:
            source.connection_status,
        },
      });
    } catch (
      error
    ) {
      console.error(
        "GET DASHBOARD CONNECTION STATUS ERROR:",
        error
      );

      return res
        .status(500)
        .json({
          success:
            false,

          message:
            "Холболтын мэдээлэл авахад алдаа гарлаа.",

          error:
            error.message,
        });
    }
  };