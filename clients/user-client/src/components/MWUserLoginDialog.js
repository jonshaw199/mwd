import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { closeUserLoginDialog } from "../actions/userActions";
import { logIn } from "../actions/authActions";

const useStyles = makeStyles(() => ({
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
    color: "#333",
  },
  loginErrorText: {
    color: "red",
  },
}));

const MWAdminLoginDialog = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dispatch = useDispatch();
  const classes = useStyles();

  const { userLoginDialogOpen, logInLoading, logInErrors } = useSelector(
    (state) => ({
      userLoginDialogOpen: state.userReducer.userLoginDialogOpen,
      logInLoading: state.authReducer.logInLoading,
      logInErrors: state.authReducer.logInErrors,
    })
  );

  const closeUserLoginDialogCB = React.useCallback(() => {
    dispatch(closeUserLoginDialog());
  }, [dispatch]);

  const logInCB = React.useCallback(() => {
    dispatch(logIn(username, password));
    setUsername("");
    setPassword("");
  }, [dispatch, username, password]);

  return (
    <Dialog open={userLoginDialogOpen} onClose={closeUserLoginDialogCB}>
      <Box py={2} px={3}>
        <TextField
          label="Username"
          fullWidth
          margin="dense"
          inputProps={{ maxLength: 250 }}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          type="password"
          label="Password"
          fullWidth
          margin="dense"
          inputProps={{ maxLength: 250 }}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Box my={1} display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="flex-end">
            {logInErrors && logInErrors.length > 0 && (
              <Typography variant="body2" className={classes.loginErrorText}>
                {logInErrors[0].msg}
              </Typography>
            )}
          </Box>
          <Box
            display="flex"
            flexDirection="horizontal"
            justifyContent="flex-end"
          >
            {logInLoading && (
              <CircularProgress size="24" className={classes.buttonProgress} />
            )}
            <Button
              color="primary"
              variant="contained"
              size="small"
              onClick={logInCB}
            >
              Log In
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

// Prop types

export default MWAdminLoginDialog;
