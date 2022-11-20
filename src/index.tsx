import React from "react";
import ReactDOM from "react-dom/client";
import "assets/styles/css/index.css";
import "assets/styles/css/modal.css";
import { Provider } from "react-redux";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "redux/store";
import axios from "axios";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
