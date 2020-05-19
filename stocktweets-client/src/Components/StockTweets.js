import React, { useState, useEffect } from "react";
import { TweetsApiService } from "../services/tweets-api-service";

export default function StockTweets(props) {
  const { stockTickers = [] } = props;
  const [tweets, setTweets] = useState({});

  //Fetch Stocks from StockTwits
  const getData = (tickers) => {
    const promises = [];

    tickers.forEach((item) => {
      promises.push(TweetsApiService(item));
    });

    Promise.all(promises).then((data) => {
      setTweets(data);      
    });
  };

  //Get stock data if StockTickers change in state
  useEffect(() => {
    //const interval = setInterval(() => {
      //setLatestIds([]);
      getData(stockTickers);
    //}, 15 * 1000);

    //return () => clearTimeout(interval);
  }, [stockTickers]);

  //Get Tweet Counts
  function getCounts() {
    const counts = [];

    console.log('count length', counts.length)
    console.log('tweets length', tweets.length)

    for (let i = 0; i < tweets.length; i++) {
      counts.push({ 
        symbol: tweets[i].body.symbol.symbol,
        count: tweets[i].body.messages.length - 1,
      });
    }

    const results = counts.map((count) => {
        return (
          <div key={count.symbol}>
            <span>{count.symbol}: </span> {count.count}
          </div>
        )
    });

    return results;
  }

  //Get Tweets from state
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

    const temp = newTweets;
    const uniqueTweets = Array.from(new Set(temp.map((a) => a.id))).map(
      (id) => {
        return temp.find((a) => a.id === id);
      }
    );

    const data = uniqueTweets.map((tweet) => {
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

    return data;
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
