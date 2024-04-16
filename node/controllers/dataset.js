const RunDataSet = require("../models/RunDataSets");
const RideDataSet = require("../models/RideDataSet");



// exports datasets to frontend
exports.dataSet = async (req, res) => {
  const marathon = await RunDataSet.find({ name: "marathon" });
  const half = await RunDataSet.find({ name: "half marathon" });
  const hardknott= await RideDataSet.find({ name: "Hardknott pass" });
  const scotland= await RideDataSet.find({ name: "Bealach-na-ba" });

  res.send({ marathon, half,  hardknott, scotland });
};
