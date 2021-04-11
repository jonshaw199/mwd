import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";

import { toggleDrawer } from "../actions/drawerActions";
import MWDatetime from "./MWDatetime";
import Constants from "../Constants";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.navbar,
    backgroundColor: theme.palette.primary.main,
  },
  sessionInfoItem: {
    paddingLeft: "15px",
  },
  sessionInfoItemKey: {
    fontSize: "11px",
    fontWeight: 500,
  },
  sessionInfoItemValue: {
    fontSize: "11px",
    fontWeight: 400,
    paddingLeft: "5px",
  },
  logoImage: {
    width: "75px",
    height: "auto",
  },
}));

const MWNavbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const toggleDrawerCB = React.useCallback(() => {
    dispatch(toggleDrawer());
  }, [dispatch]);
  const { currentUser } = useSelector((state) => ({
    currentUser: state.userReducer.currentUser,
  }));
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Grid container>
          <Grid item xs={6} sm={2}>
            <Box display="flex" alignItems="center" height={1}>
              <img
                src={Constants.staticFiles.logo}
                className={classes.logoImage}
                onClick={toggleDrawerCB}
                alt="MWD Logo"
              />
            </Box>
          </Grid>
          <Grid item xs={6} sm={10}>
            <Hidden xsDown>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                height={1}
              >
                <Box className={classes.sessionInfoItem}>
                  <span className={classes.sessionInfoItemKey}>User:</span>
                  <span className={classes.sessionInfoItemValue}>
                    {currentUser &&
                    currentUser.user &&
                    currentUser.user.username
                      ? currentUser.user.username
                      : "None"}
                  </span>
                </Box>
                <Box className={classes.sessionInfoItem}>
                  <span className={classes.sessionInfoItemKey}>Date/Time:</span>
                  <span className={classes.sessionInfoItemValue}>
                    <MWDatetime />
                  </span>
                </Box>
              </Box>
            </Hidden>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default MWNavbar;
