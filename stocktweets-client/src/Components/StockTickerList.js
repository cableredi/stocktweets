import React from "react";

export default function StockTickerList(props) {
  const stockTickers = props.stockTickers;

  const tickers = stockTickers
    ? stockTickers.map((item) => (
        <div key={item} className="StockTickerList__stock">
          <button onClick={(e) => handleOnClick(e)}>{item}</button>
        </div>
      ))
    : [];

  const handleOnClick = (e) => {
    e.preventDefault();
    props.removeStock(e.target.value);
  };

  return <div className="StockTickerList">{tickers}</div>;
}
