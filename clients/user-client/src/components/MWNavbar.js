import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import PhoneIcon from "@material-ui/icons/Phone";
import Hidden from "@material-ui/core/Hidden";
import { withTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Box from "@material-ui/core/Box";

import { changeNavHeight } from "../actions/navActions";
import { toggleDrawer } from "../actions/drawerActions";
import { toggleUserLoginDialog } from "../actions/userActions";

const useStyles = (theme) => ({
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
  phoneIcon: {
    marginRight: "0.5rem",
  },
  lgNavContactButton: {
    borderRight: "none !important",
  },
  accountIconDesktop: {
    fontSize: "26px",
  },
  accountIconMobile: {},
});

class MWNavbar extends React.Component {
  constructor() {
    super();
    this.state = {
      height: null,
    };
    this.handleResize = this.handleResize.bind(this);
  }

  handleResize() {
    const height = this.appBarRef.clientHeight;
    if (height !== this.state.height) {
      this.props.changeNavHeight(height);
      this.setState({ height });
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <AppBar
          position="fixed"
          className={classes.appBar}
          ref={(element) => (this.appBarRef = element)}
        >
          <Toolbar className="navItems">
            <Grid container>
              <Grid item xs>
                <div className={classes.navSection}>
                  <Hidden smDown>
                    <Typography variant="h6">May Welding</Typography>
                  </Hidden>
                  <Hidden mdUp>
                    <IconButton
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      onClick={() => this.props.toggleDrawer()}
                    >
                      <MenuIcon />
                    </IconButton>
                  </Hidden>
                </div>
              </Grid>
              <Hidden mdUp>
                <Grid item xs>
                  <div
                    className={`${classes.navSection} ${classes.navSectionCenter}`}
                  >
                    <Typography variant="h6">May Welding</Typography>
                  </div>
                </Grid>
              </Hidden>
              <Grid item xs>
                <div className={classes.navSectionRight}>
                  {/*
                  <Hidden smDown>
                    <ButtonGroup variant="text">
                      <Button color="inherit" className={classes.lgNavContactButton}>
                        <PhoneIcon className={classes.phoneIcon} />
                        916.123.4567
                      </Button>
                      <Button color="inherit" className={classes.lgNavContactButton}>
                        <Email />
                      </Button>
                      <Button color="inherit" className={classes.lgNavContactButton}>
                        <InstagramIcon />
                      </Button>
                    </ButtonGroup>
                  </Hidden>
                  */}
                  <Hidden smDown>
                    {this.props.views &&
                      this.props.views.length &&
                      this.props.views.map((view) => (
                        <Button
                          color="inherit"
                          key={view.longName}
                          component={Link}
                          to={view.route}
                        >
                          {view.longName}
                        </Button>
                      ))}
                    {this.props.otherButtons &&
                      this.props.otherButtons.length &&
                      this.props.otherButtons.map((btn) => (
                        <Button
                          color="inherit"
                          key={btn.name}
                          onClick={btn.handleClick}
                        >
                          {btn.name}
                        </Button>
                      ))}
                    <Box ml={2}>
                      <IconButton
                        edge="start"
                        color="inherit"
                        area-label="account"
                        onClick={() => this.props.toggleUserLoginDialog()}
                      >
                        <AccountCircleIcon
                          className={classes.accountIconDesktop}
                        />
                      </IconButton>
                    </Box>
                  </Hidden>
                  <Hidden mdUp>
                    {/*
                    <Button color="inherit">
                      <Hidden smDown>
                        <PhoneIcon className={classes.phoneIcon} />
                      </Hidden>
                      916.123.4567
                    </Button>
                    */}
                    <IconButton
                      edge="start"
                      color="inherit"
                      area-label="account"
                      onClick={() => this.props.toggleUserLoginDialog()}
                    >
                      <AccountCircleIcon
                        className={classes.accountIconMobile}
                      />
                    </IconButton>
                  </Hidden>
                </div>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

MWNavbar.propTypes = {
  views: PropTypes.array.isRequired,
  otherButtons: PropTypes.array.isRequired,
};

export default connect(null, {
  changeNavHeight,
  toggleDrawer,
  toggleUserLoginDialog,
})(withStyles(useStyles)(withTheme(MWNavbar)));
