export default (state, action) => {
  switch (action.type) {
    case "SET_TWEETS":
      console.log("set_tweets", action.payload);
      const setTweets = [];

      action.payload.forEach((stockTicker) => {
        setTweets.push({
          status: stockTicker.body.response.status,
          maxId: stockTicker.body.cursor.since,
          messages: stockTicker.body.messages,
          symbol: stockTicker.body.symbol.symbol,
          title: stockTicker.body.symbol.title,
        });
      });

      return setTweets;

    case "ADD_TWEETS":
      console.log("addTweets", action.payload);
      const tempTweets = state;
      console.log("tempTweets", tempTweets);

      tempTweets.push({
        status: action.payload.body.response.status,
        maxId: action.payload.body.cursor.since,
        messages: action.payload.body.messages,
        symbol: action.payload.body.symbol.symbol,
        title: action.payload.body.symbol.title,
      });

      return [...tempTweets];

    case "DELETE_TWEETS":
      return state.filter((stockTicker) => stockTicker.symbol !== action.payload);

    case "UPDATE_TWEETS":
      console.log("update tweets");
      const newTweets = action.payload;
      const tweets = state;

      console.log("newTweets", newTweets, newTweets.body.messages.length);
      console.log("tweets", tweets);

      if (newTweets.body.messages.length > 0) {
        const index = tweets.findIndex(
          (ticker) => ticker.symbol.toUpperCase() === newTweets.body.symbol.symbol.toUpperCase()
        );
        console.log("tweets index", index);

        tweets[index].maxId = newTweets.body.cursor.since;

        for (let i = 0; i < newTweets.body.messages.length; i++) {
          tweets[index].messages.push(newTweets.body.messages[i]);
        }

        console.log("updated tweets", tweets);

        return [...tweets];
      }

      return state;

    default:
      return state;
  }
};
