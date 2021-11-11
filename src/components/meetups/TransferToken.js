import { useContext, useRef, useEffect, useState } from "react";
import FavoritesContext from "../../store/favorites-context";
import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";
const Web3 = require("web3");
const Tx = require("ethereumjs-tx").Transaction;

const abi = require("../../abi/ERC20.json");

async function getBalance(addressContract) {}

function Transfer(props) {
  const favoritesCtx = useContext(FavoritesContext);
  const [balance, setBalance] = useState(0);
  const [contract, setContract] = useState("");
  const [account, setAccount] = useState("");
  const addressInputRef = useRef();
  const amountInputRef = useRef();
  const toInputRef = useRef();

  const web3 = new Web3(
    "https://rinkeby.infura.io/v3/fffda8246d9241f2aa056b563090838d"
  );

  function submitHandler(event) {
    event.preventDefault();

    const enteredAddress = addressInputRef.current.value;
    const enteredAmount = amountInputRef.current.value;
    const enteredTo = toInputRef.current.value;
    if (
      web3.utils.isAddress(enteredAddress) &&
      web3.utils.isAddress(enteredTo)
    ) {
      const meetupData = {
        address: enteredAddress,
        amount: enteredAmount,
        to: enteredTo,
      };

      props.onAddToken(meetupData);
    }
  }


  useEffect(() => {
    (async function () {
      try {
        setAccount(favoritesCtx.account);
        console.log(contract);
        if (web3.utils.isAddress(contract)) {
            const NameContract = new web3.eth.Contract(abi, contract);
            
            const amout = await NameContract.methods.balanceOf(account).call();
            console.log(await NameContract.methods.name().call());
          setBalance(amout);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [contract, account]);
  async function textchange() {
    // console.log(addressInputRef.current.value);
    setContract(addressInputRef.current.value);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">Token Address</label>
          <input
            type="text"
            required
            id="title"
            ref={addressInputRef}
            onChange={textchange}
          />
          {balance > 0 ? <p>{balance} Token</p> : <p>0 Token</p>}
        </div>
        <div className={classes.control}>
          <label htmlFor="amount">Amount</label>
          <input type="number" required id="amount" ref={amountInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="to">To</label>
          <input type="text" required id="to" ref={toInputRef} />
        </div>

        <div className={classes.actions}>
          <button className={classes.btn}>Confirm</button>
        </div>
      </form>
    </Card>
  );
}

export default Transfer;
