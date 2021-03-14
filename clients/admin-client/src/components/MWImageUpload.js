import React from "react";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";

const MWImageUpload = (props) => {
  const { uploadHandler } = props;
  const handleChangeCB = React.useCallback(
    (e) => {
      uploadHandler && uploadHandler(e.target.files[0]);
    },
    [uploadHandler]
  );

  return (
    <Box>
      <input type="file" name="file" onChange={handleChangeCB} />
    </Box>
  );
};

MWImageUpload.propTypes = {
  uploadHandler: PropTypes.func,
};

export default MWImageUpload;
