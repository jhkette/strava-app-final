const _ = require("lodash");
const { findMaxSubArray, quickSort } = require("../helpers/arraysorting");
const { getShortestSubarray, runDistance } = require("../helpers/runSorting");
const checkPbs = require("../helpers/checksPbs");
const calculateTss = require("../helpers/calculateTss");
const { durations } = require("../helpers/values");

/**
 * Testing  findMaxSubArray  function
 * */
describe("Testing  findMaxSubArray to detect average power for a time duration", function () {
  it("returns the correct array of averages", function () {
    const powerNums = findMaxSubArray(2, [2, 2, 2, 2, 4, 2]);
    expect(powerNums).toBe(3);
  });

  it("finds the corrects average", function () {
    const powerNums = findMaxSubArray(2, [2, 2, 2, 2, 6, 2]);

    expect(powerNums).toBe(4);
  });

  it("finds the corrects average", function () {
    const powerNums = findMaxSubArray(
      2,
      [2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 10, 20]
    );

    expect(powerNums).toBe(15);
  });
});

/**
 * Testing getShortestSubarray  function
 * */
describe("Testing getShortestSubarray function for running times ", function () {
  it("get the correct shortest subarrary", function () {
    const runNums = getShortestSubarray([2, 2, 2, 2, 4, 2], 6);
    expect(runNums).toBe(2);
  });

  it("get the correct shortest subarrary when target is actually smaller than the sum of the indexes", function () {
    const runNums = getShortestSubarray([2, 2, 2, 2, 4, 2], 5);
    expect(runNums).toBe(2);
  });

  it("getShortestSubarray works with the runDistance function to find the smallest target number", function () {
    const mappedNum = runDistance([2, 4, 5, 7, 9, 12]);
    const runNums = getShortestSubarray(mappedNum, 5);
    expect(runNums).toBe(2);
  });
});

/**
 * Testing quicksort function
 * */
describe("Testing quicksort function", function () {
  it("sorts the array correctly", function () {
    const sorted = quickSort([2, 5, 3, 1, 7]);
    expect(sorted).toStrictEqual([1, 2, 3, 5, 7]);
  });
});

/**
 * checkPbs betterCycleTimes
 */
describe("Testing the CheckPbs function", function () {
  it("it returns the correct array of informtaion - pbs should be updated", function () {
    const oldTimes = durations.reduce((o, key) => ({ ...o, [key]: 10 }), {}); // create a pbs object with low score

    const betterCycleTimes = durations.reduce(
      (o, key) => ({ ...o, [key]: 50 }),
      {}
    ); // create improved object with better scores.

    const runTimes = durations.reduce((o, key) => ({ ...o, [key]: 50 }), {});

    const activity = {
      type: "Ride",
      pbs: betterCycleTimes,
    };
    const dataSet = [];
    dataSet.push(activity);
    const [
      cyclingAllTime,
      runAllTime,
      updateFlagCycling,
      updateFlagRunning,
      ftpChange,
    ] = checkPbs(dataSet, oldTimes, runTimes);

    expect(updateFlagCycling).toBe(true);

    expect(cyclingAllTime["60"]).toStrictEqual(50);
    expect(ftpChange).toBe(true);
  });
});

/**
 *Check TSS function
 */
describe("Testing the TSS function", function () {
  it("it returns the correct number for TSS - ", function () {
    const activity = {
      moving_time: 3600,
      weighted_average_watts: 200,
      has_heartrate: false,
      average_heartrate: 114.4,
    };
    const tss = calculateTss(activity, 200);

    expect(tss).toBe(100);
  });
});

describe("Testing the TSS function", function () {
  it("it returns the correct number for TSS - ", function () {
    const activity = {
      moving_time: 3600,
      weighted_average_watts: null,
      has_heartrate: false,
      average_heartrate: null,
    };
    const tss = calculateTss(activity, 200);

    expect(tss).toBe(0);
  });
});
