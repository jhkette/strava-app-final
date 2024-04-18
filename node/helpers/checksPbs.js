const { durations, distances } = require("./values");

/**
 * @function checkPbs
 * check to see if pb have improved
 * @param dataSet []
 * @param cyclingAllTime {}
 * @param runAllTime {}
 * @returns [] an array of alltime pbs with boolean flags to see if they have changed
 */
function checkPbs(dataSet, cyclingAllTime, runAllTime) {
  let updateFlagCycling = false; // flags to check for updates
  let updateFlagRunning = false;
  let ftpChange = false;
  for (activity of dataSet) {
    // loop through activities
    if (
      (activity["type"] == "Ride" || activity["type"] == "VirtualRide") &&
      activity["pbs"]
    ) {
      // loop through bike rides
      for (duration of durations) {
        // loop through durations
        if (activity["pbs"][duration]) {
          // if key exists
          if (activity["pbs"][duration] > cyclingAllTime[duration]) {
            if (duration === "720" || "1200") {
              ftpChange = true;
            }
            updateFlagCycling = true;
            cyclingAllTime[duration] = activity["pbs"][duration];
          }
        }
      }
    }
    if (activity["type"] == "Run" && activity["runpbs"]) {
      // check runs
      for (distance of distances) {
        // loop through distances
        // if the distance has actually been run -otherwise all time pbs will be assigned null values
        if (activity["runpbs"][distance]) {
          if (activity["runpbs"][distance] < runAllTime[distance]) {
            updateFlagRunning = true;
            runAllTime[distance] = activity["runpbs"][distance];
          }
        }
        // here is am checking if the there isn't a 'runalltime' record at all for this distance
        if (activity["runpbs"][distance] && !runAllTime[distance]) {
          updateFlagRunning = true;
          runAllTime[duration] = activity["runpbs"][distance]; // if there isn't - and the activity includes this distance add it
        }
      }
    }
  }
  return [cyclingAllTime,runAllTime, updateFlagCycling, updateFlagRunning,ftpChange ];
}

module.exports = checkPbs;
