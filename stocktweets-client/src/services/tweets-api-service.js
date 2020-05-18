import config from "../config";

const TweetsApiService = {
  get(stockTicker) {
    console.log('Api stockTicker', stockTicker)

    return fetch(config.API_ENDPOINT_TWEETS + "/" + stockTicker, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default TweetsApiService;
