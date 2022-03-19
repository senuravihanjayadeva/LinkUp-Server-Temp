const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobsSchema = new Schema(
	{
		company: String,
		position: String,
		description: String,
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

module.exports = Jobs = mongoose.model("Jobs", JobsSchema);
