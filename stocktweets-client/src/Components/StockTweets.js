import React from "react";
import { getUTCDate } from "../helpers/helpers";
import PropTypes from "prop-types";

export default function StockTweets(props) {
  const { tweets = [] } = props;

  //Get Tweets - sort by id and remove duplicates
  const getTweets = () => {
    let tempTweets = [];

    for (let i = 0; i < tweets.length; i++) {
      if (tweets[i].body.response.status === 200) {
        for (let j = 0; j < tweets[i].body.messages.length; j++) {
          tempTweets.push(tweets[i].body.messages[j]);
        }
      }
    }

    tempTweets.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));

    const temp = tempTweets;
    const uniqueTweets = Array.from(new Set(temp.map((a) => a.id))).map(
      (id) => {
        return temp.find((a) => a.id === id);
      }
    );

    const data = uniqueTweets.map((tweet) => {
      return (
        <div key={tweet.id} className="Stocks__tweets-tweet">
          <div className="Stocks__tweets-avatar">
            <img src={tweet.user.avatar_url} alt={tweet.user.name} />
          </div>
          <div className="Stocks__tweets-name">{tweet.user.name}</div>
          <div className="Stocks__tweets-username">@{tweet.user.username}</div>
          <div className="Stocks__tweets-created">
            {getUTCDate(tweet.created_at).toString().slice(0, 24)}
          </div>
          <div className="Stocks__tweets-message">{tweet.body}</div>
        </div>
      );
    });

    return data;
  };

  const getErrors = () => {
    let errors = "";

    for (let i = 0; i < tweets.length; i++) {
      if (tweets[i].body.response.status !== 200) {
        errors =
          errors +
          tweets[i].ticker +
          ": " +
          tweets[i].body.errors[0].message +
          " ";
      }
    }

    return errors;
  };

  return (
    <>
      <div className="Stocks__tweets-errors">{getErrors()}</div>
      <div>{getTweets()}</div>
    </>
  );
}