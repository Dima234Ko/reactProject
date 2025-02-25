import React from "react";
import ReactDOM from "react-dom/client";
import store from "./store/store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./css/main.css";
import "./css/button.css";
import "./css/input.css";
import "./css/loader.css";
import "./css/header.css";
import "./css/menu.css";
import "./css/form.css";
import "./css/checkbox.css";
import "./css/mobile.css";
import "./css/table.css";
import "./css/radio.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
