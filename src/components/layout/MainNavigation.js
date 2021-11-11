import { Link } from "react-router-dom";
import { useContext } from "react";
import classes from "./MainNavigation.module.css";
import FavoritesContext from "../../store/favorites-context";

function MainNavigation() {
  const favoritesCtx = useContext(FavoritesContext);
  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Meetup</div>
      <nav>
        <ul>
          {/* <li>
            <Link to="/">All Meetups</Link>
          </li> */}
          <li>
            <Link to="/">All Tokens</Link>
          </li>
          {/* <li>
            <Link to="/new-meetup">Add new Meetup</Link>
          </li> */}
          <li>
            <Link to="/new-erc20">Add new Token</Link>
          </li>
          <li>
            <Link to="/transfer">Transfer Token</Link>
          </li>
          {/* <li>
            <Link to="/favorites">
              Favorites
              <span className = {classes.badge}>{favoritesCtx.totalFavorites}</span>
            </Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
