import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../connect/Connector";
import FavoritesContext from "../../store/favorites-context";
import { useContext, useEffect } from "react";

const Web3 = require("web3");
const web3 = new Web3(
  "https://ropsten.infura.io/v3/fffda8246d9241f2aa056b563090838d"
);

function Layout(props) {
  const favoritesCtx = useContext(FavoritesContext);

  const {
    active,
    account,
    library,
    connector,
    activate,
    deactivate,
    chainId,
    error,
  } = useWeb3React();

  useEffect(() => {
    favoritesCtx.addNewAccount(account);
  }, [active, account, error]);

  async function connect() {
    try {
      console.log("123123");
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }
  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }
  return (
    <div>
      <MainNavigation />
      <div className="flex flex-col items-center justify-center">
        {!active ? (
          <div className={classes.actions}>
            <button
              onClick={connect}
              className="py-2 mt-20 mb-4 text-lg font-bold text-red rounded-lg w-56 bg-blue-600 hover:bg-blue-800"
            >
              Connect to MetaMask
            </button>
          </div>
        ) : (
          <div className={classes.actions}>
            <button
              onClick={disconnect}
              className="py-2  mb-4 text-lg font-bold text-red rounded-lg w-56 bg-blue-600 hover:bg-blue-800"
            >
              Disconnect
            </button>
          </div>
        )}

        {active ? (
          <div>
            <span>
              Connected with <b>{account}</b>
            </span>
          </div>
        ) : (
          <div>
            <span>Not connected</span>
          </div>
        )}
      </div>
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
