const express = require("express");

const {
  testConnection,
  saveConnection,
  getTables,
} = require(
  "../controllers/companyDatabaseController"
);

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

router.post(
  "/test",
  authMiddleware,
  testConnection
);

router.post(
  "/",
  authMiddleware,
  saveConnection
);

router.get(
  "/tables",
  authMiddleware,
  getTables
);

module.exports = router;