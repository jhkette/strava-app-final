/**
 * This reduces the times array to the distance between the times
 * it should be five - i'm trying to check the time array
 * is measure every second
 * @function checkForTimeError 
 * @param times []
 * @returns int 
 */
const checkForTimeError = (times) => {
    const checkTimes =  times.slice(1).map((v, i) => (v - times[i])).map(Number);
    const shouldBeFive = checkTimes.slice(0, 5).reduce((accumulator, currentValue) => accumulator + currentValue, 0 )

    return shouldBeFive
}

module.exports = {checkForTimeError}