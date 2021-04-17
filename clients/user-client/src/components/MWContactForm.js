import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

import MWPhoneInput from "./MWPhoneInput";
import Validation from "../api/Validation";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  stepper: {
    // width: "100%",
    padding: 0,
  },
  buttonGroup: {
    width: "100%",
    // display: "flex",
    justifyContent: "flex-end",
  },
}));

function MWContactForm({ sendHandler }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [emailInvalid, setEmailInvalid] = React.useState(false);
  const [phoneInvalid, setPhoneInvalid] = React.useState(false);
  const [invalidEmailMessage, setInvalidEmailMessage] = React.useState("");
  const [invalidPhoneMessage, setInvalidPhoneMessage] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [phoneNumberMasked, setPhoneNumberMasked] = React.useState("");
  const [phoneNumberUnmasked, setPhoneNumberUnmasked] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [emailVerified, setEmailVerified] = React.useState(false);

  const steps = ["Enter Contact Info", "Compose Message", "Send"];

  const handleNext = () => {
    if (!nextDisabled()) {
      activeStep >= steps.length - 2 &&
        sendHandler &&
        sendHandler({
          firstName,
          lastName,
          email: emailAddress,
          phone: phoneNumberUnmasked,
          message,
        });
      setActiveStep((prevActiveStep) =>
        Math.min(prevActiveStep + 1, steps.length - 1)
      );
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  /*
  const clearEverything = () => {
    setFirstName("");
    setLastName("");
    setEmailAddress("");
    setPhoneNumberMasked("");
    setPhoneNumberUnmasked("");
    setMessage("");
    setEmailInvalid(false);
    setPhoneInvalid(false);
    setInvalidEmailMessage("");
    setInvalidPhoneMessage("");
  };
  */

  const handleEmailInputBlur = async () => {
    if (!emailAddress) {
      setEmailInvalid(true);
      setInvalidEmailMessage("Please enter an email address");
    } else {
      setEmailVerified(false);
      const response = await Validation.validateFields({
        email: emailAddress,
      });
      if (response.data && response.data.email) {
        setEmailInvalid(true);
        setInvalidEmailMessage(response.data.email);
      } else {
        clearInvalidEmail();
        setEmailVerified(true);
      }
    }
  };

  const handlePhoneInputBlur = async () => {
    if (!phoneNumberUnmasked) {
      clearInvalidPhone();
    } else {
      const response = await Validation.validateFields({
        phone: phoneNumberUnmasked,
      });
      if (response.data && response.data.phone) {
        setPhoneInvalid(true);
        setInvalidPhoneMessage(response.data.phone);
      } else {
        clearInvalidPhone();
      }
    }
  };

  const clearInvalidEmail = () => {
    setEmailInvalid(false);
    setInvalidEmailMessage("");
  };

  const clearInvalidPhone = () => {
    setPhoneInvalid(false);
    setInvalidPhoneMessage("");
  };

  const handleEmailInput = (e) => {
    setEmailAddress(e.target.value);
    clearInvalidEmail();
  };

  const handlePhoneInput = (e) => {
    setPhoneNumberMasked(e.target.value);
    setPhoneNumberUnmasked(e.target.value.replace(/\D/g, ""));
    clearInvalidPhone();
  };

  const nextDisabled = () => {
    return !emailVerified || emailInvalid || phoneInvalid;
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Box pr={1}>
                <TextField
                  label="First Name"
                  fullWidth
                  margin="normal"
                  inputProps={{ maxLength: 50 }}
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box pr={1}>
                <TextField
                  label="Last Name"
                  fullWidth
                  margin="normal"
                  inputProps={{ maxLength: 50 }}
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box pr={1}>
                <TextField
                  name="emailAddress"
                  required
                  label="Email Address"
                  fullWidth
                  margin="normal"
                  inputProps={{ maxLength: 320 }}
                  error={emailInvalid}
                  helperText={invalidEmailMessage}
                  value={emailAddress}
                  onBlur={() => handleEmailInputBlur()}
                  onChange={(event) => handleEmailInput(event)}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box pr={1}>
                <MWPhoneInput
                  value={phoneNumberMasked}
                  onChange={handlePhoneInput}
                  onBlur={handlePhoneInputBlur}
                  error={phoneInvalid}
                  helperText={invalidPhoneMessage}
                />
              </Box>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Box pr={1} width={1}>
            <TextField
              label="Your message here"
              multiline
              fullWidth
              margin="normal"
              rows={7}
              inputProps={{ maxLength: 1000 }}
              helperText={
                (1000 - message.length).toString() + " chars remaining"
              }
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </Box>
        );
      default:
        return (
          <Box py={5}>
            Your message has been sent. Please allow up to 2 business days for a
            response.
          </Box>
        );
    }
  };

  return (
    <React.Fragment>
      <form className={classes.root}>
        <Box pt={1} width={1}>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            className={classes.stepper}
            width={1}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>
                  <Typography variant="caption">{label}</Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        {getStepContent(activeStep)}
        <Box
          py={1}
          display={activeStep === steps.length - 1 ? "none" : "flex"}
          className={classes.buttonGroup}
        >
          <Box mr={1} display={!activeStep ? "none" : "block"}>
            <Button onClick={handleBack} color="primary" variant="contained">
              Back
            </Button>
          </Box>
          <Box mr={1}>
            <Button
              onClick={handleNext}
              color="primary"
              variant="contained"
              disabled={nextDisabled()}
            >
              {activeStep === steps.length - 2 ? "Send" : "Next"}
            </Button>
          </Box>
        </Box>
      </form>
    </React.Fragment>
  );
}

MWContactForm.propTypes = {
  sendHandler: PropTypes.func,
};

export default MWContactForm;
