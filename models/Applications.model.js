const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApplicationsSchema = new Schema(
  {
    applicantName: String,
    nic: String,
    contactNumber: String,
    university: String,
    skills: String,
    languages: String,
    linkedIn: String,
    github: String,
    status: String,
    userId: mongoose.Types.ObjectId,
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jobs",
    },
  },
  { timestamps: true }
);

module.exports = Application = mongoose.model(
  "Application",
  ApplicationsSchema
);
