const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobsSchema = new Schema(
  {
    companyLogo: String,
    companyName: String,
    jobImage: String,
    position: String,
    salary: String,
    description: String,
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  { timestamps: true }
);

module.exports = Jobs = mongoose.model("Jobs", JobsSchema);
