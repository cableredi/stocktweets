import React from "react";
import { handleCounts } from "../helpers/helpers";

export default function StockTickers(props) {
  const { stockTickers, tweets } = props;

  //Get Tweet Counts
  const getCounts = () => {
    let results = [];

    if (tweets.length > 0) {
      const counts = handleCounts(tweets);

      results = counts.map((count) => {
        return (
          <div key={count.symbol}>
            <span>{count.title}: </span> {count.count}
          </div>
        );
      });
    } else {
      results = [];
    }

    return results;
  };

  const tickers = stockTickers
    ? stockTickers.map((item) => (
        <div key={item} className="Stocks__tickers-stock">
          <button value={item} onClick={(e) => handleOnClick(e)}>
            {item}
          </button>
        </div>
      ))
    : [];

  const handleOnClick = (e) => {
    e.preventDefault();
    props.removeStock(e.target.value);
  };

  return (
    <>
      <div className="Stocks__tickers-symbols">
        <div className="Stocks__tickers-heading">Watching</div>
        <div className="Stocks__tickers-list">{tickers}</div>
      </div>
      <div className="Stocks__tickers-counts">
        <div className="Stocks__tickers-counts_header">References in Tweets</div>
        <div className="Stocks__tickers-counts_data">{getCounts()}</div>
      </div>
    </>
  );
}
