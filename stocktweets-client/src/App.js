import React, { useState, useEffect } from "react";
import Searchbar from "./Components/Searchbar";
import StockTickerList from "./Components/StockTickerList";
import StockTweets from "./Components/StockTweets";

export default function App() {
  const [stockTickers, setStockTickers] = useState([]);

  useEffect(() => {
    let tempCart = JSON.parse(localStorage.getItem("stockticker"));
    setStockTickers(tempCart);
  }, []);

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
  };

  return (
    <section className="Stocks">
      <div className="Stocks__heading">
        <h1 className="Stocks__heading">StockTwits</h1>
      </div>

      <div className="Stocks__search">
        <Searchbar setSearchValue={handleSearchValue} />
      </div>

      <div className="Stocks__tickers">
        <StockTickerList
          stockTickers={stockTickers}
          removeStock={handleRemoveStock}
        />
      </div>

      <div className="Stocks__tweets">
        <StockTweets stockTickers={stockTickers} />
      </div>
    </section>
  );
}
