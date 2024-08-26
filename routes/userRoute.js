const express = require("express");

const usercontroller = require("../controller/usercontroller");
const authorise = require("../middleware/auth");
const router = express.Router();

router.post("/register", usercontroller.register);
router.post("/login", usercontroller.login);
router.post("/userinfo", authorise.auth, usercontroller.userinfo);

module.exports = router;
