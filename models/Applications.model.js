const mongoose = require('mongoose');
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
	},
	{ timestamps: true }
);

module.exports = Application = mongoose.model("Application", ApplicationsSchema);