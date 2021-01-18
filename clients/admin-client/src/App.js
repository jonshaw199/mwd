import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";

import "./App.css";
import lightTheme from "./themes/LightTheme";
import darkTheme from "./themes/DarkTheme";
import MWNavbar from "./components/MWNavbar";
import MWDrawer from "./components/MWDrawer";

const SERVER_ADDRESS = "http://localhost:3001";

function App() {
  const [theme, setTheme] = React.useState(darkTheme);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [views, setViews] = React.useState([
    {
      home: true,
      shortName: "dashboard",
      longName: "Dashboard",
      route: "/",
      component: "<div>Dashboard</div>",
      icon: "<DashboardIcon />",
    },
  ]);

  const toggleTheme = () => {
    this.setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <MWNavbar />
        <MWDrawer
          views={views}
          drawerOpen={drawerOpen}
          toggleDrawer={() => setDrawerOpen(!drawerOpen)}
        />
      </ThemeProvider>
    </Router>
  );
}

export default App;
