// libraries
const axios = require("axios");
const _ = require("lodash");
// helper functions
const { findMaxSubArray} = require("./arraysorting");
const { runDistance, getShortestSubarray } = require("./runSorting");
const { durations, distances } = require("./values");
const { sleep } = require("../helpers/sleep");
const { checkForTimeError } = require("./timeErrorCheck");

/**
 * This funtion takes activities in an array and then call the
 * strava api for extra infomration on those activities if neccesarray.
 * this is only needed for watts stream data or run data - both of which return a long array
 * of number representing speed/watts/ distance travelled per second on the activity.
 * @function activityLoop
 * @param data_set[], @param token String
 *  @returns data_set []
 */
async function activityLoop(data_set, token) {
  let calls = 10; // we have already made at least 8 calls - err on side of safety
  for (element of data_set) {
    if (calls === 90) {
      await sleep();
      calls = 0;
    }
    // ride block
    if (element["type"] == "Ride" || element["type"] == "VirtualRide") {
      if (element["device_watts"]) {
        let watts = await axios.get(
          `https://www.strava.com/api/v3/activities/${element.id}/streams?keys=watts,time&key_by_type=true&resolution=high`,
          { headers: { Authorization: token } }
        );
        calls++;
        if (watts["data"]["watts"]) {
          element["watt_stream"] = watts.data;
          const pbs = {};
          // checking there is time data for each second - some recording devices don't
          // if they don't i just return an empty pb array object as it interferes with accurate data
          const times = element["watt_stream"]["time"]["data"];
          const shouldBeFive = checkForTimeError(times);
          if (shouldBeFive === 5) {
            if (element["watt_stream"]["watts"]) {
              // this block gets power pbs
              for (duration of durations) {
                const maxAverage = findMaxSubArray(
                  duration,
                  element["watt_stream"]["watts"]["data"]
                );
                if (maxAverage) {
                  pbs[duration] = maxAverage;
                }
              }
            }
          }

          element["pbs"] = pbs;
        }
      }
    }
    // run block
    if (element["type"] == "Run") {
      if (element["has_heartrate"]) {
        // this block gets run pbs
        let run = await axios.get(
          `https://www.strava.com/api/v3/activities/${element.id}/streams?keys=time,heartrate,velocity_smooth&key_by_type=true&resolution=high`,
          { headers: { Authorization: token } }
        );
        calls++;
        element["run_stream"] = run.data;
        const runpbs = {};

        // checking there is time data for each second - some recording devices don't
        // if they don't i just return an empty pb array object as it interferes with accurate data.
        const times = element["run_stream"]["time"]["data"];
        const shouldBeFive = checkForTimeError(times);

        if (shouldBeFive === 5) {
          const runInMetres = runDistance(
            element["run_stream"]["distance"]["data"]
          );

          for (distance of distances) {
            // gets quickest times
            const quickest = getShortestSubarray(runInMetres, distance);

            runpbs[distance] = quickest;
          }
        }
        element["runpbs"] = runpbs;
      }
    }
  }
  return data_set;
}

module.exports = activityLoop;
