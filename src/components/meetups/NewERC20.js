import { useRef } from "react";

import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";
import BigNumber from "bignumber.js";

function NewERC20(props) {
  const NFTInputRef = useRef();
  const idInputRef = useRef();
  const symbolInputRef = useRef();
  const nameInputRef = useRef();
  const totalSupplyInputRef = useRef();
  const listingPriceInputRef = useRef();
  const feeInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredTotalSupply = new BigNumber(totalSupplyInputRef.current.value);
    const enteredSymbol = symbolInputRef.current.value;
    const enteredListingPrice = listingPriceInputRef.current.value;
    const enteredNFTAddress = NFTInputRef.current.value;
    const enteredId = idInputRef.current.value;
    const enteredFee = feeInputRef.current.value;

    const data = {
      name: enteredName,
      symbol: enteredSymbol,
      nft: enteredNFTAddress,
      totalSupply: enteredTotalSupply,
      listingPrice: enteredListingPrice,
      nftId: enteredId,
      fee: enteredFee,
    };
    console.log(data);
    props.onAddToken(data);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">NFT address</label>
          <input type="text" required id="address" ref={NFTInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Token Id</label>
          <input type="text" required id="id" ref={idInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Name</label>
          <input type="text" required id="name" ref={nameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="symbol">Symbol</label>
          <input type="text" required id="symbol" ref={symbolInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="totalSupply">Total Supply</label>
          <input
            type="number"
            required
            id="totalSupply"
            ref={totalSupplyInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="totalSupply">Listing price</label>
          <input
            type="number"
            required
            id="listingPrice"
            ref={listingPriceInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="totalSupply">Fee</label>
          <input type="number" required id="fee" ref={feeInputRef} />
        </div>

        <div className={classes.actions}>
          <button className={classes.btn}>Add Token to Fractionize</button>
        </div>
      </form>
    </Card>
  );
}

export default NewERC20;
