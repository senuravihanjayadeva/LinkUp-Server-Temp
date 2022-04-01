const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getUserDetails, loginUser, registerUser, updateUser, deleteUserPermenently 
} = require("../controllers/User.controller");


router.delete("/remove/:userId",auth, deleteUserPermenently);
router.post("/register", registerUser);
router.put("/edit",auth, updateUser);
router.post("/login", loginUser);
router.get("/",auth, getUserDetails);

module.exports = router;