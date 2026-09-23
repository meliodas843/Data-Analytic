const express =
  require("express");

const {
  signup,
  login,
  demoLogin,
  me,
  updateProfile,
  changePassword,
} = require(
  "../controllers/authController"
);

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const router =
  express.Router();

router.post(
  "/signup",
  signup
);

router.post(
  "/login",
  login
);

router.post(
  "/demo-login",
  demoLogin
);

router.get(
  "/me",
  authMiddleware,
  me
);

router.put(
  "/profile",
  authMiddleware,
  updateProfile
);

router.put(
  "/password",
  authMiddleware,
  changePassword
);

module.exports =
  router;