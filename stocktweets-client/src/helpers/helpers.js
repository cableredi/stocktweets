//Get number of Tweets per Ticker
export const handleCounts = (tweets) => {
  const counts = [];

  tweets.map((stockSymbol) => {
    const count = {
      title: stockSymbol.title,
      symbol: stockSymbol.symbol,
      count: stockSymbol.messages.length,
    };

    return counts.push(count);
  });

  return counts;
};