export default (state, action) => {
  switch (action.type) {
    case "SET_STOCKTICKERS":
      return action.payload;

    case "ADD_STOCKTICKER":
      let tempStorage = JSON.parse(localStorage.getItem("stockticker"));

      if (!tempStorage) {
        tempStorage = [];
      }

      tempStorage.push(action.payload);

      localStorage.setItem("stockticker", JSON.stringify(tempStorage));

      return [...tempStorage];

    case "DELETE_STOCKTICKER":
      const tempTickers = state.filter((ticker) => ticker !== action.payload);
      console.log("tempTickers", tempTickers);
      localStorage.setItem("stockticker", JSON.stringify(tempTickers));

      return tempTickers;

    default:
      return state;
  }
};
