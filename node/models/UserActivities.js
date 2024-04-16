const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// userActivities schema
const userActivitiesSchema = mongoose.Schema({
  athlete_id: {
    type: Number,
    required: true,
  },
  activities: {
    type: [mongoose.Mixed],
  },

  cyclingMaxHr: {
    type: Number,
  },
  runningMaxHr: {
    type: Number,
  },
  cyclingFTP: {
    type: Number,
  },
 
  bikeHrZones: {
    zone1: {
      type: [Number],
    },
    zone2: {
      type: [Number],
    },
    zone3: {
      type: [Number],
    },
    zone4: {
      type: [Number],
    },
    zone5: {
      type: [Number],
    },
  },

  runHrZones: {
    zone1: {
      type: [Number],
    },
    zone2: {
      type: [Number],
    },
    zone3: {
      type: [Number],
    },
    zone4: {
      type: [Number],
    },
    zone5: {
      type: [Number],
    },
  },

  cyclingpbs: {
    15: {
      type: Number,
    },
    30: {
      type: Number,
    },
    60: {
      type: Number,
    },
    90: {
      type: Number,
    },
    120: {
      type: Number,
    },
    150: {
      type: Number,
    },
    180: {
      type: Number,
    },
    210: {
      type: Number,
    },
    240: {
      type: Number,
    },
    270: {
      type: Number,
    },
    300: {
      type: Number,
    },
    330: {
      type: Number,
    },
    360: {
      type: Number,
    },
    390: {
      type: Number,
    },
    410: {
      type: Number,
    },
    440: {
      type: Number,
    },
    480: {
      type: Number,
    },
    600: {
      type: Number,
    },
    720: {
      type: Number,
    },
    900: {
      type: Number,
    },
    1200: {
      type: Number,
    },
    1800: {
      type: Number,
    },
    2700:{
      type: Number,
    },
    3600: {
      type: Number,
    },
  },

  runningpbs: {
    400: {
      type: Number,
    },
    800: {
      type: Number,
    },
    1000: {
      type: Number,
    },
    2414: {
      type: Number,
    },
    3000: {
      type: Number,
    },
    5000: {
      type: Number,
    },
    10000: {
      type: Number,
    },
  },
});

module.exports = mongoose.model("UserActivities", userActivitiesSchema);
