import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PublishIcon from "@material-ui/icons/Publish";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
}));

const MWImageUpload = (props) => {
  const id = uuidv4();
  const classes = useStyles();
  const { uploadHandler } = props;

  const handleChangeCB = (e) => {
    uploadHandler && uploadHandler(e.target.files[0]);
  };

  return (
    <span>
      <input
        accept="image/*"
        className={classes.input}
        id={`mw-upload-${id}`}
        type="file"
        name="file"
        onChange={handleChangeCB}
      />
      <label htmlFor={`mw-upload-${id}`}>
        <Button
          variant="contained"
          color="primary"
          component="span"
          size="small"
          startIcon={<PublishIcon />}
        >
          Upload
        </Button>
      </label>
    </span>
  );
};

MWImageUpload.propTypes = {
  uploadHandler: PropTypes.func,
};

export default MWImageUpload;
