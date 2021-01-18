import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const useStyles = makeStyles((theme) => ({
  toolbarSpacer: theme.mixins.toolbar,
}));

const MWDrawer = (props) => {
  const classes = useStyles();
  return (
    <Drawer anchor="left" open={props.drawerOpen} onClose={props.toggleDrawer}>
      <div className={classes.toolbarSpacer} />
      <List>
        {props.views.map((view) => (
          <ListItem
            button
            key={view.shortName}
            component={Link}
            to={view.route}
            onClick={props.toggleDrawer}
          >
            <ListItemIcon>{view.icon}</ListItemIcon>
            <ListItemText primary={view.longName} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default MWDrawer;
