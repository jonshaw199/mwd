import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

import MWHeadingDivider from "./MWHeadingDivider";

const useStyles = makeStyles((theme) => ({
  headingContainer: {
    maxWidth: theme.custom.width.maxTextWidth,
    // width: "100%",
  },
  headingTypo: {
    textTransform: "uppercase",
  },
  bigLetter: {
    fontSize: "125%",
  },
}));

const MWHeading = (props) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  let textJustifyContent = "";
  let textTextAlign = "";
  let divJustifyContent = "";
  switch (props.position) {
    case "left":
      textJustifyContent = "flex-start";
      textTextAlign = "left";
      divJustifyContent = "flex-start";
      break;
    case "right":
      textJustifyContent = "flex-end";
      textTextAlign = "right";
      divJustifyContent = "flex-end";
      break;
    default:
      textJustifyContent = "center";
      textTextAlign = "center";
      divJustifyContent = "center";
  }
  return (
    <Box>
      <Box
        display="flex"
        width={1}
        justifyContent={textJustifyContent}
        mt={theme.custom.spacing.verticalHeading}
      >
        <Box className={classes.headingContainer} textAlign={textTextAlign}>
          <Typography
            variant={theme.custom.typography.heading}
            className={classes.headingTypo}
          >
            {props.text.split(" ").map((word, i, arr) => (
              <span key={i}>
                {word.length > 0 && (
                  <span className={classes.bigLetter}>
                    {word.substring(0, 1)}
                  </span>
                )}
                {word.length > 1 && <span>{word.substring(1)}</span>}
                {arr.length - 1 !== i && <span> </span>}
              </span>
            ))}
          </Typography>
          <Box
            display="flex"
            width={1}
            justifyContent={textJustifyContent}
            mt={theme.custom.spacing.headingAndDiv}
          >
            <MWHeadingDivider position={divJustifyContent} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

MWHeading.propTypes = {
  text: PropTypes.string.isRequired,
  position: PropTypes.string,
};

export default MWHeading;
