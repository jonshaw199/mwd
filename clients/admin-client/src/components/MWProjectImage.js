import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  image: {
    maxWidth: "333px",
    height: "auto",
  },
}));

function MWProjectImage(props) {
  const theme = useTheme();
  const classes = useStyles();
  const { image } = props;
  return (
    <Grid container>
      <Grid item xs={12} sm={5}>
        {image && (
          <img
            src={image.filePath + "/" + image.fileName}
            alt={image.name}
            className={classes.image}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={5}>
        Test 2
      </Grid>
      <Grid item xs={12} sm={2}>
        Test 3
      </Grid>
    </Grid>
  );
}

MWProjectImage.propTypes = {
  image: PropTypes.object,
};

export default MWProjectImage;
