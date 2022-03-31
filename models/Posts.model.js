const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostsSchema = new Schema(
	{
		fullName: String,
		position: String,
		profileImageURL: String,
        postImage: String,
        description: String,
	},
	{ timestamps: true }
);

module.exports = Posts = mongoose.model("Posts", PostsSchema);
