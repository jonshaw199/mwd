import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import CreateIcon from "@material-ui/icons/Create";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

import MWQuoteDialog from "../components/MWQuoteDialog";
import { openQuoteDialog } from "../actions/quoteDialogActions";
import BruceLeeSignature from "../res/BruceLeeSignature.png";
import MWHeading from "../components/MWHeading";

const backgroundImage = require("../res/background.jpg");

const useStyles = makeStyles((theme) => ({
  fullPageImage: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
  },
  gridContainer: {
    height: "100%",
    paddingTop: "25%",
    paddingBottom: "25%",
  },
  fullPageImageGrid: {
    height: "100%",
    paddingTop: "10%",
    paddingBottom: "10%",
  },
  blackBackground: {
    backgroundColor: "rgba(0, 0, 0, .6)",
    color: "#fff",
  },
  signatureContainer: {
    [theme.breakpoints.up(200)]: {
      paddingRight: "2rem",
    },
    [theme.breakpoints.up("sm")]: {
      paddingRight: "4rem",
    },
    [theme.breakpoints.up("md")]: {
      paddingRight: "8rem",
    },
    [theme.breakpoints.up("lg")]: {
      paddingRight: "16rem",
    },
  },
  signature: {
    width: "125px",
    height: "auto",
    transform: "translate(2px, -3px)",
  },
  serviceIcon: {
    width: "90%",
    height: "auto",
    maxWidth: "4rem",
    marginBottom: "1rem",
  },
  serviceContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  servicesGrid: {
    margin: 0,
    width: "100%",
  },
}));

const Home = () => {
  const { navHeight, preferences } = useSelector((state) => ({
    navHeight: state.navReducer.navHeight,
    preferences: state.preferencesReducer.preferences,
  }));
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const openQuoteDialogCB = React.useCallback(
    () => dispatch(openQuoteDialog()),
    [dispatch]
  );

  return (
    <Box>
      <div
        className={classes.fullPageImage}
        style={{ height: `calc(100vh - ${navHeight}px)` }}
      >
        <Box
          p={theme.custom.spacing.appBody}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          width={1}
        >
          <Box flexGrow={1} />
          <Box flexGrow={4} display="flex" justifyContent="center">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width={1}
            >
              <Box
                className={classes.blackBackground}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                p={2}
                width={1}
              >
                <Box py={theme.custom.spacing.appBody} textAlign="center">
                  <Hidden smUp>
                    <Typography variant="h5">
                      Proudly Serving Northern California For 20 Years
                    </Typography>
                  </Hidden>
                  <Hidden xsDown>
                    <Typography variant="h4">
                      Proudly Serving Northern California For 20 Years
                    </Typography>
                  </Hidden>
                </Box>
                <Box py={theme.custom.spacing.appBody}>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={openQuoteDialogCB}
                      >
                        Get A Free Quote
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" color="primary">
                        Call: 123.456.7890
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box flexGrow={1} />
        </Box>
      </div>

      {/*
          Services
        */}
      <Box p={theme.custom.spacing.appBody} textAlign="center">
        <MWHeading text={"Services"} />
        <Box
          display="flex"
          justifyContent="center"
          mt={theme.custom.spacing.verticalHeading}
        >
          <Box
            width={1}
            maxWidth={theme.custom.width.maxTextWidth}
            mt={theme.custom.spacing.aLittleExtra}
          >
            <Grid container spacing={7} className={classes.servicesGrid}>
              <Grid item xs={12} md={4}>
                <Box className={classes.serviceContainer}>
                  <LocalShippingIcon className={classes.serviceIcon} />
                  <Box justifyContent="center" alignItems="center">
                    <Box>
                      <Typography variant="h5">Mobile Welding</Typography>
                    </Box>
                    <Box pt={1}>
                      <Typography variant="body1">
                        Let us come to you! We'll bring our welding rig to your
                        job site to meet your welding needs.
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box className={classes.serviceContainer}>
                  <CreateIcon className={classes.serviceIcon} />
                  <Box justifyContent="center" alignItems="center">
                    <Box>
                      <Typography variant="h5">Custom Fabrication</Typography>
                    </Box>
                    <Box pt={1}>
                      <Typography variant="body1">
                        You think it, we make it! Contact us today to turn your
                        dreams into a reality.
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box className={classes.serviceContainer}>
                  <VerifiedUserIcon className={classes.serviceIcon} />
                  <Box justifyContent="center" alignItems="center">
                    <Box>
                      <Typography variant="h5">Unparalleled Quality</Typography>
                    </Box>
                    <Box pt={1}>
                      <Typography variant="body1">
                        Our work speaks for itself. Head over to the image
                        gallery now!
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>

      {
        /*
          Note
        */
        preferences &&
          preferences.content &&
          preferences.content.about &&
          preferences.content.about.length > 0 && (
            <Box p={theme.custom.spacing.appBody}>
              <MWHeading text={"Our Promise"} />
              <Box
                display="flex"
                justifyContent="center"
                mt={theme.custom.spacing.verticalHeading}
              >
                <Box
                  textAlign="center"
                  maxWidth={theme.custom.width.maxTextWidth}
                >
                  <Typography variant={theme.custom.typography.body}>
                    {preferences.content.about}
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                mt={theme.custom.spacing.noHeading}
              >
                <Box display="flex" justifyContent="flex-end" width={1}>
                  <Box className={classes.signatureContainer}>
                    <Box>
                      <Box>
                        <Typography variant={theme.custom.typography.body}>
                          Spencer May,
                        </Typography>
                      </Box>
                      <Box>
                        <img
                          src={BruceLeeSignature}
                          alt="Signature"
                          className={classes.signature}
                        />
                      </Box>
                      <Box>
                        <Typography variant={theme.custom.typography.body}>
                          Owner/Operator
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          )
      }
      <MWQuoteDialog />
    </Box>
  );
};

export default Home;
