import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import ChatIcon from "@material-ui/icons/Chat";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import Home from "./views/Home";
import Gallery from "./views/Gallery";
import Contact from "./views/Contact";
import MWNavbar from "./components/MWNavbar";
import MWDrawer from "./components/MWDrawer";
import MWFooter from "./components/MWFooter";
import MWUserLoginDialog from "./components/MWUserLoginDialog";
import { getPreferences } from "./actions/preferencesActions";
import { getProjects } from "./actions/projectActions";
import { getUser } from "./actions/userActions";
import { goToAdminClient as goToAdminClientAction } from "./actions/adminActions";
import { toggleUserLoginDialog } from "./actions/userActions";
import "./App.less";
import Constants from "./Constants";

const App = () => {
  const { theme, navHeight, currentUser } = useSelector((state) => ({
    projects: state.projectReducer.projects,
    // preferences: state.preferencesReducer.preferences,
    theme: state.themeReducer.theme,
    navHeight: state.navReducer.navHeight,
    currentUser: state.userReducer.currentUser,
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

  const dispatch = useDispatch();

  const [otherButtons] = React.useState([
    {
      name: "Log In",
      handleClick: () => dispatch(toggleUserLoginDialog()),
      level: 1,
      icon: () => {
        return <AccountCircleIcon />;
      },
    },
  ]);

  React.useEffect(() => {
    dispatch(getPreferences());
    dispatch(getProjects());
    /*
    const token = localStorage.getItem(Constants.authTokenName);
    if (token && token !== "null") {
      dispatch(getUser());
    }
    */
  }, [dispatch]);

  // Logging into the Admin Client from the User Client is a 2 step process: dispatch adminLoggedIn, get/save token and take care of anything else, then go
  React.useEffect(() => {
    if (Object.keys(currentUser || {}).length)
      localStorage.setItem(Constants.authTokenName, currentUser.token);
    else localStorage.clear(Constants.authTokenName);
  }, [dispatch, currentUser]);

  /*
  React.useEffect(() => {
    false &&
      goToAdminClient &&
      (window.location.href = `${window.location.protocol}//${window.location.host}/admin`);
  }, [goToAdminClient]);
  */

  return (
    <Router>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </Router>
  );
};

export default App;
