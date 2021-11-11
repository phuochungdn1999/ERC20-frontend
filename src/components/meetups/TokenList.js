import TokenItem from "./TokenItem";
import classes from "./MeetupList.module.css";

function TokenList(props) {
    return (
      <ul className={classes.list}>
        {props.meetups.map((meetup) => (
          <TokenItem
            key={meetup.id}
            id={meetup.id}
            image={meetup.image}
            name={meetup.name}
            contract={meetup.contract}
            owner={meetup.owner}
            totalSupply={meetup.totalSupply}
            symbol={meetup.symbol}
          />
        ))}
      </ul>
    );
  }
  
  export default TokenList;
