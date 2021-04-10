import React from "react";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import { setActiveProject } from "../actions/projectActions";

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

  return (
    <Box p={theme.custom.spacing.appBody}>
      {projects && (
        <List>
          {projects.map((project, i) => (
            <ListItem
              button
              key={i}
              selected={project._id === activeProject._id}
              onClick={() => selectProjectCB(project._id)}
            >
              <ListItemText primary={project.name} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

export default MWProjectList;
