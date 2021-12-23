import { useState, useEffect } from "react";
import TokenList from "../components/meetups/TokenList";

function AllTokensPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadMeetups, setLoadMeetups] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://nft-2021-a418f-default-rtdb.asia-southeast1.firebasedatabase.app/token.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const meetups = [];
        console.log(data);
        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key],
          };
          meetups.push(meetup);
        }
        console.log(meetups);
        setIsLoading(false);
        setLoadMeetups(meetups);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>.....Loading</p>
      </section>
    );
  }

  return (
    <section>
      <h1>All Meetups</h1>
      <TokenList meetups={loadMeetups} />
    </section>
  );
}

export default AllTokensPage;
