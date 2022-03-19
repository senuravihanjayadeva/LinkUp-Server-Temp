const express = require("express");
const router = express.Router();

const {
	insertOpenToWork,
	getAllOpenToWorks,
	getOpenToWorkById,
	updateOpenToWork,
	deleteOpenToWorkPermenently,
} = require("../controllers/OpenToWorks.controller");

router.post("/user/:userId", insertOpenToWork);
router.get("/:openToWorkId", getOpenToWorkById);
router.get("/", getAllOpenToWorks);
router.put("/edit/:openToWorkId", updateOpenToWork);
router.delete(
  "/remove/:userId/:openToWorkId",
  deleteOpenToWorkPermenently
);
module.exports = router;
