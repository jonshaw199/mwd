import React from "react";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  dividerContainer: {
    maxWidth: theme.custom.width.headingDivider,
    width: "100%",
  },
}));

const MWHeadingDivider = (props) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const position = props.position || "center";

  return (
    <Box display="flex" justifyContent={position} width={1}>
      <Box className={classes.dividerContainer}>
        <Divider variant="fullWidth" />
      </Box>
    </Box>
  );
};

MWHeadingDivider.propTypes = {
  position: PropTypes.string,
};

export default MWHeadingDivider;
