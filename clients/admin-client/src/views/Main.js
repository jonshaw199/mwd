import React from "react";
import { Route, Switch } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import InfoIcon from "@material-ui/icons/Info";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import { useSelector } from "react-redux";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CreateIcon from "@material-ui/icons/Create";
import { Redirect } from "react-router-dom";

import MWNavbar from "../components/MWNavbar";
import MWDrawer from "../components/MWDrawer";
import Dashboard from "./main/Dashboard";
import CompanyInfo from "./main/CompanyInfo";
import Projects from "./main/Projects";
import Users from "./main/Users";
import Content from "./main/Content";

function Main() {
  const { theme, currentUser } = useSelector((state) => ({
    // preferences: state.preferencesReducer.preferences,
    theme: state.themeReducer.theme,
    currentUser: state.userReducer.currentUser,
  }));

  const [views] = React.useState([
    {
      home: true,
      shortName: "dashboard",
      longName: "Dashboard",
      route: "/",
      component: () => {
        return <Dashboard />;
      },
      icon: () => {
        return <DashboardIcon />;
      },
    },
    {
      home: false,
      shortName: "company",
      longName: "Company Info",
      route: "/company",
      component: () => {
        return <CompanyInfo />;
      },
      icon: () => {
        return <InfoIcon />;
      },
    },
    {
      home: false,
      shortName: "content",
      longName: "Content",
      route: "/content",
      component: () => {
        return <Content />;
      },
      icon: () => {
        return <CreateIcon />;
      },
    },
    {
      home: false,
      shortName: "projects",
      longName: "Projects",
      route: "/projects",
      component: () => {
        return <Projects />;
      },
      icon: () => {
        return <PhotoLibraryIcon />;
      },
    },
    {
      home: false,
      shortName: "users",
      longName: "Users",
      route: "/users",
      component: () => {
        return <Users />;
      },
      icon: () => {
        return <AccountCircleIcon />;
      },
    },
  ]);

  // If not authenticated then redirect to login
  if (!currentUser || !currentUser.token) {
    return <Redirect to={"/admin"} />;
  }

  return (
    <Box>
      <MWNavbar />
      <Toolbar />
      <MWDrawer views={views} />
      <Box paddingLeft={theme.custom.width.miniDrawerClosed}>
        <Box padding={theme.custom.spacing.appBody}>
          <Switch>
            {views.map((view) => (
              <Route
                exact={view.home}
                path={`/authenticated${view.route}`}
                key={view.shortName}
              >
                {view.component()}
              </Route>
            ))}
          </Switch>
        </Box>
      </Box>
    </Box>
  );
}

export default Main;
