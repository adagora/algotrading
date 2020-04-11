
const CCAPIKey ="add96a20c913a13e371b0f9fc541974fe8e60aaa8aa0e82495515ca29133eb0c";
const CryptoCompareAPI = require("cryptocompare");
CryptoCompareAPI.setApiKey(CCAPIKey);



module.exports = {

hourlyMovingAverage : function(cryptoAsset , fiatCurrency , hours , callback){
  if(hours > 169){
    console.error("Only up to 169 hours allowed!")
    return
  }
// Print MA of the last 100 hours close price going backwards from now
  CryptoCompareAPI.histoHour(cryptoAsset, fiatCurrency)
  .then(data => {
    data = data.reverse()
    var sum = 0;
    for(var i = 0; i < hours; i++){
      sum += data[i].close;
    }
    var movingAverage = Math.floor(sum / hours);
    callback(movingAverage);
  })
  .catch(console.error)
},

dailyMovingAverage : function(cryptoAsset , fiatCurrency , days , callback){
  if(days > 365){
    console.error("Only up to 365 days allowed!")
    return
  }
// Print MA of the last 100 hours close price going backwards from now
  CryptoCompareAPI.histoDay(cryptoAsset, fiatCurrency , {limit:"none"})
  .then(data => {
    data = data.reverse()
    var sum = 0;
    for(var i = 0; i < days; i++){
      sum += data[i].close;
    }
    var movingAverage = sum / days;
    callback(movingAverage);
  })
  .catch(console.error)
},

minuteMovingAverage : function(cryptoAsset , fiatCurrency , minutes , callback){
  if(minutes > 1440){
    console.error("Only up to 1440 minutes allowed!")
    return
  }
// Print MA of the last 100 hours close price going backwards from now
  CryptoCompareAPI.histoMinute(cryptoAsset, fiatCurrency)
  .then(data => {
    data = data.reverse()
    var sum = 0;
    for(var i = 0; i < minutes; i++){
      sum += data[i].close;
    }
    var movingAverage = sum / minutes;
    callback(movingAverage);
  })
  .catch(console.error)
}

}
