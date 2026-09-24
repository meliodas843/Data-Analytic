const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/verify-email", authController.verifyEmail);
router.post("/resend-verification", authController.resendVerification);
router.post("/login", authController.login);

router.post("/forgot-password", authController.forgotPassword);
router.post("/verify-reset-code", authController.verifyResetCode);
router.post("/reset-password", authController.resetPassword);

router.post(
  "/request-password-change",
  authMiddleware,
  authController.requestPasswordChange
);

router.post(
  "/verify-password-change",
  authMiddleware,
  authController.verifyPasswordChange
);

router.post(
  "/change-password",
  authMiddleware,
  authController.changePassword
);

router.get("/me", authMiddleware, authController.me);
router.post("/logout", authMiddleware, authController.logout);

module.exports = router;