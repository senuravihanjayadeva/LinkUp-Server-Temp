const express = require("express");
const router = express.Router();

const {
  insertJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJobPermenently,
} = require("../controllers/Jobs.controller");

router.post("/user/:userId", insertJob);
router.get("/:jobId", getJobById);
router.get("/", getAllJobs);
router.put("/edit/:jobId", updateJob);
router.delete("/remove/:userId/:jobId", deleteJobPermenently);

module.exports = router;
