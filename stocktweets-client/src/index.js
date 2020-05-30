import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { GlobalProvider } from "./Context/GlobalContext";
import "./scss/style.scss";

ReactDOM.render(
  <BrowserRouter>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
