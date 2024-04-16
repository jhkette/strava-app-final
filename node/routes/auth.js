const express = require("express");
const authController = require("../controllers/auth")


const router = express.Router();



router.get("/link", authController.link);

router.get("/login", authController.login);

router.get("/authorise", authController.authorisation);

router.get("/logout", authController.logout);



module.exports = router;
