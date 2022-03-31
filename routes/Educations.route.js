const express = require("express");
const router = express.Router();

const {
    insertEducation,
    getAllEducations,
    getEducationById,
    updateEducation,
    deleteEducationPermenently,
} = require("../controllers/Educations.controller");

router.post("/user/:userId", insertEducation);
router.get("/:educationId", getEducationById);
router.get("/", getAllEducations);
router.put("/edit/:educationId", updateEducation);
router.delete(
  "/remove/:userId/:educationId",
  deleteEducationPermenently
);

module.exports = router;
