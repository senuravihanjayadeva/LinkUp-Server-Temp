const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OpenToWorkSchema = new Schema(
	{
		applicantName: String,
		applyingPosition: String,
		description: String,
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

module.exports = OpenToWork = mongoose.model("OpenToWork", OpenToWorkSchema);
