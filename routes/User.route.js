const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getUserDetails, loginUser, registerUser 
} = require("../controllers/User.controller");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", auth, getUserDetails);

module.exports = router;