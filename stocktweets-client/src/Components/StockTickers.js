import React, { useContext } from "react";
import { handleCounts } from "../helpers/helpers";
import { GlobalContext } from "../Context/GlobalContext";
import TrashCan from "./Images/delete-black-18dp.svg";

export default function StockTickers() {
  const { tweets, deleteStockTicker, deleteTweets } = useContext(GlobalContext);

  const handleOnClick = (symbol) => {
    deleteStockTicker(symbol);
    deleteTweets(symbol);
  };

  //Get Tweet Counts
  const getCounts = () => {
    let results = [];

    if (tweets && tweets.length > 0) {
      const counts = handleCounts(tweets);

      results = counts.map((count) => {
        return (
          <div
            key={count.symbol}
            className="Stocks__tickers-counts"
            onClick={() => handleOnClick(count.symbol)}
          >
            <div className="Stocks__tickers-counts-symbol">{count.symbol}</div>
            <div className="Stocks__tickers-counts-title">{count.title}</div>
            <div className="Stocks__tickers-counts-count">
              <span className="strong">Tweets: </span>
              {count.count}
            </div>
            <div className="Stocks__tickers-counts-button">
              <img className="Stocks__tickers-counts-img" src={TrashCan} alt="Remove" />
            </div>
          </div>
        );
      });
    } else {
      results = [];
    }

    return results;
  };

  return <div>{getCounts()}</div>;
}
