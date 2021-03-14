import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

import { Provider as StoreProvider } from "react-redux";
import store from "./store";
import "./index.css";
import App from "./App";

import { getPreferences } from "./actions/preferencesActions";
import { getProjects } from "./actions/projectActions";
import { getUser } from "./actions/userActions";

import "fontsource-roboto";

// Initialize app
store.dispatch(getPreferences());
store.dispatch(getProjects());
store.dispatch(getUser());

ReactDOM.render(
  /*<React.StrictMode>*/
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
  /*</React.StrictMode>*/ document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
