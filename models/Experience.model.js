const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExperienceSchema = new Schema(
  {
    companyLogo: { type: String, required: false },
    position: { type: String, required: false },
    companyName: { type: String, required: false },
    description: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = Experience = mongoose.model("Experience", ExperienceSchema);
