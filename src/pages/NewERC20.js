import { useContext, useEffect } from "react";
import FavoritesContext from "../store/favorites-context";
import NewERC20 from "../components/meetups/NewERC20";
import { useHistory } from "react-router-dom";
import awaitTransactionMined from "await-transaction-mined";
import BigNumber from "bignumber.js";

const Web3 = require("web3");
// const Tx = require('ethereumjs-tx').Transaction;
const IERC721 = require("../abi/IERC721.json");
const vaultFactory = require("../abi/ERC721VaultFactory.json");
const vaultFactoryAddress = "0xE026c69A52fD4161207c8cda5d5EF6ce48a39523";

function NewERC20Page() {
  const history = useHistory();
  const web3 = new Web3(
    "https://speedy-nodes-nyc.moralis.io/8050153ba727567749f63d00/eth/rinkeby"
  );

  const favoritesCtx = useContext(FavoritesContext);

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  async function addERCHandler(token) {
    const name = token.name.toString();
    const symbol = token.symbol.toString();
    const totalSupply = new BigNumber(token.totalSupply);
    const account = favoritesCtx.account;
    const nft = token.nft.toString();
    const nftId = token.nftId.toString();
    const fee = token.fee;
    const listingPrice = token.listingPrice;
    console.log("name", name);
    console.log("name", account);

    // console.log(token.totalSupply);
    const contractERC721 = new web3.eth.Contract(IERC721, nft);
    const dataApprove = contractERC721.methods.approve(
      vaultFactoryAddress,
      nftId
    );
    const approveObj = {
      // nonce: nonce.toString(),
      from: account,
      to: nft,
      value: web3.utils.toHex(0),
      data: dataApprove.encodeABI(),
    };

    approveObj.gasLimit = await web3.eth.estimateGas(approveObj);
    approveObj.gasPrice = web3.utils.toHex(await web3.eth.getGasPrice());

    try {
      console.log("Open metamask");
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [approveObj],
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
      return;
    }
    const contractVaultFactory = new web3.eth.Contract(
      vaultFactory,
      vaultFactoryAddress
    );
    const dataMint = contractVaultFactory.methods.mint(
      name,
      symbol,
      nft,
      nftId,
      totalSupply,
      listingPrice,
      fee
    );
    const mintObj = {
      // nonce: nonce.toString(),
      from: account,
      to: vaultFactoryAddress,
      value: web3.utils.toHex(0),
      data: dataMint.encodeABI(),
    };

    mintObj.gasLimit = await web3.eth.estimateGas(mintObj);
    mintObj.gasPrice = web3.utils.toHex(await web3.eth.getGasPrice());
    let decodedParameters;
    try {
      console.log("Open metamask");
      const txHashMint = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [mintObj],
      });

      console.log({ txHashMint });

      let transactionReceiptMint = null;
      while (transactionReceiptMint == null) {
        // Waiting expectedBlockTime until the transaction is mined
        transactionReceiptMint = await web3.eth.getTransactionReceipt(
          txHashMint
        );
        await sleep(5000);
      }
      // contract = transactionReceipt.contractAddress;
      console.log("Got the transaction receipt Mint: ", transactionReceiptMint);
      console.log(
        "Got the transaction receipt Mint: ",
        transactionReceiptMint.logs[1].data
      );

      const typesArray = [
        { type: "uint256", name: "id" },
        { type: "uint256", name: "price" },
        { type: "address", name: "vault" },
        { type: "uint256", name: "vaultId" },
      ];

      decodedParameters = web3.eth.abi.decodeParameters(
        typesArray,
        transactionReceiptMint.logs[1].data
      );

      console.log(JSON.stringify(decodedParameters, null, 4));
    } catch (error) {
      console.log("reject", error);
    }

    const info = {
      name: name,
      symbol: symbol,
      nft: nft,
      nftId: nftId,
      totalSupply: totalSupply,
      listingPrice: listingPrice,
      fee: fee,
      vaultAddress: decodedParameters.vault,
      vaultId: decodedParameters.vaultId,
      owner: mintObj.from,
    };
    console.log(info);
    fetch(
      "https://nft-2021-a418f-default-rtdb.asia-southeast1.firebasedatabase.app/token.json",
      {
        method: "POST",
        body: JSON.stringify(info),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(() => {
        // history.replace("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <section>
      <h1>Add new Token</h1>
      <NewERC20 onAddToken={addERCHandler} />
    </section>
  );
}

export default NewERC20Page;
