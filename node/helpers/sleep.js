// https://www.sitepoint.com/delay-sleep-pause-wait/

/**
 * Function that pauses server 15min 03 seconds.
 * @function sleep
 * @returns Promise
 */

function sleep() {
    console.log("sleep running")
    return new Promise(resolve => setTimeout(resolve, (15 * 60 * 1000) + 3000));
}

module.exports = {sleep}