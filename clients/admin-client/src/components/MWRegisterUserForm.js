import React from "react";
// import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
// import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Validation from "../api/Validation";
import { registerUser } from "../actions/userActions";

// const useStyles = makeStyles((theme) => ({}));

const MWRegisterUserForm = () => {
  const theme = useTheme();
  // const classes = useStyles();
  const dispatch = useDispatch();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [emailInvalid, setEmailInvalid] = React.useState(false);
  const [invalidEmailMessage, setInvalidEmailMessage] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [usernameInvalid, setUsernameInvalid] = React.useState(false);
  const [invalidUsernameMessage, setInvalidUsernameMessage] = React.useState(
    ""
  );
  const [password, setPassword] = React.useState("");
  const [passwordInvalid, setPasswordInvalid] = React.useState(false);
  const [invalidPasswordMessage, setInvalidPasswordMessage] = React.useState(
    ""
  );

  const clearInvalidEmail = () => {
    setEmailInvalid(false);
    setInvalidEmailMessage("");
  };

  const handleEmailInput = (e) => {
    setEmailAddress(e.target.value);
    clearInvalidEmail();
  };

  const handleEmailInputBlur = async () => {
    if (!emailAddress) {
      setEmailInvalid(true);
      setInvalidEmailMessage("Please enter an email address");
    } else {
      const response = await Validation.validateFields({
        email: emailAddress,
      });
      if (response.data && response.data.email) {
        setEmailInvalid(true);
        setInvalidEmailMessage(response.data.email);
      } else {
        clearInvalidEmail();
      }
    }
  };

  const clearInvalidUsername = () => {
    setUsernameInvalid(false);
    setInvalidUsernameMessage("");
  };

  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
    clearInvalidUsername();
  };

  const handleUsernameInputBlur = async () => {
    if (!username) {
      setUsernameInvalid(true);
      setInvalidUsernameMessage("Please enter a username");
    } else {
      const response = await Validation.validateFields({
        username,
      });
      if (response.data && response.data.username) {
        setUsernameInvalid(true);
        setInvalidUsernameMessage(response.data.username);
      } else {
        clearInvalidUsername();
      }
    }
  };

  const clearInvalidPassword = () => {
    setPasswordInvalid(false);
    setInvalidPasswordMessage("");
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
    clearInvalidPassword();
  };

  const handlePasswordInputBlur = async () => {
    if (!password) {
      setPasswordInvalid(true);
      setInvalidPasswordMessage("Please enter a username");
    } else {
      const response = await Validation.validateFields({
        password,
      });
      if (response.data && response.data.password) {
        setPasswordInvalid(true);
        setInvalidPasswordMessage(response.data.password);
      } else {
        clearInvalidPassword();
      }
    }
  };

  const getReqBodyCB = React.useCallback(() => {
    return {
      email: emailAddress,
      username,
      password,
    };
  }, [emailAddress, username, password]);

  const registerUserCB = React.useCallback(() => {
    dispatch(registerUser(getReqBodyCB()));
    setEmailAddress("");
    setUsername("");
    setPassword("");
  }, [dispatch, getReqBodyCB]);

  return (
    <Box>
      <TextField
        name="emailAddress"
        required
        label="Email Address"
        fullWidth
        inputProps={{ maxLength: 320 }}
        error={emailInvalid}
        helperText={invalidEmailMessage}
        value={emailAddress}
        onBlur={() => handleEmailInputBlur()}
        onChange={(event) => handleEmailInput(event)}
      />
      <TextField
        name="username"
        required
        label="Username"
        fullWidth
        inputProps={{ maxLength: 250 }}
        error={usernameInvalid}
        helperText={invalidUsernameMessage}
        value={username}
        onBlur={() => handleUsernameInputBlur()}
        onChange={(event) => handleUsernameInput(event)}
      />
      <TextField
        name="password"
        required
        label="Password"
        fullWidth
        inputProps={{ maxLength: 250 }}
        error={passwordInvalid}
        helperText={invalidPasswordMessage}
        value={password}
        onBlur={() => handlePasswordInputBlur()}
        onChange={(event) => handlePasswordInput(event)}
      />
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        paddingY={theme.custom.spacing.appBody}
      >
        <Button color="primary" variant="contained" onClick={registerUserCB}>
          Create User
        </Button>
      </Box>
    </Box>
  );
};

MWRegisterUserForm.propTypes = {};

export default MWRegisterUserForm;
