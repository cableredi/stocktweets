import config from "../config";

export async function TweetsApiService(symbol, parameters) {
  const stocktwitsQuery = parameters 
    ? `${config.API_ENDPOINT_TWEETS}/${symbol}.json?since=${parameters}`
    : `${config.API_ENDPOINT_TWEETS}/${symbol}`;

  try {
    const response = await fetch(stocktwitsQuery, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
    return {
      statusCode: 200,
      body: response.data,
    };
  } catch (error) {
    if (error.response) {
      const { errors } = error.response.data;
      return {
        statusCode: error.response.data.response.status,
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
