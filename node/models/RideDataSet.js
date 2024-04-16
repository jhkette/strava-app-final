const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rideDataSetSchema = mongoose.Schema({
  name: String,
  dataset: [mongoose.Mixed]
})



module.exports = mongoose.model("RideDataSet", rideDataSetSchema);