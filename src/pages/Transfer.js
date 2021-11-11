import { useContext, useEffect } from "react";
import FavoritesContext from "../store/favorites-context";
import NewERC20 from "../components/meetups/NewERC20";
import { useHistory } from "react-router-dom";
import awaitTransactionMined from "await-transaction-mined";
import Transfer from "../components/meetups/TransferToken";

const Web3 = require("web3");
// const Tx = require('ethereumjs-tx').Transaction;
const web3 = new Web3(
  "https://rinkeby.infura.io/v3/fffda8246d9241f2aa056b563090838d"
);
const abi = require("../abi/ERC20.json");
function TransferPage() {
  const history = useHistory();

  const favoritesCtx = useContext(FavoritesContext);

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  async function addERCHandler(token) {
    console.log({ token });
    const from = favoritesCtx.account;
    var to = token.to.toString();
    var address = token.address.toString();
    var amount = token.amount;
    console.log(from);
    console.log(to);
    console.log(amount);
    console.log({ address });
    // console.log(token.totalSupply);
    const contract = new web3.eth.Contract(abi, address);
    console.log({ contract });
    const nonce = await web3.eth.getTransactionCount(from);
    console.log(nonce);
    const data = contract.methods.transfer(to, amount).encodeABI();
    console.log({ data });
    const txObject = {
      nonce: nonce.toString(),
      from: from,
      to: address,
      value: web3.utils.toHex(0),
      data: data,
    };

    txObject.gasLimit = await web3.eth.estimateGas(txObject);
    txObject.gasPrice = web3.utils.toHex(await web3.eth.getGasPrice());

    try {
      console.log("098");
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [txObject],
      });

      console.log({ txHash });

        let transactionReceipt = null;
        while (transactionReceipt == null) {
          // Waiting expectedBlockTime until the transaction is mined
          transactionReceipt = await web3.eth.getTransactionReceipt(txHash);
          await sleep(5000);
        }
        // contract = transactionReceipt.contractAddress;
        console.log("Got the transaction receipt: ", transactionReceipt);
    } catch (error) {
      console.log("reject", error);
    }

    // const info = {
    //   name: name_,
    //   symbol: symbol_,
    //   totalSupply: totalSupply_,
    //   contract: contract,
    //   owner: favoritesCtx.account,
    //   image: token.image,
    // };
    // console.log(info);
    // fetch(
    //   "https://crash-coure-2021-default-rtdb.asia-southeast1.firebasedatabase.app/token.json",
    //   {
    //     method: "POST",
    //     body: JSON.stringify(info),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // ).then(() => {
    //   history.replace("/");
    // });
  }
  return (
    <section>
      <h1>Add new Token</h1>
      <Transfer onAddToken={addERCHandler} />
    </section>
  );
}

export default TransferPage;
