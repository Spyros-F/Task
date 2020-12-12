const Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://kovan.infura.io/v3/3269c013c5b2449aaea1bb593f873d77"
  )
);

const contractAddress = "0xf019a9c291fab47003588fe74d33660cd467fc22";

const abi = require("./abi.js");

const contract = new web3.eth.Contract(abi, contractAddress);

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
  }
);
