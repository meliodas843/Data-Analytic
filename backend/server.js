require("dotenv").config();

const express =
  require("express");

const cors =
  require("cors");

const db =
  require("./config/db");

const homeRoutes =
  require("./routes/homeRoutes");

const companyRoutes =
  require("./routes/companyRoutes");

const requestRoutes =
  require("./routes/requestRoutes");

const userRoutes =
  require("./routes/userRoutes");

const authRoutes =
  require("./routes/authRoutes");

const companyDatabaseRoutes =
  require("./routes/companyDatabaseRoutes");

const dashboardRoutes =
  require("./routes/dashboardRoutes");

const onboardingRoutes =
  require(
    "./routes/onboardingRoutes"
  );

const app =
  express();

app.use(
  cors({
    origin:
      "http://localhost:5173",

    credentials:
      true,
  })
);

app.use(
  express.json({
    limit:
      "50mb",
  })
);

app.use(
  express.urlencoded({
    extended:
      true,

    limit:
      "50mb",
  })
);

app.get(
  "/api",
  (
    req,
    res
  ) => {
    res.json({
      success:
        true,

      message:
        "DataView backend is running",
    });
  }
);

app.use(
  "/api/home",
  homeRoutes
);

app.use(
  "/api/companies",
  companyRoutes
);

app.use(
  "/api/requests",
  requestRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/onboarding",
  onboardingRoutes
);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/company-database",
  companyDatabaseRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.get(
  "/api/db-test",
  async (
    req,
    res
  ) => {
    try {
      const [
        rows,
      ] =
        await db.query(
          `
          SELECT
            DATABASE() AS database_name
          `
        );

      return res.json({
        success:
          true,

        database:
          rows[0]
            .database_name,
      });
    } catch (
      error
    ) {
      console.error(
        "DATABASE TEST ERROR:",
        error
      );

      return res
        .status(500)
        .json({
          success:
            false,

          message:
            "Database connection failed",

          error:
            error.message,
        });
    }
  }
);

app.use(
  (
    err,
    req,
    res,
    next
  ) => {
    console.error(
      "SERVER ERROR:",
      err
    );

    if (
      err.type ===
      "entity.too.large"
    ) {
      return res
        .status(413)
        .json({
          success:
            false,

          message:
            "Request payload is too large.",
        });
    }

    return res
      .status(
        err.status ||
          500
      )
      .json({
        success:
          false,

        message:
          err.message ||
          "Internal server error",
      });
  }
);

app.use(
  (
    req,
    res
  ) => {
    return res
      .status(404)
      .json({
        success:
          false,

        message:
          `Route not found: ${req.method} ${req.originalUrl}`,
      });
  }
);

const PORT =
  process.env.PORT ||
  5000;

async function startServer() {
  try {
    const connection =
      await db.getConnection();

    console.log(
      "✅ MySQL connected successfully"
    );

    console.log(
      `✅ Database: ${process.env.DB_NAME}`
    );

    connection.release();

    app.listen(
      PORT,
      () => {
        console.log("");

        console.log(
          "================================"
        );

        console.log(
          "DataView Backend"
        );

        console.log(
          `http://localhost:${PORT}`
        );

        console.log(
          "================================"
        );
      }
    );
  } catch (
    error
  ) {
    console.error(
      "❌ MySQL connection failed:"
    );

    console.error(
      error.message
    );

    process.exit(
      1
    );
  }
}

startServer();