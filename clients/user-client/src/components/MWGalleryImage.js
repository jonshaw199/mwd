import React from "react";
import PropTypes from "prop-types";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  img: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },
  loadingOverlay: {
    position: "relative",
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imgContainer: {
    width: "100%",
    height: "100%",
  },
}));

const MWGalleryImage = ({ imgSrc, projectName, projectDescription }) => {
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const classes = useStyles();

  const onLoadCB = React.useCallback(() => {
    setImgLoaded(true);
  }, [setImgLoaded]);

  return (
    <React.Fragment>
      {!imgLoaded && (
        <Box className={classes.loadingOverlay}>
          <CircularProgress />
        </Box>
      )}
      <Fade in={imgLoaded}>
        <Box className={classes.imgContainer}>
          {imgSrc && (
            <img
              src={imgSrc}
              alt={projectName}
              onLoad={onLoadCB}
              className={classes.img}
            />
          )}
          {(projectName || projectDescription) && (
            <GridListTileBar
              title={projectName}
              subtitle={<span>{projectDescription}</span>}
            />
          )}
        </Box>
      </Fade>
    </React.Fragment>
  );
};

MWGalleryImage.propTypes = {
  imgSrc: PropTypes.string,
  projectName: PropTypes.string,
  projectDescription: PropTypes.string,
};

export default MWGalleryImage;
