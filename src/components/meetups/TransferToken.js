import { useContext, useRef, useEffect, useState } from "react";
import FavoritesContext from "../../store/favorites-context";
import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";
import { useParams } from "react-router";
import TokenItem from "./TokenItem";
import BigNumber from "bignumber.js";

const Web3 = require("web3");
const Tx = require("ethereumjs-tx").Transaction;

const tokenVaultAbi = require("../../abi/TokenVault.json");

async function getBalance(addressContract) {}

function Transfer(props) {
  const { id } = useParams();
  const [fraction, setFraction] = useState({});
  const [isStart, setIsStart] = useState(false);
  const [isBid, setIsBid] = useState(false);
  const [vaultAddress, setVaultAddress] = useState("");
  const [loadAgain, setLoadAgain] = useState(false);
  const [auctionEndTime, setAuctionEndTime] = useState("");
  const [stateAuction, setAuctionEndState] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const auctionEnum = ["inactive", "live", "ended", "redeemed"];
  const favoritesCtx = useContext(FavoritesContext);
  const valueInEth = useRef();
  const newPrice = useRef();

  const web3 = new Web3(
    "https://rinkeby.infura.io/v3/fffda8246d9241f2aa056b563090838d"
  );
  useEffect(async () => {
    const data = await fetch(
      "https://nft-2021-a418f-default-rtdb.asia-southeast1.firebasedatabase.app/token.json"
    );
    const result = await data.json();
    console.log(result[id].vaultAddress);
    const contractVault = new web3.eth.Contract(
      tokenVaultAbi,
      result[id].vaultAddress
    );
    setVaultAddress(result[id].vaultAddress);
    const state = await contractVault.methods.auctionState().call();
    const reservePrice = await contractVault.methods.reservePrice().call();
    const auctionEnd = await contractVault.methods.auctionEnd().call();
    setAuctionEndTime(auctionEnd);
    setAuctionEndState(state);
    console.log("state", state);
    state == 0 ? setIsStart(true) : setIsStart(false);
    state == 1 ? setIsBid(true) : setIsBid(false);
    state == 2 ? setIsEnd(true) : setIsEnd(false);
    const auctionState = auctionEnum[state];
    console.log(auctionState);

    setFraction({ ...result[id], id, auctionState, reservePrice, auctionEnd });
  }, [loadAgain]);
  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const startOrBidSubmit = async () => {
    const value = new BigNumber(valueInEth.current.value).multipliedBy(
      10 ** 18
    );
    let data;
    const contractVault = new web3.eth.Contract(tokenVaultAbi, vaultAddress);
    if (isStart) {
      data = contractVault.methods.start();
    }
    if (isBid) {
      data = contractVault.methods.bid();
    }
    const account = favoritesCtx.account;

    const startOrBidObj = {
      // nonce: nonce.toString(),
      from: account,
      to: vaultAddress,
      value: web3.utils.toHex(value),
      data: data.encodeABI(),
    };

    try {
      console.log("Open metamask");
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [startOrBidObj],
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
      setLoadAgain(!loadAgain);
    } catch (error) {
      console.log("reject", error);
      return;
    }
  };
  const updatePrice = async () => {
    const price = new BigNumber(newPrice.current.value);
    console.log(vaultAddress);
    console.log(price);

    const account = favoritesCtx.account;
    const contractVault = new web3.eth.Contract(tokenVaultAbi, vaultAddress);
    const data = contractVault.methods.updateUserPrice(price);

    let updatePriceObj = {
      // nonce: nonce.toString(),
      from: account,
      to: vaultAddress,
      value: web3.utils.toHex(0),
      data: data.encodeABI(),
    };
    console.log(updatePriceObj);

    try {
      console.log("Open metamask");
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [updatePriceObj],
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
      setLoadAgain(!loadAgain);
    } catch (error) {
      console.log("reject", error);
      return;
    }
  };
  const redeem = async () => {
    const account = favoritesCtx.account;
    const contractVault = new web3.eth.Contract(tokenVaultAbi, vaultAddress);
    const data = contractVault.methods.redeem();

    let redeemObj = {
      // nonce: nonce.toString(),
      from: account,
      to: vaultAddress,
      value: web3.utils.toHex(0),
      data: data.encodeABI(),
    };
    console.log(redeemObj);

    try {
      console.log("Open metamask");
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [redeemObj],
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
      setIsBid(false);
      setIsBid(false);
      setLoadAgain(!loadAgain);
    } catch (error) {
      console.log("reject", error);
      return;
    }
  };
  const end = async () => {
    const account = favoritesCtx.account;
    const contractVault = new web3.eth.Contract(tokenVaultAbi, vaultAddress);
    const data = contractVault.methods.end();

    let endObj = {
      // nonce: nonce.toString(),
      from: account,
      to: vaultAddress,
      value: web3.utils.toHex(0),
      data: data.encodeABI(),
    };
    console.log(endObj);

    try {
      console.log("Open metamask");
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [endObj],
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
      setIsBid(false);
      setIsBid(false);
      setLoadAgain(!loadAgain);
    } catch (error) {
      console.log("reject", error);
      return;
    }
  };
  const cash = async () => {
    const account = favoritesCtx.account;
    const contractVault = new web3.eth.Contract(tokenVaultAbi, vaultAddress);
    const data = contractVault.methods.cash();

    let cashObj = {
      // nonce: nonce.toString(),
      from: account,
      to: vaultAddress,
      value: web3.utils.toHex(0),
      data: data.encodeABI(),
    };
    console.log(cashObj);

    try {
      console.log("Open metamask");
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [cashObj],
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
      setIsBid(false);
      setIsBid(false);
      setLoadAgain(!loadAgain);
    } catch (error) {
      console.log("reject", error);
      return;
    }
  };

  const handleEnd = () => {
    const time = Math.floor(new Date().getTime() / 1000);
    console.log("12313", isBid && auctionEndTime <= time);
    return isBid && auctionEndTime <= time;
  };
  const handleCash = () => {
    if (!isBid && !isStart) return true;
    else return false;
  };

  return (
    <div>
      <Card>
        <TokenItem
          key={fraction.id}
          id={fraction.id}
          name={fraction.name}
          nft={fraction.nft}
          owner={fraction.owner}
          totalSupply={fraction.totalSupply}
          symbol={fraction.symbol}
          nftId={fraction.nftId}
          vaultAddress={fraction.vaultAddress}
          vaultId={fraction.vaultId}
          listingPrice={fraction.listingPrice}
          state={fraction.auctionState}
          reservePrice={fraction.reservePrice}
        />
      </Card>
      <div class="m-5 p-4 border">
        <div>
          <p>Buy NFT vault</p>
          <div className={classes.control}>
            <label htmlFor="name">Amount of ETH in Ether</label>
            <input
              type="text"
              required
              id="valueInEth"
              ref={valueInEth}
              disabled={!isBid && !isStart}
            />
          </div>
          <div className={classes.actions}>
            {isBid || isStart ? (
              <button className={classes.btn} onClick={startOrBidSubmit}>
                {isStart ? "Start" : "Bid"}
              </button>
            ) : (
              <button class="btn btn-lg btn-primary" disabled>
                Close
              </button>
            )}
          </div>
        </div>
      </div>
      <div class="m-5 p-4 border">
        <div>
          <p>Update price</p>
          <div className={classes.control}>
            <label htmlFor="name">New Price</label>
            <input
              type="text"
              required
              id="price"
              ref={newPrice}
              disabled={!isStart}
            />
          </div>
          <div className={classes.actions}>
            {console.log(isBid)}
            {isStart ? (
              <button className={classes.btn} onClick={updatePrice}>
                Update Price
              </button>
            ) : (
              <button class="btn btn-lg btn-primary" disabled>
                Can't Update Price
              </button>
            )}
          </div>
        </div>
      </div>
      <div class="m-5 p-4 border">
        <div>
          <p>Redeem NFT</p>
          <div className={classes.actions}>
            {console.log(isBid)}
            {isStart ? (
              <button className={classes.btn} onClick={redeem}>
                Redeem
              </button>
            ) : (
              <button class="btn btn-lg btn-primary" disabled>
                Can't Redeem
              </button>
            )}
          </div>
        </div>
      </div>
      <div class="m-5 p-4 border">
        <div>
          <p>End Fractionize NFT</p>
          <div className={classes.actions}>
            {console.log("57567", handleEnd())}
            {handleEnd() ? (
              <button className={classes.btn} onClick={end}>
                END
              </button>
            ) : (
              <button class="btn btn-lg btn-primary" disabled>
                Can't END
              </button>
            )}
          </div>
        </div>
      </div>
      <div class="m-5 p-4 border">
        <div>
          <p>Cash to NFT</p>
          <div className={classes.actions}>
            {console.log(handleCash())}
            {handleCash() ? (
              <button className={classes.btn} onClick={cash}>
                CASH
              </button>
            ) : (
              <button class="btn btn-lg btn-primary" disabled>
                Can't CASH
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transfer;
