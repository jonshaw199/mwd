import React from "react";
// import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
// import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { logIn } from "../actions/authActions";

// const useStyles = makeStyles((theme) => ({}));

const MWLoginForm = () => {
  const theme = useTheme();
  // const classes = useStyles();
  const dispatch = useDispatch();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const logInCB = React.useCallback(() => {
    dispatch(logIn(username, password));
    setUsername("");
    setPassword("");
  }, [dispatch, username, password]);

  return (
    <Box>
      <TextField
        name="username"
        label="Username"
        fullWidth
        inputProps={{ maxLength: 250 }}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        name="password"
        label="Password"
        fullWidth
        inputProps={{ maxLength: 250 }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        paddingY={theme.custom.spacing.appBody}
      >
        <Button color="primary" variant="contained" onClick={logInCB}>
          Log In
        </Button>
      </Box>
    </Box>
  );
};

MWLoginForm.propTypes = {};

export default MWLoginForm;
