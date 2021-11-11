import Todo from "./components/Todo";
import { Route, Switch } from "react-router-dom";
import AllMeetupsPage from "./pages/AllMeetups";
import NewERC20Page from "./pages/NewERC20";
import NewMeetupsPage from "./pages/NewMeetup";
import FavoritePage from "./pages/Favorites";
import MainNavigation from "./components/layout/MainNavigation";
import Layout from "./components/layout/Layout";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import AllTokensPage from "./pages/AllTokens";
import TransferPage from "./pages/Transfer";

function getLibrary(provider) {
  return new Web3(provider);
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Layout>
        <Switch>
          {/* <Route path="/" exact>
            <AllMeetupsPage />
          </Route> */}
          <Route path="/" exact>
            <AllTokensPage />
          </Route>
          {/* <Route path="/new-meetup">
            <NewMeetupsPage />
          </Route> */}
          <Route path="/new-erc20">
            <NewERC20Page />
          </Route>
          <Route path="/transfer">
            <TransferPage />
          </Route>
          {/* <Route path="/favorites">
            <FavoritePage />
          </Route> */}
        </Switch>
      </Layout>
    </Web3ReactProvider>
  );
}

export default App;
