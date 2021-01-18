import React from "react";
import InputMask from "react-input-mask";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

const MWPhoneInput = (props) => {
  return (
    <InputMask
      mask="(999) 999-9999"
      value={props.value}
      maskChar=" "
      onChange={(event) => props.onChange(event)}
      onBlur={() => props.onBlur()}
    >
      {() => (
        <TextField
          name="phoneNumber"
          label="Phone Number"
          fullWidth
          margin="normal"
          inputProps={{ maxLength: 30 }}
          error={props.error}
          helperText={props.helperText}
        />
      )}
    </InputMask>
  );
};

MWPhoneInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  helperText: PropTypes.string.isRequired,
};

export default MWPhoneInput;
