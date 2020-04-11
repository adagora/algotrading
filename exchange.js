const GeminiAPI = require("gemini-api").default;
const secret = '4J5hmBowZQyhmgB7VdYmFNZ7qukA';
const key = 'account-kyAiVMqHp97mgFMzjsyK';
const restClient = new GeminiAPI({key, secret, sandbox:true});

module.exports = {
  marketBuyBitcoin:function (){
    return restClient.newOrder({amount:1,
                              price:1500,
                              side: "buy",
                              symbol:"btcusd",
                              option:["immediate-or-cancel" ]})
  },
    marketSellBitcoin:function (){
      return restClient.newOrder({amount:1,
                                price:1,
                                side: "sell",
                                symbol:"btcusd",
                                option:["immediate-or-cancel"]})

},

bitcoinPrice:function(){
  return restClient.getTicker("btcusd");
}
}
