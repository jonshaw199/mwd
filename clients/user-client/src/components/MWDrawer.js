import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PropTypes from "prop-types";

import { useSelector, useDispatch } from "react-redux";
import { toggleDrawer } from "../actions/drawerActions";

const useStyles = makeStyles((theme) => ({
  toolbarSpacer: (props) => ({
    height: props.navHeight,
  }),
}));

const MWDrawer = (props) => {
  const { drawerOpen, navHeight } = useSelector((state) => ({
    drawerOpen: state.drawerReducer.drawerOpen,
    navHeight: state.navReducer.navHeight,
  }));
  const classes = useStyles({ ...props, navHeight });
  const dispatch = useDispatch();
  const toggleDrawerCB = React.useCallback(() => dispatch(toggleDrawer()), [
    dispatch,
  ]);

  const handleOtherButtonClickCB = React.useCallback(
    (cb) => {
      dispatch(toggleDrawer());
      cb();
    },
    [dispatch]
  );

  return (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawerCB}>
      <div className={classes.toolbarSpacer} />
      <List>
        {props.views &&
          props.views.length > 0 &&
          props.views.map((view) => (
            <ListItem
              button
              key={view.shortName}
              component={Link}
              to={view.route}
              onClick={toggleDrawerCB}
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
  views: PropTypes.array.isRequired,
  otherButtons: PropTypes.array.isRequired,
};

export default MWDrawer;
