import React, { useState, useEffect, useContext } from "react";
import { TweetsApiService } from "./services/tweets-api-service";
import Search from "./Components/Search";
import StockTickers from "./Components/StockTickers";
import StockTweets from "./Components/StockTweets";
import useInterval from "./helpers/useInterval";
import { GlobalContext } from "./Context/GlobalContext";
import StockTwitsLogo from './Components/Images/ST_16x16.png';

export default function App() {
  const {
    setTweets,
    setStockTickers,
    tweets,
    stockTickers,
    addStockTicker,
    addTweets,
    updateTweets,
  } = useContext(GlobalContext);
  const [error, setError] = useState("");

  //Fetch Stocks from StockTwits
  const getInitialData = (tickers) => {
    console.log("tickers", tickers);
    const promises = [];

    tickers.forEach((item) => {
      promises.push(TweetsApiService(item));
    });

    Promise.all(promises).then((data) => {
      if (data.length > 0) {
        if (data[0].statusCode === 200) {
          setTweets(data);
        }
      } else {
        setError("No tweets today");
      }
    });
  };

  const addNewTweets = (ticker) => {
    TweetsApiService(ticker).then(addTweets).catch(setError);
  };

  const upDateTweets = (tickers) => {
    tickers.forEach((ticker) => {
      const maxId = tweets.find((tweet) => tweet.symbol === ticker).maxId;
      console.log("maxId", maxId);

      TweetsApiService(ticker, maxId).then(updateTweets).catch(setError);
    });
  };

  //Initially load Stock Tickers from LocalStorage
  useEffect(() => {
    let tempStocks = JSON.parse(localStorage.getItem("stockticker"));

    if (tempStocks) {
      setStockTickers(tempStocks);
      getInitialData(tempStocks);
    }
  }, []);

  useInterval(() => {
    upDateTweets(stockTickers);
  }, 30 * 1000);

  // Handle search values from form and update storage
  const addNewStockTweets = (tickers) => {
    console.log("addStockSymbol", tickers);
    tickers.forEach((ticker) => {
      addStockTicker(ticker);
      addNewTweets(ticker);
    });
  };

  console.log("Render tweets", tweets);
  console.log("Render stockTickers", stockTickers);
  return (
    <section className="Stocks">
      <div className="Stocks__heading">
        <h1>
          StockTweets
          <span className="Stocks__heading-sub">
            powered by
            <a href="http://stocktwits.com">
              <img
                src={StockTwitsLogo}
                alt="I'm on Stocktwits"
              />
              StockTwits
            </a>
          </span>
        </h1>
      </div>

      <div className="Stocks__search">
        <Search setAddNewStockTweets={addNewStockTweets} />
      </div>

      <div className="Stocks__tickers">
        <StockTickers />
      </div>

      <div className="Stocks__tweets">
        {error && <p className="error">There was an error retrieving the data: {error}</p>}
        <StockTweets />
      </div>
    </section>
  );
}
