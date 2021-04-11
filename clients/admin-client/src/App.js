import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import "./App.css";

import Login from "./views/Login";
import Main from "./views/Main";

const mainAppPath = "/admin";

function App() {
  const { theme } = useSelector((state) => ({
    // preferences: state.preferencesReducer.preferences,
    theme: state.themeReducer.theme,
  }));

  // Validate any existing tokens

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/admin" key="login">
            <Login mainAppPath="/authenticated" />
          </Route>
          <Route path="/authenticated" key="main">
            <Main />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
