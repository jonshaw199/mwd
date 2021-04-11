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

function MWAboutContent() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [about, setAbout] = React.useState("");
  const [origPrefs, setOrigPrefs] = React.useState();
  const [showButtons, setShowButtons] = React.useState();

  const { preferences } = useSelector((state) => ({
    preferences: state.preferencesReducer.preferences,
  }));

  const setEverything = React.useCallback(() => {
    setAbout(
      preferences && preferences.content ? preferences.content.about : ""
    );
  }, [preferences]);

  React.useEffect(() => {
    setOrigPrefs(preferences && preferences.content ? preferences : null);
    setEverything();
  }, [preferences, setEverything]);

  React.useEffect(() => {
    if (!origPrefs) {
      setShowButtons(false);
    } else if (origPrefs.content.about !== about) {
      setShowButtons(true);
    } else {
      setShowButtons(false);
    }
  }, [about, origPrefs]);

  const handleSaveCB = React.useCallback(() => {
    if (origPrefs) {
      const tmpPrefs = origPrefs;
      tmpPrefs.content.about = about;
      dispatch(updatePreferences(tmpPrefs));
    }
  }, [dispatch, origPrefs, about]);

  const handleCancelCB = React.useCallback(() => {
    setEverything();
  }, [setEverything]);

  return (
    <Box>
      <TextField
        name="about"
        label="About Section"
        fullWidth
        multiline
        rows={10}
        inputProps={{ maxLength: 3333 }}
        value={about}
        onChange={(e) => setAbout(e.target.value)}
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

export default MWAboutContent;
