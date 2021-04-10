import React from "react";
import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

import MWProjectImage from "./MWProjectImage";
import { updateImage } from "../actions/imageActions";
import {
  refreshProjects,
  createProjectImage,
  moveProjectImage,
  deleteProjectImage,
  makePrimaryProjectImage,
} from "../actions/projectActions";

const useStyles = makeStyles((theme) => ({
  imagePaper: {
    width: "100%",
    backgroundColor: theme.palette.custom.background.innerCard,
  },
}));

function MWProjectImages(props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [tmpActiveProject, setTmpActiveProject] = React.useState();

  const { activeProject } = useSelector((state) => ({
    activeProject: state.projectReducer.activeProject,
  }));

  React.useEffect(() => {
    setTmpActiveProject(activeProject);
  }, [activeProject]);

  const refreshProjectsCB = React.useCallback(() => {
    dispatch(refreshProjects());
  }, [dispatch]);

  const handleSaveCB = React.useCallback(
    (data) => {
      dispatch(updateImage(data, refreshProjectsCB));
    },
    [dispatch, refreshProjectsCB]
  );

  const handleNewCB = React.useCallback(() => {
    dispatch(
      createProjectImage({ _id: tmpActiveProject._id }, refreshProjectsCB)
    );
  }, [dispatch, refreshProjectsCB, tmpActiveProject]);

  const handleMoveCB = React.useCallback(
    (imageID, direction) => {
      dispatch(
        moveProjectImage(
          imageID,
          tmpActiveProject._id,
          direction,
          refreshProjectsCB
        )
      );
    },
    [dispatch, refreshProjectsCB, tmpActiveProject]
  );

  const handleDeleteCB = React.useCallback(
    (imageID) => {
      dispatch(
        deleteProjectImage(imageID, tmpActiveProject._id, refreshProjectsCB)
      );
    },
    [dispatch, refreshProjectsCB, tmpActiveProject]
  );

  const handleNewPrimaryCB = React.useCallback(
    (imageID) => {
      dispatch(
        makePrimaryProjectImage(
          imageID,
          tmpActiveProject._id,
          refreshProjectsCB
        )
      );
    },
    [dispatch, refreshProjectsCB, tmpActiveProject]
  );

  return (
    <Box>
      {tmpActiveProject &&
        tmpActiveProject.images &&
        tmpActiveProject.images.length > 0 &&
        tmpActiveProject.images.map((image, i) => (
          <Box paddingY={theme.custom.spacing.card} key={i}>
            <Paper className={classes.imagePaper}>
              <Box p={theme.custom.spacing.cardInner}>
                <MWProjectImage
                  image={image}
                  isPrimary={
                    tmpActiveProject.primaryImage &&
                    tmpActiveProject.primaryImage._id === image._id
                  }
                  saveHandler={handleSaveCB}
                  moveHandler={handleMoveCB}
                  deleteHandler={handleDeleteCB}
                  setPrimaryHandler={handleNewPrimaryCB}
                />
              </Box>
            </Paper>
          </Box>
        ))}
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        paddingY={theme.custom.spacing.appBody}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleNewCB}
        >
          New Image
        </Button>
      </Box>
    </Box>
  );
}

export default MWProjectImages;
