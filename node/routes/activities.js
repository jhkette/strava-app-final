// libraries
const express = require("express");

const activitiesController = require("../controllers/activities")

const router = express.Router();

/**
 * get api/user/activities/activities-list
 * this imports all activities
 */
router.get("/activities/activities-list", activitiesController.importActivities);

/**
 * get api/user/activities/activities-after
 * this gets activities after
 */
router.get("/activities/:after", activitiesController.getLatestActivities);

/**
 * get api/user/athlete
 * this gets athlete
 */
router.get("/athlete", activitiesController.getAthlete);

module.exports = router;
