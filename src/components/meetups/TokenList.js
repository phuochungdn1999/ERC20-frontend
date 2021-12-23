import TokenItem from "./TokenItem";
import classes from "./MeetupList.module.css";
import { Link } from "react-router-dom";

function TokenList(props) {
  return (
    <ul className={classes.list}>
      {console.log("all mettup", props.meetups)}
      {props.meetups.map((meetup) => (
        <Link
          to={`/detail/${meetup.id}`}
          key={meetup.id}
          // className={styles.grid__column24}
        >
          <TokenItem
            key={meetup.id}
            id={meetup.id}
            name={meetup.name}
            nft={meetup.nft}
            owner={meetup.owner}
            totalSupply={meetup.totalSupply}
            symbol={meetup.symbol}
            nftId={meetup.nftId}
            vaultAddress={meetup.vaultAddress}
            vaultId={meetup.vaultId}
            listingPrice={meetup.listingPrice}
          />
        </Link>
      ))}
    </ul>
  );
}

export default TokenList;
