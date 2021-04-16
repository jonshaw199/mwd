import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CloseIcon from "@material-ui/icons/Close";
import InfoIcon from "@material-ui/icons/Info";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  image: {
    width: "100%",
    height: "100%",
  },
  horizontalImageOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    top: 0,
  },
  verticalImageOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    top: "0",
    justifyContent: "space-between",
  },
  arrowContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    zIndex: theme.zIndex.imageDialogOverlay,
  },
  topContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    zIndex: theme.zIndex.imageDialogOverlay,
  },
  bottomContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    zIndex: theme.zIndex.imageDialogOverlay,
    color: "rgba(0, 0, 0, 0.66)",
  },
  paperScrollPaper: {
    maxHeight: "100%",
  },
  infoOverlay: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    margin: "45px",
    maxWidth: "200px",
    padding: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.54)",
    color: "rgba(255, 255, 255, 0.90)",
  },
}));

const MWImageDialog = (props) => {
  const [images, setImages] = React.useState([]);
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);
  const [showInfo, setShowInfo] = React.useState(false);

  const theme = useTheme();

  const classes = useStyles();

  const slideImage = (direction) => {
    if (direction === "left") {
      setActiveImageIndex(
        activeImageIndex > 0 ? activeImageIndex - 1 : images.length - 1
      );
    } else {
      setActiveImageIndex(
        activeImageIndex < images.length - 1 ? activeImageIndex + 1 : 0
      );
    }
  };

  const toggleShowInfo = () => {
    setShowInfo(!showInfo);
  };

  React.useEffect(() => {
    setImages(props.project.images);
  }, [props.project.images]);

  return (
    <Dialog
      open={props.open}
      onClose={props.close}
      style={{ zIndex: theme.zIndex.imageDialog }}
      classes={{ paperScrollPaper: classes.paperScrollPaper }}
    >
      {!images ||
        (images.length < 1 && (
          <Box p={theme.custom.spacing.appBody}>No Image To Show Here</Box>
        ))}
      {images.length > 0 && (
        <React.Fragment>
          <img
            src={
              images[activeImageIndex].filePath +
              "/" +
              images[activeImageIndex].fileName
            }
            alt={images[activeImageIndex].name}
            className={classes.image}
          />
          {images.length > 1 && (
            <Box className={classes.horizontalImageOverlay}>
              <Box className={classes.arrowContainer}>
                <IconButton
                  aria-label="left"
                  onClick={() => slideImage("left")}
                  color="secondary"
                >
                  <ChevronLeftIcon fontSize="large" />
                </IconButton>
                <IconButton
                  aria-label="right"
                  onClick={() => slideImage("right")}
                  color="secondary"
                >
                  <ChevronRightIcon fontSize="large" />
                </IconButton>
              </Box>
            </Box>
          )}
          <Box className={classes.verticalImageOverlay}>
            <Box className={classes.topContainer}>
              <Box>
                {((images[activeImageIndex].name &&
                  images[activeImageIndex].name.length > 0) ||
                  (images[activeImageIndex].description &&
                    images[activeImageIndex].description.length > 0)) && (
                  <IconButton
                    aria-label="left"
                    onClick={() => toggleShowInfo()}
                    onMouseEnter={() => setShowInfo(true)}
                    onMouseLeave={() => setShowInfo(false)}
                  >
                    <InfoIcon />
                  </IconButton>
                )}
              </Box>
              <IconButton aria-label="left" onClick={() => props.close()}>
                <CloseIcon />
              </IconButton>
            </Box>
            {images.length > 1 && (
              <Typography variant="subtitle1">
                <Box
                  className={classes.bottomContainer}
                  py={1}
                  letterSpacing={2}
                  fontWeight="fontWeightBold"
                >{`${activeImageIndex + 1}/${images.length}`}</Box>
              </Typography>
            )}
          </Box>
          {showInfo && (
            <Box className={classes.infoOverlay}>
              <Paper className={classes.infoContainer}>
                {images[activeImageIndex].name &&
                  images[activeImageIndex].name.length > 0 && (
                    <Typography variant="subtitle2">
                      <Box fontWeight="fontWeightBold">
                        {images[activeImageIndex].name}
                      </Box>
                    </Typography>
                  )}
                {images[activeImageIndex].description &&
                  images[activeImageIndex].description.length > 0 && (
                    <Typography variant="caption">
                      {images[activeImageIndex].description}
                    </Typography>
                  )}
              </Paper>
            </Box>
          )}
        </React.Fragment>
      )}
    </Dialog>
  );
};

MWImageDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
};

export default MWImageDialog;
