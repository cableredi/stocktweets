import React, { useState, useEffect } from "react";
import { TweetsApiService } from "./services/tweets-api-service";
import Search from "./Components/Search";
import StockTickers from "./Components/StockTickers";
import StockTweets from "./Components/StockTweets";
import { addSearchValue, removeStock, combineTweets } from "./helpers/helpers";
import useInterval from "./helpers/useInterval";

export default function App() {
  const [stockTickers, setStockTickers] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [maxIds, setMaxIds] = useState([]);

  //Fetch Stocks from StockTwits
  const getInitialData = (tickers) => {
    const promises = [];

    tickers.forEach((item) => {
      promises.push(TweetsApiService(item));
    });

    Promise.all(promises).then((data) => {
      setTweets(data);

      let tempMaxIds = maxIds;
      data.map((item) => {
        return tempMaxIds.push({
          symbol: item.body.symbol.symbol,
          value: item.body.cursor.since,
        });
      });
      setMaxIds(tempMaxIds);
    });
  };

  //Fetch Stocks nNew from StockTwits
  const getNewData = (tickers) => {
    const promises = [];

    //fetch data from API since last maxId
    tickers.forEach((item) => {
      const maxId = maxIds.find((symbol) => symbol.symbol === item);

      maxId
        ? promises.push(TweetsApiService(item, maxId.value))
        : promises.push(TweetsApiService(item));
    });

    Promise.all(promises).then((data) => {
      let newTweets = tweets;
      let tempMaxIds = maxIds;

      for (let i = 0; i < data.length; i++) {

        const index = tempMaxIds.findIndex(
          (maxSymbol) => data[i].body.symbol.symbol === maxSymbol.symbol
        );

        if (data[i].body.cursor.since && tempMaxIds[index].value < data[i].body.cursor.since) {
          tempMaxIds[index].value = data[i].body.cursor.since;

          newTweets = combineTweets(tweets, data);
        }
      }
      setMaxIds([...tempMaxIds]);

      setTweets([...newTweets]);
    });
  };

  //Initially load Stock Tickers from LocalStorage
  useEffect(() => {
    let tempStocks = JSON.parse(localStorage.getItem("stockticker"));
    setStockTickers(tempStocks);
    getInitialData(tempStocks);
  }, []);

  useInterval(() => {
    getNewData(stockTickers);
  }, 15 * 1000);

  // Handle search values from form and update storage
  const handleSearchValue = (tickers) => {
    const tempStorage = addSearchValue(tickers);

    setStockTickers([...tempStorage]);

    localStorage.setItem("stockticker", JSON.stringify(tempStorage));
  };

  //Remove Stock
  const handleRemoveStock = (ticker) => {
    const tempStorage = removeStock(ticker);

    setStockTickers([...tempStorage]);

    localStorage.setItem("stockticker", JSON.stringify(tempStorage));
  };

  return (
    <section className="Stocks">
      <div className="Stocks__heading">
        <h1 className="Stocks__heading">
          StockTweets <span className="Stock__heading-sub">powered by StockTwits</span>
        </h1>
      </div>

      <div className="Stocks__search">
        <Search setSearchValue={handleSearchValue} />
      </div>

      <div className="Stocks__tickers">
        <StockTickers stockTickers={stockTickers} removeStock={handleRemoveStock} tweets={tweets} />
      </div>

      <div className="Stocks__tweets">
        <StockTweets tweets={tweets} />
      </div>
    </section>
  );
}
