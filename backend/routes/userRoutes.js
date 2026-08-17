const express =
  require("express");


const {
  getUsers,
  createUser,
  updateUser,
  toggleUserLock,
  deleteUser,
} = require(
  "../controllers/userController"
);


const router =
  express.Router();


router.get(
  "/",
  getUsers
);


router.post(
  "/",
  createUser
);


router.put(
  "/:id",
  updateUser
);


router.patch(
  "/:id/lock",
  toggleUserLock
);


router.delete(
  "/:id",
  deleteUser
);


module.exports =
  router;