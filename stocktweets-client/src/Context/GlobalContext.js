import React, { createContext, useReducer } from "react";
import StockTickersReducer from "./StockTickersReducer";
import TweetsReducer from "./TweetsReducer";

export const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const [stockTickers, dispatchStockTickers] = useReducer(StockTickersReducer, []);
  const [tweets, dispatchTweets] = useReducer(TweetsReducer, []);

  const setStockTickers = (tickers) => {
    dispatchStockTickers({
      type: "SET_STOCKTICKERS",
      payload: tickers,
    });
  };

  const setTweets = (tweets) => {
    dispatchTweets({
      type: "SET_TWEETS",
      payload: tweets,
    });
  };

  const addStockTicker = (ticker) => {
    dispatchStockTickers({
      type: "ADD_STOCKTICKER",
      payload: ticker,
    });
  }

  const addTweets = (tweets) => {
    dispatchTweets({
      type: "ADD_TWEETS",
      payload: tweets,
    });
  }

  const deleteStockTicker = (ticker) => {
    dispatchStockTickers({
      type: "DELETE_STOCKTICKER",
      payload: ticker,
    });
  };

  const deleteTweets = (stockTicker) => {
    dispatchTweets({
      type: "DELETE_TWEETS",
      payload: stockTicker,
    });
  };

  const updateTweets = (tweets) => {
    dispatchTweets({
      type: "UPDATE_TWEETS",
      payload: tweets
    })
  }

  return (
    <GlobalContext.Provider
      value={{
        stockTickers: stockTickers,
        tweets: tweets,
        setTweets,
        setStockTickers,
        addStockTicker,
        addTweets,
        deleteStockTicker,
        deleteTweets,
        updateTweets,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
