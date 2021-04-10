import React from "react";
import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { updateProject, refreshProjects } from "../actions/projectActions";

const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: theme.custom.spacing.button,
  },
}));

function MWProjectInfo() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [tmpActiveProject, setTmpActiveProject] = React.useState();
  const [showButtons, setShowButtons] = React.useState();

  const { activeProject, updateProjectLoading } = useSelector((state) => ({
    activeProject: state.projectReducer.activeProject,
    updateProjectLoading: state.projectReducer.updateProjectLoading,
  }));

  React.useEffect(() => {
    setTmpActiveProject(activeProject);
    setName(activeProject && activeProject.name ? activeProject.name : "");
    setDescription(
      activeProject && activeProject.description
        ? activeProject.description
        : ""
    );
  }, [activeProject]);

  React.useEffect(() => {
    if (!tmpActiveProject || !tmpActiveProject._id) {
      setShowButtons(false);
    } else if (
      tmpActiveProject.name !== name ||
      tmpActiveProject.description !== description
    ) {
      setShowButtons(true);
    } else {
      setShowButtons(false);
    }
  }, [tmpActiveProject, name, description]);

  const refreshProjectsCB = React.useCallback(() => {
    dispatch(refreshProjects());
  }, [dispatch]);

  const handleSaveCB = React.useCallback(() => {
    const project = { ...tmpActiveProject, name, description };
    dispatch(updateProject(project, refreshProjectsCB));
  }, [dispatch, tmpActiveProject, description, name, refreshProjectsCB]);

  const handleCancelCB = React.useCallback(() => {
    setName(
      tmpActiveProject && tmpActiveProject.name ? tmpActiveProject.name : ""
    );
    setDescription(
      tmpActiveProject && tmpActiveProject.description
        ? tmpActiveProject.description
        : ""
    );
  }, [tmpActiveProject]);

  return (
    <Box>
      <TextField
        name="name"
        label="Project Name"
        fullWidth
        inputProps={{ maxLength: 250 }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        name="description"
        label="Project Description"
        fullWidth
        multiline
        rows={6}
        inputProps={{ maxLength: 250 }}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {showButtons && (
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          paddingY={theme.custom.spacing.appBody}
        >
          <Button variant="outlined" onClick={handleCancelCB}>
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSaveCB}
            disabled={updateProjectLoading}
            className={classes.button}
          >
            Save
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default MWProjectInfo;
