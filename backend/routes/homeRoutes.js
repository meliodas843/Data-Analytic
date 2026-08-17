const express = require("express");

const {
  getHomeContent,
  saveHomeContent,
} = require("../controllers/homeController");

const router = express.Router();


// GET HOME PAGE CONTENT
router.get("/", getHomeContent);


// SAVE HOME PAGE CONTENT
router.put("/", saveHomeContent);


module.exports = router;