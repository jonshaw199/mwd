import React from "react";
import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { updatePreferences } from "../actions/preferencesActions";
import MWPhoneInput from "./MWPhoneInput";

const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: theme.custom.spacing.button,
  },
}));

function MWInfoGeneral() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [companyName, setCompanyName] = React.useState("");
  const [phoneMasked, setPhoneMasked] = React.useState("");
  const [phoneUnmasked, setPhoneUnmasked] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [origPrefs, setOrigPrefs] = React.useState();
  const [showButtons, setShowButtons] = React.useState();

  const { preferences } = useSelector((state) => ({
    preferences: state.preferencesReducer.preferences,
  }));

  const setEverything = React.useCallback(() => {
    setCompanyName(
      preferences && preferences.companyInfo && preferences.companyInfo.name
        ? preferences.companyInfo.name
        : ""
    );
    setPhoneUnmasked(
      preferences && preferences.companyInfo
        ? preferences.companyInfo.phoneUnmasked
        : ""
    );
    setPhoneMasked(
      preferences && preferences.companyInfo
        ? preferences.companyInfo.phoneMasked
        : ""
    );
    setEmail(
      preferences && preferences.companyInfo
        ? preferences.companyInfo.email
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
    } else if (
      origPrefs.companyInfo.name !== companyName ||
      origPrefs.companyInfo.phoneUnmasked !== phoneUnmasked ||
      origPrefs.companyInfo.email !== email
    ) {
      setShowButtons(true);
    } else {
      setShowButtons(false);
    }
  }, [companyName, phoneUnmasked, email, origPrefs]);

  const handleSaveCB = React.useCallback(() => {
    if (origPrefs) {
      const tmpPrefs = origPrefs;
      tmpPrefs.companyInfo.name = companyName;
      tmpPrefs.companyInfo.phoneUnmasked = phoneUnmasked;
      tmpPrefs.companyInfo.phoneMasked = phoneMasked;
      tmpPrefs.companyInfo.email = email;
      dispatch(updatePreferences(tmpPrefs));
    }
  }, [dispatch, origPrefs, phoneMasked, phoneUnmasked, email, companyName]);

  const handleCancelCB = React.useCallback(() => {
    setEverything();
  }, [setEverything]);

  const handlePhoneInput = (e) => {
    setPhoneMasked(e.target.value);
    setPhoneUnmasked(e.target.value.replace(/\D/g, ""));
  };

  return (
    <Box>
      <TextField
        name="name"
        label="Company Name"
        fullWidth
        inputProps={{ maxLength: 250 }}
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <MWPhoneInput value={phoneMasked} onChange={handlePhoneInput} />
      <TextField
        name="email"
        label="Email Address"
        fullWidth
        inputProps={{ maxLength: 250 }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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

export default MWInfoGeneral;
