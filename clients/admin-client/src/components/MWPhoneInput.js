import React from "react";
import InputMask from "react-input-mask";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

const MWPhoneInput = ({ value, onChange, onBlur, error, helperText }) => {
  return (
    <InputMask
      mask="(999) 999-9999"
      value={value}
      maskChar=" "
      onChange={(event) => (onChange ? onChange(event) : {})}
      onBlur={() => (onBlur ? onBlur() : {})}
    >
      {() => (
        <TextField
          name="phoneNumber"
          label="Phone Number"
          fullWidth
          margin="normal"
          inputProps={{ maxLength: 30 }}
          error={error}
          helperText={helperText}
        />
      )}
    </InputMask>
  );
};

MWPhoneInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};

export default MWPhoneInput;
