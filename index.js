global.fetch = require("node-fetch");
const indicators = require("./indicators.js");
const exchange = require("./exchange.js");

var hasPosition = false;
var strategy = function(){
  // IF BTC < MA ==> BUY (IF WE HAVE NO POSITION)
  // IF BTC <  MA ==> sell (IF WE HAVE POSITION)
  console.log("          ");
  console.log("=====================================");
  console.log("Executing strategy");

  indicators.hourlyMovingAverage("BTC" , "USD" , 100 , function(ma){
    exchange.bitcoinPrice()
    .then(res=>{
      var price = res.last;
      console.log("MA: ", ma);
      console.log("Price: ", price);

      if(price < ma && !hasPosition){

        console.log("BUY!");
        exchange.marketBuyBitcoin()
        .then(res=>{
          console.log("Buy successful");
          hasPosition = true;

          setTimeout(strategy,1000);
        })
        .catch(error => console.error)
      }

      else if(price > ma && hasPosition){

        console.log("SELL!");
        exchange.marketBuyBitcoin()
        .then(res=>{
          console.log("Sell successful");
          hasPosition = false;

          setTimeout(strategy,1000);
        })
        .catch(error => console.error)
      }

      else{
        console.log("HOLD!");
        setTimeout(strategy,1000);
      }
    })
  });


}

strategy();
