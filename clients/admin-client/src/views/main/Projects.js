import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { useSelector } from "react-redux";

import MWProjectList from "../../components/MWProjectList";
import MWProjectInfo from "../../components/MWProjectInfo";
import MWProjectImages from "../../components/MWProjectImages";

const Projects = () => {
  const theme = useTheme();

  const { activeProject } = useSelector((state) => ({
    activeProject: state.projectReducer.activeProject,
  }));

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Box p={theme.custom.spacing.card}>
            <Paper>
              <Box p={theme.custom.spacing.appBody}>
                <MWProjectList />
              </Box>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          {activeProject && activeProject._id && (
            <Box p={theme.custom.spacing.card}>
              <Paper>
                <Box p={theme.custom.spacing.cardInner}>
                  <MWProjectInfo />
                </Box>
              </Paper>
            </Box>
          )}
        </Grid>
      </Grid>
      {activeProject && activeProject._id && (
        <Box p={theme.custom.spacing.card}>
          <Paper>
            <Box p={theme.custom.spacing.cardInner}>
              <MWProjectImages />
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default Projects;
