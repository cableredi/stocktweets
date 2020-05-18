import React, { useState, useEffect, useCallback } from "react";
import TweetsApiService from './services/tweets-api-service';
import Searchbar from "./Components/Searchbar";
import StockTickerList from "./Components/StockTickerList";
import StockTweets from "./Components/StockTweets";

export default function App() {
  const [stockTickers, setStockTickers] = useState([]);
  console.log("StockTweets", stockTickers);

  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    fetchTweets = useCallback(async (ticker) => {
      try {
        const result = await TweetsApiService.get(ticker);
        const data = await result.data.messages;
  
        const tempTweets = tweets;
        tempTweets.push(data);
        setTweets(tempTweets);
      } catch (err) {
        console.error(err);
      }

    let tempCart = JSON.parse(localStorage.getItem("stockticker"));
    setStockTickers(tempCart);

    if (stockTickers && stockTickers.length > 0) {
      stockTickers.map((ticker) => fetchTweets(ticker));
    }
  },[stockTickers]);

  // Handle search values from form and update storage
  const handleSearchValue = (tickers) => {
    let tempStorage = JSON.parse(localStorage.getItem("stockticker"));

    if (!tempStorage) {
      tempStorage = [];
    }

    tickers.map((ticker) => tempStorage.push(ticker));

    setStockTickers(tempStorage);

    localStorage.setItem("stockticker", JSON.stringify(tempStorage));
  };

  //Remove Stock
  const handleRemoveStock = (ticker) => {
    const tempStorage = JSON.parse(localStorage.getItem("stockticker"));

    let index = tempStorage.findIndex((item) => item === ticker);
    tempStorage.splice(index, 1);

    setStockTickers(tempStorage);

    localStorage.setItem("stockticker", JSON.stringify(tempStorage));
  }

  return (
    <section className="Stocks">
      <div className="Stocks__heading">
        <h1 className="Stocks__heading">StockTwits</h1>
      </div>

      <div className="Stocks__search">
        <Searchbar setSearchValue={handleSearchValue} />
      </div>

      <div className="Stocks__tickers">
        <StockTickerList stockTickers={stockTickers} removeStock={handleRemoveStock} />
      </div>

      <div className="Stocks__tweets">
        <StockTweets tweet={tweets}  />
      </div>
    </section>
  );
}
