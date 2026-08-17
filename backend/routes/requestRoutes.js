const express = require("express");

const {
  createRequest,
  getRequests,
  getRequest,
  updateRequestStatus,
  addNote,
} = require(
  "../controllers/requestController"
);


const router =
  express.Router();


/* Public contact form */

router.post(
  "/",
  createRequest
);


/* Admin */

router.get(
  "/",
  getRequests
);


router.get(
  "/:id",
  getRequest
);


router.patch(
  "/:id/status",
  updateRequestStatus
);


router.post(
  "/:id/notes",
  addNote
);


module.exports = router;