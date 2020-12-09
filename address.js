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
// class TransactionChecker {
//   web3;
//   account;

//   constructor(account) {
//     this.web3 = new Web3(
//       new Web3.providers.HttpProvider(
//         "https://kovan.infura.io/v3/3269c013c5b2449aaea1bb593f873d77"
//       )
//     );
//     this.account = account.toLowerCase();
//   }

//   // async checkBlock() {
//   //   let block = await this.web3.eth.getBlock("latest");
//   //   let number = block.number;
//   //   console.log("Searching block " + number);
//   //   // if (block != null && block.transactions != null && block.parentHash) {
//   //   //   while(block.parentHash) {
//   //   //     block = await this.web3.eth.getBlock(block.parentHash);
//   //   //     console.log(block.number);
//   //   //   }
//   //   //   // console.log(block.number);
//   //   // }
//   // }
// }




router.get("/addresses/:ethAddress/transactions", (ctx, next) => {
  // console.log(ctx);
  const addressParam = Object.values(ctx.params).toString(); // address we get from url for task4
  const ResponseArr = [];
  console.log(addressParam);
  if (web3.utils.toChecksumAddress(addressParam)) {
    contract.getPastEvents(
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
        //wrong ones
        console.log('11')
        // ctx.response.status = 202;
        // ctx.response.ok = true;
        // ctx.body = ResponseArr;
      }
    ).then(function(events){
      console.log('12321');
      ctx.response.status = 202;
      ctx.body =JSON.stringify({ ResponseArr});
      console.log(ctx.body)
    });
    //to provlima einai oti feygei to response adeio kai meta gemizei
    console.log('55555')
  } else {
    ctx.response.status = 404;
    ctx.body = "Wrong Eth Address";
  }
  console.log(ctx.body)
  next();
});

// Routes will go here

module.exports = router;

