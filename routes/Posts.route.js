const express = require("express");
const router = express.Router();

const {
    insertPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePostPermenently,
} = require("../controllers/Posts.controller");

router.post("/user/:userId", insertPost);
router.get("/:postId", getPostById);
router.get("/", getAllPosts);
router.put("/edit/:postId", updatePost);
router.delete("/remove/:userId/:postId", deletePostPermenently);

module.exports = router;
