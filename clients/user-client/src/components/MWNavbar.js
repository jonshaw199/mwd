import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
import { withTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import Box from "@material-ui/core/Box";

import { changeNavHeight } from "../actions/navActions";
import { toggleDrawer } from "../actions/drawerActions";
import Constants from "../Constants";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: 1400,
  },
  navToolbar: {
    justifyContent: "space-between",
    height: theme.custom.height.navbar.large,
    paddingTop: "0.66rem",
    paddingBottom: "0.66rem",
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
  smallLogo: {
    height: "100%",
    width: "auto",
  },
  bigLogo: {
    height: "100%",
    width: "auto",
  },
  navGrid: {
    height: "100%",
  },
  navGridItem: {
    height: "100%",
  },
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
      <AppBar
        className={classes.appBar}
        ref={(element) => (this.appBarRef = element)}
      >
        <Toolbar className={classes.navToolbar}>
          <Grid container className={classes.navGrid}>
            <Grid item xs className={classes.navGridItem}>
              <div className={classes.navSection}>
                <Hidden smDown>
                  <img
                    src={Constants.staticFiles.logo}
                    alt="May Welding and Design"
                    className={classes.bigLogo}
                  />
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
              <Grid item xs className={classes.navGridItem}>
                <div
                  className={`${classes.navSection} ${classes.navSectionCenter}`}
                >
                  <img
                    src={Constants.staticFiles.logo}
                    alt="May Welding and Design"
                    className={classes.smallLogo}
                  />
                </div>
              </Grid>
            </Hidden>
            <Grid item xs className={classes.navGridItem}>
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
                    this.props.views.length > 0 &&
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
                    this.props.otherButtons.length > 0 &&
                    this.props.otherButtons.map((btn) => (
                      <Button
                        color="inherit"
                        key={btn.name}
                        onClick={btn.handleClick}
                      >
                        {btn.name}
                      </Button>
                    ))}
                </Hidden>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
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
})(withStyles(useStyles)(withTheme(MWNavbar)));
