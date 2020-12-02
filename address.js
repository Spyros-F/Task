const Router = require("koa-router");

// const ethAddress = 0xf7b547f3e46effb3480eee2c486ae760734b135c;

const router = new Router();

router.get("/addresses/:ethAddress/transaction", (ctx, next) => {
    // const contractAddress = Object.values(ctx.params).toString(); // address we get from url for task4
    // ctx.body = 'Hello';
    if (ctx.params.ethAddress) {
        var Web3 = require("web3");
        const web3 = new Web3(
          new Web3.providers.HttpProvider(
            "https://kovan.infura.io/v3/3269c013c5b2449aaea1bb593f873d77"
          )
        );
    
        //this is the address for tasks1,2,3
        const contractAddress = "0xf019a9c291fab47003588fe74d33660cd467fc22";
    
        const abi = require("./abi.js");
    
        let contract = new web3.eth.Contract(abi, contractAddress);
    
        contract.methods.name().call((err, result) => {
          console.log("name:", result);
        });
    
        contract.methods.symbol().call((err, result) => {
          console.log("symbol:", result);
        });
    
        contract.methods.decimals().call((err, result) => {
          console.log("decimals:", result);
        });
    
        contract.getPastEvents(
          "Transfer",
          {
            fromBlock: 0,
            toBlock: "latest",
          },
          (err, events) => {
            const transfers = events.map((e) => e.returnValues);
            transfers.forEach((transfer) => {
              console.log("from:", transfer.from);
              console.log("to:", transfer.to);
              console.log("value:", transfer.value);
            });
            // console.log(ctx.body)
            // ctx.body = web3.eth.getTransaction(Object.values(ctx.params).toString());
          }
        );
        console.log(contract.methods)
        ctx.body = contract.methods;
      } else {
        ctx.response.status = 404;
        ctx.body = "Wrong Eth Address";
      }
      next();
    }
);

// Routes will go here

module.exports = router;
