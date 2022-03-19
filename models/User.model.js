const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(	{
    name: { type: String, required: false },
    password: { type: String, required: false },
    email: { type: String, required: false },
    applicationList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Application",
        },
    ],
    jobList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Jobs",
        },
    ],
    openToWorkList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "OpenToWork",
        },
    ],
},
{ timestamps: true });

module.exports = User = mongoose.model("User", UserSchema);