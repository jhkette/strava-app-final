function calcFtp (obj) {

  return Math.round(Math.max( (Number(obj["720"]) * .92), (Number(obj["1200"]) * .95)))
  
}

module.exports = {calcFtp}