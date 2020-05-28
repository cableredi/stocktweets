export const getUTCDate = (origDate) => {
  let date = new Date(origDate);

  return new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
};

// Handle search values from form and update storage
export const addSearchValue = (tickers) => {
  let tempStorage = JSON.parse(localStorage.getItem("stockticker"));

  if (!tempStorage) {
    tempStorage = [];
  }

  tickers.map((ticker) => tempStorage.push(ticker));

  return tempStorage;
};

//Remove Stock
export const removeStock = (ticker) => {
  const tempStorage = JSON.parse(localStorage.getItem("stockticker"));

  let index = tempStorage.findIndex((item) => item === ticker);
  tempStorage.splice(index, 1);

  return tempStorage;
};

//Get number of Tweets per Ticker
export const handleCounts = (tweets) => {
  const counts = [];

  tweets.map((stockSymbol) => {
    const count = {
      title: stockSymbol.body.symbol.title,
      symbol: stockSymbol.body.symbol.symbol,
      count: stockSymbol.body.messages.length,
    };

    return counts.push(count);
  });

  return counts;
};

// Combine Tweets
export const combineTweets = (tweets, data) => {
  const newTweets = tweets;

  for (let i = 0; i < data.length; i++) {
    const tweetIndex = newTweets.findIndex(
      (tweet) => data[i].body.symbol.symbol === tweet.body.symbol.symbol
    );
    
    for (let j = 0; j < data[i].body.messages.length; j++) {
      newTweets[tweetIndex].body.messages.push(data[i].body.messages[j]);
    }
  }

  return newTweets;
};
