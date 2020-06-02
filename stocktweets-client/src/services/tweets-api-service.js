import config from "../config";

export async function TweetsApiService(symbol, maxId = '') {
  let stocktwitsQuery = `${config.API_ENDPOINT_TWEETS}/${symbol}`;
  
  if (maxId) {
    stocktwitsQuery = `${config.API_ENDPOINT_TWEETS}/${symbol}/${maxId}`;
  }

  try {
    const response = await fetch(stocktwitsQuery, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': config.API_KEY
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
    return {
      statusCode: 200,
      ticker: symbol,
      body: response.data,
    };
  } catch (error) {
    if (error.response) {
      const { errors } = error.response.data;
      return {
        statusCode: error.response.data.response.status,
        ticker: symbol,
        body: JSON.stringify(errors),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Internal server error" }),
      };
    }
  }
}
