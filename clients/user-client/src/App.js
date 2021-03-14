import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import ChatIcon from "@material-ui/icons/Chat";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import { useSelector } from "react-redux";
import { MuiThemeProvider } from "@material-ui/core/styles";

import Home from "./views/Home";
import Gallery from "./views/Gallery";
import Contact from "./views/Contact";
import MWNavbar from "./components/MWNavbar";
import MWDrawer from "./components/MWDrawer";
import MWFooter from "./components/MWFooter";
import MWUserLoginDialog from "./components/MWUserLoginDialog";
import "./App.less";

const redir = () => {};

const App = () => {
  const { theme, navHeight, doGoToAdminClient } = useSelector((state) => ({
    projects: state.projectReducer.projects,
    preferences: state.preferencesReducer.preferences,
    theme: state.themeReducer.theme,
    navHeight: state.navReducer.navHeight,
    doGoToAdminClient: state.adminReducer.doGoToAdminClient,
  }));

  const [views] = React.useState([
    {
      home: true,
      shortName: "home",
      longName: "Home",
      route: "/",
      component: () => {
        return <Home />;
      },
      icon: () => {
        return <HomeIcon />;
      },
      level: 1,
    },
    {
      home: false,
      shortName: "gallery",
      longName: "Gallery",
      route: "/gallery",
      component: () => {
        return <Gallery />;
      },
      icon: () => {
        return <PhotoCameraIcon />;
      },
      level: 1,
    },
    {
      home: false,
      shortName: "contact",
      longName: "Contact Us",
      route: "/contact",
      component: () => {
        return <Contact />;
      },
      icon: () => {
        return <ChatIcon />;
      },
      level: 1,
    },
  ]);

  const [otherButtons] = React.useState([]);

  React.useEffect(() => {
    doGoToAdminClient && redir();
  }, [doGoToAdminClient]);

  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <Box>
          <MWNavbar views={views} otherButtons={otherButtons} />
          <Hidden mdUp>
            <MWDrawer views={views} otherButtons={otherButtons} />
          </Hidden>
          <Box>
            <div style={{ height: navHeight + "px" }} />
            {views.map((view) => (
              <Route exact={view.home} path={view.route} key={view.shortName}>
                {view.component()}
              </Route>
            ))}
          </Box>
          <Box>
            <MWFooter />
          </Box>
          <MWUserLoginDialog />
        </Box>
      </MuiThemeProvider>
    </Router>
  );
};

export default App;
