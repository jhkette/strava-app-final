
// TSS = (sec x NP® x IF®)/(FTP x 3600) x 100
// “sec” is duration of the workout in seconds,
// “NP” is Normalized Power® (don’t worry about this for now),
// “IF” is Intensity Factor® (a percentage of your FTP; in other words how intense the effort was),
// “FTP” is Functional Threshold Power (your best average power for a one-hour race or test),
// and “3600” is the number of seconds in an hour.

// average_heartrate
// weighted_average_watts
//  moving_time
/**
 * Calculates TSS from activity
 * @param activity {}
 * @param ftp Int
 * @param bikeHrZones {}
 * @param runZones {}
 * @returns tss float
 */
function calculateTss(activity, ftp, bikeHrZones, runZones) {
  // console.log(activity, "activity for tss", bikeHrZones, runZones)
  if (activity["weighted_average_watts"]) {
    const intensityFactor = activity["weighted_average_watts"] / ftp;
    const tss =
      ((activity["moving_time"] *
        activity["weighted_average_watts"] *
        intensityFactor) /
        (ftp * 3600)) *
      100;
    return Math.round(tss);
  }
  let zones;
  if (!activity["average_heartrate"]) {
    return 0
  }
  else {
    // use different zones based on activty
    if (activity["type"] == "Ride" || element["type"] == "VirtualRide") {
      zones = bikeHrZones;
    } else {
      zones = runZones;
    }
    
  
    // tss score per hour at zones
    const tssScore = {
      1: 30,
      2: 55,
      3: 70,
      4: 80,
      5: 120,
    };
    const hours = activity["moving_time"] / 3600;
    const hr = activity["average_heartrate"];
    let tss;
    // console.log(bikeHrZones, runZones, "these are zones")
    switch (true) {
        case hr <= zones.zone1[1]:
          tss= hours * tssScore[1];
          break;
        case hr >= zones.zone2[0] && hr <= zones.zone2[1]:
          tss=  hours * tssScore[2];
          break;
        case hr >= zones.zone3[0] && hr <= zones.zone3[1]:
          tss=  hours * tssScore[3];
          break;
        case hr >= zones.zone4[0] && hr <= zones.zone4[1]:
          tss=  hours * tssScore[4];
          break;
        case hr >= zones.zone5[0] && hr <= zones.zone5[1]:
          tss= hours * tssScore[5];
          break;
        default:
          tss = 0
      }
    return Math.round(tss);
  }

}


module.exports = calculateTss;
