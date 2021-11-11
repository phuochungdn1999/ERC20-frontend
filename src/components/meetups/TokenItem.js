import classes from "./MeetupItem.module.css";
import Card from "../ui/Card";
import { useContext } from "react";

function TokenItem(props) {
  //   const favoritesCtx = useContext(FavoritesContext);

  //   const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);

  //   function toggleFavoriteStatusHandler() {
  //     if (itemIsFavorite) {
  //       favoritesCtx.removeFavorite(props.id);
  //     } else {
  //       favoritesCtx.addFavorite({
  //         id: props.id,
  //         name: props.name,
  //         totalSupply: props.totalSupply,
  //         symbol: props.symbol,
  //         contract: props.contract,
  //         owner: props.owner,
  //       });
  //     }
  //   }
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>Token Name: {props.name}</h3>
          <p>{props.symbol}</p>
          <p>Total Supply: {props.totalSupply}</p>
          <p>Contract Address: {props.contract}</p>
          <p>Deployer: {props.owner}</p>
        </div>
        <div className={classes.actions}></div>
      </Card>
    </li>
  );
}

export default TokenItem;
