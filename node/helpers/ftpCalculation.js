/**
 * Calculates FTP based on best 12 minute
 * or 20 minute power
 * @param  obj 
 * @returns int
 */
function calcFtp (obj) {

  return Math.round(Math.max( (Number(obj["720"]) * .92), (Number(obj["1200"]) * .95)))
  
}

module.exports = {calcFtp}