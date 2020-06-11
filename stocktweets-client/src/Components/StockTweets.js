import React, { useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { differenceInMinutes } from 'date-fns';

export default function StockTweets() {
  const { tweets } = useContext(GlobalContext);

  //Get Tweets - sort by id and remove duplicates
  const getTweets = () => {
    if (tweets) {
      let tempTweets = [];

      for (let i = 0; i < tweets.length; i++) {
        if (tweets[i].status === 200) {
          for (let j = 0; j < tweets[i].messages.length; j++) {
            tempTweets.push(tweets[i].messages[j]);
          }
        }
      }

      tempTweets.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));

      const temp = tempTweets;
      const uniqueTweets = Array.from(new Set(temp.map((a) => a.id))).map((id) => {
        return temp.find((a) => a.id === id);
      });

      //get create-date and convert to local timezone and format
      const getCurrentDate = (date) => {
        let createdDate = new Date(date);
        createdDate.toString();

        let currentDate = new Date();

        const difference = differenceInMinutes(currentDate, createdDate);

        return difference === 0 ? 'Now' : difference + ' min ago';
      }

      //render tweets
      const data = uniqueTweets.map((tweet) => {
        return (
          <div key={tweet.id} className="Stocks__tweets-tweet">
            <div className="Stocks__tweets-avatar">
              <img src={tweet.user.avatar_url} alt={tweet.user.name} />
            </div>
            <div className="Stocks__tweets-name">{tweet.user.name}</div>
            <div className="Stocks__tweets-username">@{tweet.user.username}</div>
            <div className="Stocks__tweets-created">
              {getCurrentDate(tweet.created_at)}
            </div>
            <div className="Stocks__tweets-message">{tweet.body}</div>
          </div>
        );
      });

      return data;
    } else {
      return;
    }
  };

  return (
    <>
      <div>{getTweets()}</div>
    </>
  );
}
