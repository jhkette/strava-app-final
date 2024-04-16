// libraries
const express = require("express");
const activitiesController = require("../controllers/activities")

const router = express.Router();

router.get("/activities/activities-list", activitiesController.importActivities);

router.get("/activities/:after", activitiesController.getLatestActivities);

router.get("/athlete", activitiesController.getAthlete);

module.exports = router;
