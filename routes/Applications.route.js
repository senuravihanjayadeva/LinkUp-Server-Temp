const express = require("express");
const router = express.Router();

const {
	insertApplication,
	getAllApplications,
	getApplicationById,
	getApplicationByUserId,
	updateApplication,
	deleteApplicationPermenently,
} = require("../controllers/Applications.controller");

router.post("/user/:userId", insertApplication);
router.get("/:applicationId", getApplicationById);
router.get("/user/:userId", getApplicationByUserId);
router.get("/", getAllApplications);
router.put("/edit/:applicationId", updateApplication);
router.delete(
  "/remove/:userId/:applicationId",
  deleteApplicationPermenently
);

module.exports = router;
