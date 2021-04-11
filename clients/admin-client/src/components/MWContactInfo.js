import React from "react";
import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { updatePreferences } from "../actions/preferencesActions";

const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: theme.custom.spacing.button,
  },
}));

function MWContactInfo() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [origPrefs, setOrigPrefs] = React.useState();
  const [showButtons, setShowButtons] = React.useState();
  const [street, setStreet] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setStateState] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [latitude, setLatitude] = React.useState("");
  const [longitude, setLongitude] = React.useState("");

  const { preferences } = useSelector((state) => ({
    preferences: state.preferencesReducer.preferences,
  }));

  const setEverything = React.useCallback(() => {
    setStreet(
      preferences && preferences.companyInfo
        ? preferences.companyInfo.address.streetAddress
        : ""
    );
    setCity(
      preferences && preferences.companyInfo
        ? preferences.companyInfo.address.city
        : ""
    );
    setStateState(
      preferences && preferences.companyInfo
        ? preferences.companyInfo.address.state
        : ""
    );
    setZip(
      preferences && preferences.companyInfo
        ? preferences.companyInfo.address.zip
        : ""
    );
    setLatitude(
      preferences && preferences.companyInfo
        ? preferences.companyInfo.address.latitude
        : ""
    );
    setLongitude(
      preferences && preferences.companyInfo
        ? preferences.companyInfo.address.longitude
        : ""
    );
  }, [preferences]);

  React.useEffect(() => {
    setOrigPrefs(preferences && preferences.companyInfo ? preferences : null);
    setEverything();
  }, [preferences, setEverything]);

  React.useEffect(() => {
    if (!origPrefs) {
      setShowButtons(false);
    } else {
      const info = origPrefs.companyInfo;
      const address = info.address;
      if (
        address.streetAddress !== street ||
        address.city !== city ||
        address.state !== state ||
        address.zip !== zip ||
        address.latitude !== latitude ||
        address.longitude !== longitude
      ) {
        setShowButtons(true);
      } else {
        setShowButtons(false);
      }
    }
  }, [origPrefs, street, city, state, zip, latitude, longitude]);

  const handleSaveCB = React.useCallback(() => {
    if (origPrefs) {
      const tmpPrefs = origPrefs;
      tmpPrefs.companyInfo.address = {
        streetAddress: street,
        city,
        state,
        zip,
        latitude,
        longitude,
      };
      dispatch(updatePreferences(tmpPrefs));
    }
  }, [dispatch, origPrefs, street, city, state, zip, latitude, longitude]);

  const handleCancelCB = React.useCallback(() => {
    setEverything();
  }, [setEverything]);

  return (
    <Box>
      <TextField
        name="street"
        label="Street Address"
        fullWidth
        inputProps={{ maxLength: 250 }}
        value={street}
        onChange={(e) => setStreet(e.target.value)}
      />
      <TextField
        name="city"
        label="City"
        fullWidth
        inputProps={{ maxLength: 250 }}
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <TextField
        name="state"
        label="State"
        fullWidth
        inputProps={{ maxLength: 250 }}
        value={state}
        onChange={(e) => setStateState(e.target.value)}
      />
      <TextField
        name="zip"
        label="ZIP Code"
        fullWidth
        inputProps={{ maxLength: 10 }}
        value={zip}
        onChange={(e) => setZip(e.target.value)}
      />
      <TextField
        name="latitude"
        label="Latitude (for Google Maps)"
        fullWidth
        inputProps={{ maxLength: 250 }}
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
      />
      <TextField
        name="longitude"
        label="Longitude (for Google Maps)"
        fullWidth
        inputProps={{ maxLength: 250 }}
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
      />
      {showButtons && (
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          paddingY={theme.custom.spacing.appBody}
        >
          <Button variant="outlined" onClick={handleCancelCB}>
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSaveCB}
            className={classes.button}
          >
            Save
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default MWContactInfo;
