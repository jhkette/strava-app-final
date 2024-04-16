const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// ride dataset
const rideDataSetSchema = mongoose.Schema({
  name: String,
  dataset: [mongoose.Mixed]
})



module.exports = mongoose.model("RideDataSet", rideDataSetSchema);