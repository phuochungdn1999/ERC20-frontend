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
          <img
            src="https://media.istockphoto.com/photos/adorable-scottish-straight-cat-peeking-from-behind-a-banner-picture-id1097008888?k=20&m=1097008888&s=612x612&w=0&h=7g68qF4AnyJSd3-t4jnc9MO2AqqE5kCHEX50rTLxF_Q="
            alt={props.title}
          />
        </div>
        <div className={classes.content}>
          {console.log(props)}
          <h3>Token Name: {props.name}</h3>
          <p>Symbol: {props.symbol}</p>
          <p>Total Supply: {props.totalSupply}</p>
          <p>Vault Address: {props.vaultAddress}</p>
          <p>VaultId: {props.vaultId}</p>
          <p>ListingPrice: {props.listingPrice}</p>
          <p>NFT address: {props.nft}</p>
          <p>NFT id: {props.nftId}</p>
          {props.state ? <p>Auction State: {props.state}</p> : null}
          {props.reservePrice ? <p>Reserve Price: {props.reservePrice}</p> : null}
        </div>
        <div className={classes.actions}></div>
      </Card>
    </li>
  );
}

export default TokenItem;
