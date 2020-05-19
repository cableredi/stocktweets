import React, { useState, useEffect } from "react";
import { TweetsApiService } from "../services/tweets-api-service";

export default function StockTweets(props) {
  const { stockTickers = [] } = props;
  const [tweets, setTweets] = useState({});

  const getData = (tickers) => {
    const promises = [];

    tickers.forEach((item) => {
      promises.push(TweetsApiService(item));
    });

    Promise.all(promises).then((data) => {
      setTweets(data);
    });
  };

  useEffect(() => {
    getData(stockTickers);
  }, [stockTickers]);

  function getCounts() {
    let counts = [];

    console.log("tweets", tweets);
    for (let i = 0; i < tweets.length; i++) {
      counts.push({
        [tweets[i].body.symbol.symbol]: tweets[i].body.messages.length - 1,
      });
    }

    const results = counts.map((count) => {
      for (let key in count) {
        return (
          <div key={key}>
            <span>{key}: </span> {count[key]}
          </div>
        );
      }
    });

    return results;
  }

  function getTweets() {
    let newTweets = [];

    if (tweets && tweets.length > 0) {
      for (let i = 0; i < tweets.length; i++) {
        for (let j = 0; j < tweets[i].body.messages.length; j++) {
          newTweets.push(tweets[i].body.messages[j]);
        }
      }
    }

    newTweets.sort((a, b) => (a.created_at > b.created_at ? 1 : -1));

    const data = newTweets.map((tweet) => {
      return (
        <div key={tweet.id} className="Stock_tweets-tweet">
          <div className="Stock_tweets-avatar">
            <img src={tweet.user.avatar_url} alt={tweet.user.name} />
          </div>
          <div className="Stock_tweets-name">{tweet.user.name}</div>
          <div className="Stock_tweets-username">{tweet.user.username}</div>
          <div className="Stock_tweets-created">{tweet.created_at}</div>
          <div className="Stock_tweets-message">{tweet.body}</div>
        </div>
      );
    });

    return (<div>Counts</div>), data;
  }

  return (
    <>
      <div className="Stocks__tweets-counts">
        <div className="Stocks__tweets-counts_header">Counts</div>
        <div className="Stocks__tweets-counts_data">{getCounts()}</div>
      </div>
      <div>{getTweets()}</div>
    </>
  );
}
