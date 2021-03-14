import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { useDispatch, useSelector } from "react-redux";

import MWImageUpload from "../../components/MWImageUpload";
import { uploadImage } from "../../actions/imageActions";
import MWProjectList from "../../components/MWProjectList";
import MWProjectInfo from "../../components/MWProjectInfo";
import MWProjectImages from "../../components/MWProjectImages";
import { setActiveProject } from "../../actions/projectActions";

const Projects = () => {
  /*
  const dispatch = useDispatch();

  const handleImageUploadCB = React.useCallback(
    (image) => {
      const data = new FormData();
      data.append("mwImage", image);
      dispatch(uploadImage(data));
    },
    [dispatch]
  );
  */

  const theme = useTheme();
  const dispatch = useDispatch();

  const { projects, activeProject } = useSelector((state) => ({
    projects: state.projectReducer.projects,
    activeProject: state.projectReducer.activeProject,
  }));

  const setActiveProjectCB = React.useCallback(
    (projectID) => {
      const project = projects.find((project) => {
        return project._id === projectID;
      });
      dispatch(setActiveProject(project));
    },
    [dispatch, projects]
  );

  return (
    <div>
      {/*<MWImageUpload uploadHandler={handleImageUploadCB} />*/}
      <Grid container>
        <Grid item xs={12} md={6}>
          <Box p={theme.custom.spacing.card}>
            <Paper>
              <Box p={theme.custom.spacing.appBody}>
                <MWProjectList
                  projects={projects}
                  selectHandler={setActiveProjectCB}
                />
              </Box>
            </Paper>
          </Box>
        </Grid>
        {activeProject.name && (
          <Grid item xs={12} md={6}>
            <Box p={theme.custom.spacing.card}>
              <Paper>
                <Box p={theme.custom.spacing.appBody}>
                  <MWProjectInfo project={activeProject} />
                </Box>
              </Paper>
            </Box>
          </Grid>
        )}
      </Grid>
      {activeProject.name && (
        <Box p={theme.custom.spacing.card}>
          <Paper>
            <Box p={theme.custom.spacing.appBody}>
              <MWProjectImages project={activeProject} />
            </Box>
          </Paper>
        </Box>
      )}
    </div>
  );
};

export default Projects;
