import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import CheckIcon from "@material-ui/icons/Check";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import IconButton from "@material-ui/core/IconButton";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import MWImageUpload from "./MWImageUpload";

const useStyles = makeStyles((theme) => ({
  image: {
    maxWidth: "auto",
    height: "100%",
  },
  upArrowIconButton: {
    transform: "rotate(-90deg)",
  },
  downArrowIconButton: {
    transform: "rotate(90deg)",
  },
  imageToolbar: {
    paddingTop: "1rem",
    paddingBottom: "1rem",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "column",
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  button: {
    marginLeft: theme.custom.spacing.button,
  },
}));

function MWProjectImage(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [imageName, setImageName] = React.useState("");
  const [imageDescription, setImageDescription] = React.useState("");
  const [originalImage, setOriginalImage] = React.useState();
  const [showButtons, setShowButtons] = React.useState(false);
  const {
    image,
    isPrimary,
    moveHandler,
    setPrimaryHandler,
    deleteHandler,
    saveHandler,
  } = props;

  React.useEffect(() => {
    setImageName(image && image.name ? image.name : "");
    setImageDescription(image && image.description ? image.description : "");
    setOriginalImage(image);
  }, [image]);

  React.useEffect(() => {
    if (!originalImage || !originalImage._id) {
      setShowButtons(false);
    } else if (
      originalImage.name !== imageName ||
      originalImage.description !== imageDescription
    ) {
      setShowButtons(true);
    } else {
      setShowButtons(false);
    }
  }, [originalImage, imageName, imageDescription]);

  const moveImageCB = React.useCallback(
    (direction) => {
      image && image._id && moveHandler && moveHandler(image._id, direction);
    },
    [moveHandler, image]
  );

  const setPrimaryCB = React.useCallback(() => {
    image && image._id && setPrimaryHandler && setPrimaryHandler(image._id);
  }, [setPrimaryHandler, image]);

  const deleteCB = React.useCallback(() => {
    image && image._id && deleteHandler && deleteHandler(image._id);
  }, [deleteHandler, image]);

  const saveCB = React.useCallback(() => {
    if (saveHandler) {
      const formData = new FormData();
      formData.append("_id", image._id);
      formData.append("name", imageName);
      formData.append("description", imageDescription);
      saveHandler(formData);
    }
  }, [saveHandler, imageName, imageDescription, image]);

  const cancelCB = React.useCallback(() => {
    setImageName(originalImage && originalImage.name ? originalImage.name : "");
    setImageDescription(
      originalImage && originalImage.description
        ? originalImage.description
        : ""
    );
  }, [originalImage]);

  // Passed to the ImageUpload component
  const uploadCB = (imageToUpload) => {
    if (saveHandler) {
      const formData = new FormData();
      formData.append("_id", image._id);
      formData.append("mwImage", imageToUpload);
      saveHandler(formData);
    }
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column" height="150px" width={1}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height={0.75}
              width={1}
            >
              {image && (
                <img
                  src={image.filePath + "/" + image.fileName}
                  alt={image.name}
                  className={classes.image}
                />
              )}
            </Box>
            <Box
              height={0.25}
              width={1}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <MWImageUpload uploadHandler={uploadCB} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            label="Name"
            fullWidth
            inputProps={{ maxLength: 250 }}
            value={imageName}
            onChange={(event) => setImageName(event.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            inputProps={{ maxLength: 1000 }}
            value={imageDescription}
            onChange={(event) => setImageDescription(event.target.value)}
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={1}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              className={classes.imageToolbar}
            >
              <IconButton
                aria-label="Move Image Up"
                size="small"
                className={classes.upArrowIconButton}
                onClick={() => moveImageCB("up")}
              >
                <PlayArrowIcon />
              </IconButton>
              <IconButton
                aria-label="Set As Primary"
                size="small"
                onClick={setPrimaryCB}
                color={isPrimary ? "primary" : "default"}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                aria-label="Delete Image"
                size="small"
                onClick={deleteCB}
              >
                <DeleteForeverIcon />
              </IconButton>
              <IconButton
                aria-label="Move Image Down"
                size="small"
                className={classes.downArrowIconButton}
                onClick={() => moveImageCB("down")}
              >
                <PlayArrowIcon />
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {showButtons && (
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          paddingY={theme.custom.spacing.appBody}
        >
          <Button variant="outlined" onClick={cancelCB}>
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={saveCB}
            className={classes.button}
          >
            Save
          </Button>
        </Box>
      )}
    </Box>
  );
}

MWProjectImage.propTypes = {
  image: PropTypes.object,
  isPrimary: PropTypes.bool,
  moveHandler: PropTypes.func,
  setPrimaryHandler: PropTypes.func,
  deleteHandler: PropTypes.func,
  saveHandler: PropTypes.func,
};

export default MWProjectImage;
