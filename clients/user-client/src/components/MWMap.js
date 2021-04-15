import React from "react";
import GoogleMapReact from "google-map-react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import RoomIcon from "@material-ui/icons/Room";

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

const Map = ({ center, zoom }) => {
  const classes = useStyles();
  return (
    <Box className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <RoomIcon
          fontSize="large"
          color="secondary"
          lat={center.lat}
          lng={center.lng}
        />
      </GoogleMapReact>
    </Box>
  );
};

Map.propTypes = {
  center: PropTypes.object.isRequired,
  zoom: PropTypes.number.isRequired,
};

export default Map;
