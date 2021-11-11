import { useRef } from "react";

import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";

function NewERC20(props) {
  const nameInputRef = useRef();
  const totalSupplyInputRef = useRef();
  const symbolInputRef = useRef();
  const imageInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredTotalSupply = totalSupplyInputRef.current.value;
    const enteredSymbol = symbolInputRef.current.value;
    const enteredImageUrl = imageInputRef.current.value;

    const meetupData = {
      name: enteredName,
      symbol: enteredSymbol,
      image: enteredImageUrl,
      totalSupply: enteredTotalSupply,
    };

    props.onAddToken(meetupData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">Name</label>
          <input type="text" required id="title" ref={nameInputRef} />
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
          <label htmlFor="symbol">Symbol</label>
          <input type="text" required id="symbol" ref={symbolInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="url">Image url</label>
          <input type="url" required id="symbol" ref={imageInputRef} />
        </div>

        <div className={classes.actions}>
          <button className={classes.btn}>Add new Meetup</button>
        </div>
      </form>
    </Card>
  );
}

export default NewERC20;
