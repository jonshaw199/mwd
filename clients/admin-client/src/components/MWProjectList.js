import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useTheme } from "@material-ui/core/styles";

function MWProjectList(props) {
  const theme = useTheme();
  const { projects, selectHandler } = props;
  const [selectedID, setSelectedID] = React.useState();

  const selectProjectCB = React.useCallback(
    (projectID) => {
      selectHandler && selectHandler(projectID);
      setSelectedID(projectID);
    },
    [selectHandler, setSelectedID]
  );

  return (
    <Box p={theme.custom.spacing.appBody}>
      {projects && (
        <List>
          {projects.map((project, i) => (
            <ListItem
              button
              key={i}
              selected={project._id === selectedID}
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

MWProjectList.propTypes = {
  projects: PropTypes.array, // Elements are objects with key and value props
  selectHandler: PropTypes.func,
};

export default MWProjectList;
