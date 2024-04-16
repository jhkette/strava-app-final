const express = require("express");
const authController = require("../controllers/auth")


const router = express.Router();

/**
 * get api/auth/link
 * this gets link for client
 */

router.get("/link", authController.link);

/**
 * get api/auth/login
 * handles login
 */
router.get("/login", authController.login);

/**
 * get api/auth/authorise
 * handles authorisation with strava
 */
router.get("/authorise", authController.authorisation);

/**
 * get api/auth/logout
 * logs out user
 */
router.get("/logout", authController.logout);



module.exports = router;
