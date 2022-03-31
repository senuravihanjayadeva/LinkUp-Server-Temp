const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EducationSchema = new Schema(
  {
    educationLogo: { type: String, required: false },
    period: { type: String, required: false },
    schoolName: { type: String, required: false },
    course: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = Education = mongoose.model("Education", EducationSchema);
