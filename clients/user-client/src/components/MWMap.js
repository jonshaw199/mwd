import React from "react";
import GoogleMapReact from "google-map-react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      height: "300px",
    },
    [theme.breakpoints.up("md")]: {
      height: "135px",
    },
  },
}));

const Map = (props) => {
  const classes = useStyles();
  return (
    <Box className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API }}
        defaultCenter={props.center}
        defaultZoom={props.zoom}
      />
    </Box>
  );
};

Map.propTypes = {
  center: PropTypes.object.isRequired,
  zoom: PropTypes.number.isRequired,
};

export default Map;
