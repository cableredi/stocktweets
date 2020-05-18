import React from "react";

export default function StockTweets(props) {
  const { tweets = [] } = props;
  
  console.log('tweets', tweets)
  const getTweets = tweets.map((tweet) => (
        <div key={tweet.id} className="Stock_tweets-tweet">
          <div className="Stock_tweets-avatar">
            <img src={tweet.user.avatar_url} alt={tweet.user.name} />
          </div>
          <div className="Stock_tweets-name">{tweet.user.name}</div>
          <div className="Stock_tweets-username">{tweet.user.username}</div>
          <div className="Stock_tweets-created">{tweet.created_at}</div>
          <div className="Stock_tweets-message">{tweet.body}</div>
        </div>
      ))

  return (
    <div className="StockTweets">
      {tweets ? getTweets : "No tweets"}
    </div>
  );
}
