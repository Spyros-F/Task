const Router = require("koa-router");

const router = new Router();

const Web3 = require("web3");

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://kovan.infura.io/v3/3269c013c5b2449aaea1bb593f873d77"
  )
);

const contractAddress = "0xf019a9c291fab47003588fe74d33660cd467fc22";
const abi = require("./abi.js");
const contract = new web3.eth.Contract(abi, contractAddress);


class ResponseData {
  constructor(from, to, value) {
    this.from = from;
    this.to = to;
    this.value = value;
  }
}

router.get("/addresses/:ethAddress/transactions", async (ctx, next) => {
  const addressParam = Object.values(ctx.params).toString(); // address we get from url for task4
  const ResponseArr = [];
  console.log(addressParam);
  if (web3.utils.toChecksumAddress(addressParam)) {
    await contract.getPastEvents(
      "Transfer",
      {
        fromBlock: 0,
        toBlock: "latest",
      },
      (err, events) => {
        const transfers = events.map((e) => e.returnValues);
        transfers.forEach((transfer) => {
          if (transfer.from === addressParam || transfer.to === addressParam) {
            const responseData = new ResponseData(transfer.from, transfer.to, transfer.value);
            ResponseArr.push(responseData);
          }
        });
      }
    ).then(function(events){
      ctx.response.status = 202;
      ctx.body = ResponseArr;
    });
  } else {
    ctx.response.status = 404;
    ctx.body = "Wrong Eth Address";
  }
  next();
});

module.exports = router;