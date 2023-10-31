const express = require("express");
const router = express.Router();
const{getAllUsers, postUser, loginUser} = require("../controllers/user");
//const { route } = require("./product");


router.route("/").get(getAllUsers);
router.route("/signUp").post(postUser);
router.route("/logIn").post(loginUser);
module.exports = router;