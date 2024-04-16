const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const runDataSetSchema = mongoose.Schema({
  name: String,
  dataset: [mongoose.Mixed]
})



module.exports = mongoose.model("RunDataSet", runDataSetSchema);
