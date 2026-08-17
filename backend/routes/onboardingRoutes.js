const express =
  require(
    "express"
  );

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const {
  saveCompanyInfo,
  testConnection,
  saveConnection,
  getDatabaseData,
  completeOnboarding,
  getStatus,
} =
  require(
    "../controllers/onboardingController"
  );

const router =
  express.Router();

router.get(
  "/status",
  authMiddleware,
  getStatus
);

router.get(
  "/database-data",
  authMiddleware,
  getDatabaseData
);

router.post(
  "/company",
  authMiddleware,
  saveCompanyInfo
);

router.post(
  "/test-connection",
  authMiddleware,
  testConnection
);

router.post(
  "/connection",
  authMiddleware,
  saveConnection
);

router.post(
  "/complete",
  authMiddleware,
  completeOnboarding
);

module.exports =
  router;