import React from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useRouteMatch } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import { openDrawer, closeDrawer } from "../actions/drawerActions";

const useStyles = makeStyles((theme) => ({
  toolbarSpacer: theme.mixins.toolbar,
  drawer: {
    width: theme.custom.width.miniDrawerOpen,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: theme.custom.width.miniDrawerOpen,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.custom.width.miniDrawerClosed,
  },
}));

const MWDrawer = (props) => {
  const classes = useStyles();
  const { drawerOpen } = useSelector((state) => ({
    drawerOpen: state.drawerReducer.drawerOpen,
  }));
  const dispatch = useDispatch();
  const setDrawerOpenCB = React.useCallback(
    (open) => {
      if (open) {
        dispatch(openDrawer());
      } else {
        dispatch(closeDrawer());
      }
    },
    [dispatch]
  );

  const handleOtherButtonClickCB = React.useCallback(
    (cb) => {
      setDrawerOpenCB(false);
      cb();
    },
    [setDrawerOpenCB]
  );

  const match = useRouteMatch();

  return (
    <Drawer
      variant="permanent"
      // anchor="left"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: drawerOpen,
        [classes.drawerClose]: !drawerOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: drawerOpen,
          [classes.drawerClose]: !drawerOpen,
        }),
      }}
      onClose={setDrawerOpenCB}
    >
      <div className={classes.toolbarSpacer} />
      <List>
        {props.views &&
          props.views.length > 0 &&
          props.views.map((view) => (
            <ListItem
              button
              key={view.shortName}
              component={Link}
              to={`${match.path}${view.route}`}
              onClick={() => setDrawerOpenCB(false)}
            >
              <ListItemIcon>{view.icon()}</ListItemIcon>
              <ListItemText primary={view.longName} />
            </ListItem>
          ))}
        {props.otherButtons &&
          props.otherButtons.length > 0 &&
          props.otherButtons.map((btn) => (
            <ListItem
              button
              key={btn.name}
              // component={Link}
              onClick={() => handleOtherButtonClickCB(btn.handleClick)}
            >
              <ListItemIcon>{btn.icon()}</ListItemIcon>
              <ListItemText primary={btn.name} />
            </ListItem>
          ))}
      </List>
    </Drawer>
  );
};

MWDrawer.propTypes = {
  views: PropTypes.array,
  otherButtons: PropTypes.array,
};

export default MWDrawer;
