const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// run dataset
const runDataSetSchema = mongoose.Schema({
  name: String,
  dataset: [mongoose.Mixed]
})



module.exports = mongoose.model("RunDataSet", runDataSetSchema);
