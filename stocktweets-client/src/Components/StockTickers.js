import React, { useContext } from "react";
import { handleCounts } from "../helpers/helpers";
import { GlobalContext } from "../Context/GlobalContext";
import TrashCan from "./Images/delete-black-18dp.svg";

export default function StockTickers() {
  const { tweets, deleteStockTicker, deleteTweets } = useContext(GlobalContext);

  const handleOnClick = (e) => {
    e.preventDefault();
    console.log("handleDelete", e.target.value);
    deleteStockTicker(e.target.value);
    deleteTweets(e.target.value);
  };

  //Get Tweet Counts
  const getCounts = () => {
    let results = [];

    if (tweets && tweets.length > 0) {
      const counts = handleCounts(tweets);

      results = counts.map((count) => {
        return (
          <button key={count.symbol} value={count.symbol} onClick={(e) => handleOnClick(e)}>
            <span className="Stocks__tickers-counts-symbol">{count.symbol}</span>
            <span className="Stocks__tickers-counts-title">{count.title}</span>
            <span className="Stocks__tickers-counts-count">Number of Tweets: {count.count}</span>
            <img  className="Stocks__tickers-counts-img" src={TrashCan} alt="Remove" />
          </button>
        );
      });
    } else {
      results = [];
    }

    return results;
  };

  return <div className="Stocks__tickers-counts">{getCounts()}</div>;
}
