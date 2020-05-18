import React, { useState } from "react";

export default function Searchbar(props) {
  const [userInput, setUserInput] = useState("");
  const inputSymbols = [];

  //Handle Submit
  function handleSubmit(e) {
    e.preventDefault();
    const symbols = userInput;

    let symbolsArray = symbols.split(",").map((item) => item.trim());

    symbolsArray.map((symbol) => {
      let newSymbol = checkTicker(symbol);
      return newSymbol ? inputSymbols.push(checkTicker(symbol)) : "";
    });

    props.setSearchValue(inputSymbols);
    setUserInput("");
  }

  //Check if symbols already exist
  function checkTicker(symbol) {
    let storage = JSON.parse(localStorage.getItem("stockticker"));

    let item = storage
      ? storage.find((ticker) => ticker.toUpperCase() === symbol.toUpperCase())
        ? null
        : symbol.toUpperCase()
      : symbol.toUpperCase();

    return item;
  }

  //Update state with use input
  function handleUserInput(e) {
    setUserInput(e.target.value);
  }

  return (
    <form className="SearchTickerForm" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="ticker">Ticker Symbols: </label>
      <input
        type="search"
        name="ticker"
        placeholder="AAPL, GM, etc"
        value={userInput}
        onChange={handleUserInput}
      />
      <button className="SearchTickerForm__button" type="submit">
        Search
      </button>
    </form>
  );
}
