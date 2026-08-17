const express =
  require("express");

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const {
  getOverviewKpis,
  getDashboardConnectionStatus,
} =
  require(
    "../controllers/dashboardController"
  );

const router =
  express.Router();

router.get(
  "/overview-kpis",
  authMiddleware,
  getOverviewKpis
);

router.get(
  "/connection-status",
  authMiddleware,
  getDashboardConnectionStatus
);

module.exports =
  router;