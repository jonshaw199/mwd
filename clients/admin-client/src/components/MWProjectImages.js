import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";

import MWProjectImage from "./MWProjectImage";

function MWProjectImages(props) {
  const theme = useTheme();
  const { project } = props;

  return (
    <Box>
      {project &&
        project.images &&
        project.images.length > 0 &&
        project.images.map((image, i) => (
          <Box>
            <Paper style={{ width: "100%" }}>
              <Box p={theme.custom.spacing.appBody}>
                <MWProjectImage image={image} />
              </Box>
            </Paper>
          </Box>
        ))}
    </Box>
  );
}

MWProjectImages.propTypes = {
  project: PropTypes.object,
};

export default MWProjectImages;
