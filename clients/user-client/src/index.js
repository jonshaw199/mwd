import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "fontsource-roboto";
import "fontsource-playfair-display";
import "fontsource-quicksand";
import { Provider as StoreProvider } from "react-redux";
import store from "./store";

import { getPreferences } from "./actions/preferencesActions";
import { getProjects } from "./actions/projectActions";
import { getUser } from "./actions/userActions";

// Initialize app
store.dispatch(getPreferences());
store.dispatch(getProjects());
store.dispatch(getUser());

ReactDOM.render(
  /* <React.StrictMode> */
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
  /* </React.StrictMode> */ document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
