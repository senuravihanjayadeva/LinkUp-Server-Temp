const express = require("express");
const router = express.Router();

const {
    insertExperience,
    getAllExperience,
    getExperienceById,
    updateExperience,
    deleteExperiencePermenently,
} = require("../controllers/Experience.controllerr");

router.post("/user/:userId", insertExperience);
router.get("/:experienceId", getExperienceById);
router.get("/", getAllExperience);
router.put("/edit/:experienceId", updateExperience);
router.delete(
  "/remove/:userId/:experienceId",
  deleteExperiencePermenently
);

module.exports = router;
