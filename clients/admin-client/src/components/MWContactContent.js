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

function MWContactContent() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [contact1, setContact1] = React.useState("");
  const [contact2, setContact2] = React.useState("");
  const [origPrefs, setOrigPrefs] = React.useState();
  const [showButtons, setShowButtons] = React.useState();

  const { preferences } = useSelector((state) => ({
    preferences: state.preferencesReducer.preferences,
  }));

  const setEverything = React.useCallback(() => {
    setContact1(
      preferences && preferences.content ? preferences.content.contact1 : ""
    );
    setContact2(
      preferences && preferences.content ? preferences.content.contact2 : ""
    );
  }, [preferences]);

  React.useEffect(() => {
    setOrigPrefs(preferences && preferences.content ? preferences : null);
    setEverything();
  }, [preferences, setEverything]);

  React.useEffect(() => {
    if (!origPrefs) {
      setShowButtons(false);
    } else if (
      origPrefs.content.contact1 !== contact1 ||
      origPrefs.content.contact2 !== contact2
    ) {
      setShowButtons(true);
    } else {
      setShowButtons(false);
    }
  }, [contact1, contact2, origPrefs]);

  const handleSaveCB = React.useCallback(() => {
    if (origPrefs) {
      const tmpPrefs = origPrefs;
      tmpPrefs.content.contact1 = contact1;
      tmpPrefs.content.contact2 = contact2;
      dispatch(updatePreferences(tmpPrefs));
    }
  }, [dispatch, origPrefs, contact1, contact2]);

  const handleCancelCB = React.useCallback(() => {
    setEverything();
  }, [setEverything]);

  return (
    <Box>
      <TextField
        name="contact1"
        label="Contact Section 1"
        fullWidth
        multiline
        rows={7}
        inputProps={{ maxLength: 3333 }}
        value={contact1}
        onChange={(e) => setContact1(e.target.value)}
      />
      <TextField
        name="contact2"
        label="Contact Section 2"
        fullWidth
        multiline
        rows={7}
        inputProps={{ maxLength: 3333 }}
        value={contact2}
        onChange={(e) => setContact2(e.target.value)}
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

export default MWContactContent;
