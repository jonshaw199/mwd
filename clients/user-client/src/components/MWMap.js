import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  GoogleMap,
  useJsApiLoader,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const CustomMapMarkerImage = require("../res/MapMarker.png");

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    width: "100%",
    height: "400px",
  },
  mapOverlayContainer: {
    position: "absolute",
    bottom: "0",
    right: "0",
    // width: "100%",
    // height: "100%",
    // top: "0",
  },
  root: {
    width: "100%",
    height: "400px",
    position: "relative",
  },
}));

const Map = ({ center, zoom, children }) => {
  const [map, setMap] = React.useState(null);
  const [defaultMapCenter, setDefaultMapCenter] = React.useState(center);
  const [tmpZoom, setTmpZoom] = React.useState(zoom);
  const [showInfoWindow, setShowInfoWindow] = React.useState(true);
  const [currentAnimation, setCurrentAnimation] = React.useState(0);
  const theme = useTheme();
  const classes = useStyles();

  const mapStyles = [
    {
      featureType: "administrative",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#444444",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [
        {
          color: theme.palette.primary.main,
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.business",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "all",
      stylers: [
        {
          saturation: -100,
        },
        {
          lightness: 45,
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "all",
      stylers: [
        {
          visibility: "simplified",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [
        {
          color: "#b4d4e1",
        },
        {
          visibility: "on",
        },
      ],
    },
  ];

  React.useEffect(() => {
    setTmpZoom(zoom);
  }, [zoom]);

  const zoomCB = (direction) => {
    setTmpZoom(direction === "in" ? tmpZoom + 1 : tmpZoom - 1);
  };

  const toggleInfoWindow = () => {
    if (showInfoWindow) {
      setShowInfoWindow(false);
      setCurrentAnimation(1);
    } else {
      setShowInfoWindow(true);
      setCurrentAnimation(0);
    }
  };

  React.useEffect(() => {
    map && map.setZoom(tmpZoom);
  }, [map, tmpZoom]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
  });

  const onLoad = React.useCallback(
    function callback(map) {
      // const bounds = new window.google.maps.LatLngBounds();
      // map.fitBounds(bounds);
      map.setOptions({
        styles: mapStyles,
        disableDefaultUI: true,
      });
      setMap(map);
    },
    [mapStyles]
  );

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  React.useEffect(() => {
    const mapCenter = { ...center };
    mapCenter.lng = mapCenter.lng - 0.08;
    mapCenter.lat = mapCenter.lat - 0.0;
    setDefaultMapCenter(mapCenter);
  }, [center]);

  return isLoaded ? (
    <Box className={classes.root}>
      <GoogleMap
        mapContainerClassName={classes.mapContainer}
        center={defaultMapCenter}
        zoom={tmpZoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <Marker
          animation={currentAnimation}
          position={center}
          onClick={toggleInfoWindow}
          icon={CustomMapMarkerImage}
        >
          {showInfoWindow && (
            <InfoWindow position={center} onCloseClick={toggleInfoWindow}>
              <Box>{children}</Box>
            </InfoWindow>
          )}
        </Marker>
      </GoogleMap>
      <Box className={classes.mapOverlayContainer}>
        <Box
          display="flex"
          height={1}
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Box p={3}>
            <ButtonGroup
              orientation="vertical"
              size="small"
              color="primary"
              variant="contained"
            >
              <Button onClick={() => zoomCB("in")}>
                <AddIcon />
              </Button>
              <Button onClick={() => zoomCB("out")}>
                <RemoveIcon />
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Box>
    </Box>
  ) : (
    <></>
  );
};

Map.propTypes = {
  center: PropTypes.object.isRequired,
  zoom: PropTypes.number.isRequired,
};

export default React.memo(Map);
