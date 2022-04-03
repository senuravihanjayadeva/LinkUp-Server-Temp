const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobsSchema = new Schema(
	{
		companyLogo: String,
		companyName: String,
		jobImage:String,
		position:String,
		description: String,
	},
	{ timestamps: true }
);

module.exports = Jobs = mongoose.model("Jobs", JobsSchema);
