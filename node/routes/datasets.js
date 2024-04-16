const express = require("express");
const dataController = require("../controllers/dataset")




const router = express.Router();


router.get("/datasets", dataController.dataSet);


module.exports = router;
