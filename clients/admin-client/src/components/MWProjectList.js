import React from "react";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import {
  setActiveProject,
  moveProject,
  deleteProject,
  createProject,
} from "../actions/projectActions";
import MWMoreVertButton from "./MWMoreVertButton";

function MWProjectList() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { projects, activeProject } = useSelector((state) => ({
    projects: state.projectReducer.projects,
    activeProject: state.projectReducer.activeProject,
  }));

  const selectProjectCB = React.useCallback(
    (projectID) => {
      const project = projects.find((project) => {
        return projectID === project._id;
      });
      dispatch(setActiveProject(project));
    },
    [dispatch, projects]
  );

  const makeDeleteCB = (projectID) => {
    return () => {
      dispatch(deleteProject(projectID));
    };
  };

  const makeMoveCB = (projectID) => {
    return (direction) => {
      dispatch(moveProject(projectID, direction));
    };
  };

  const handleNewCB = React.useCallback(() => {
    dispatch(createProject());
  }, [dispatch]);

  return (
    <Box p={theme.custom.spacing.appBody}>
      {projects && (
        <List>
          {projects.map((project, i) => (
            <ListItem
              button
              key={i}
              selected={
                activeProject &&
                activeProject._id &&
                project._id === activeProject._id
              }
              onClick={() => selectProjectCB(project._id)}
            >
              <ListItemText primary={project.name} />
              <MWMoreVertButton
                moveHandler={makeMoveCB(project._id)}
                deleteHandler={makeDeleteCB(project._id)}
              />
            </ListItem>
          ))}
        </List>
      )}
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleNewCB}
        >
          New
        </Button>
      </Box>
    </Box>
  );
}

export default MWProjectList;
