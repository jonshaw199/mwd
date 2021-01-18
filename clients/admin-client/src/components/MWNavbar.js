import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: 1400,
  },
  navItems: {
    justifyContent: "space-between",
  },
  navSection: {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
  navSectionCenter: {
    justifyContent: "center",
    textAlign: "center",
  },
  navSectionRight: {
    justifyContent: "flex-end",
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
}));

const MWNavbar = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className="navItems">Test</Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default MWNavbar;
