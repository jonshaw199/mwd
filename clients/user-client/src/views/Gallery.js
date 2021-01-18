import React from "react";
import Box from "@material-ui/core/Box";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSelector, useDispatch } from "react-redux";

import MWImageDialog from "../components/MWImageDialog";
import {
  openImageDialog,
  closeImageDialog,
} from "../actions/imageDialogActions";
import { setActiveProject } from "../actions/projectActions";

const Gallery = (props) => {
  const {
    projects,
    serverAddress,
    imageDialogOpen,
    activeProject,
  } = useSelector((state) => ({
    projects: state.projectReducer.projects,
    serverAddress: state.rootReducer.serverAddress,
    imageDialogOpen: state.imageDialogReducer.imageDialogOpen,
    activeProject: state.projectReducer.activeProject,
  }));
  const theme = useTheme();

  const screenExtraLarge = useMediaQuery(theme.breakpoints.only("xl"));
  const screenLarge = useMediaQuery(theme.breakpoints.only("lg"));
  const screenMedium = useMediaQuery(theme.breakpoints.only("md"));
  const screenSmall = useMediaQuery(theme.breakpoints.only("sm"));
  const screenExtraSmall = useMediaQuery(theme.breakpoints.only("xs"));
  const screenNarrow = useMediaQuery("(max-width:340px)");
  const numCols = screenExtraLarge
    ? 6
    : screenNarrow
    ? 1
    : screenLarge
    ? 5
    : screenMedium
    ? 4
    : screenSmall
    ? 3
    : screenExtraSmall
    ? 2
    : 3;

  const dispatch = useDispatch();

  const openImageDialogCB = React.useCallback(
    (project) => {
      dispatch(setActiveProject(project));
      dispatch(openImageDialog());
    },
    [dispatch]
  );

  const closeImageDialogCB = React.useCallback(() => {
    dispatch(closeImageDialog());
    dispatch(setActiveProject(null));
  }, [dispatch]);

  return (
    <Box
      p={theme.padding.appBodyPadding}
      mt={theme.margin.verticalHeadingMargin}
    >
      {projects && (
        <GridList cellHeight={160} cols={numCols}>
          {projects.map((project, i) => (
            <GridListTile
              key={i}
              cols={1}
              onClick={() => openImageDialogCB(project)}
            >
              <img
                src={`${project.primaryImage.filePath}/${project.primaryImage.fileName}.${project.primaryImage.fileExtension}`}
                alt={project.name}
              />
              <GridListTileBar
                title={project.name}
                subtitle={<span>{project.description}</span>}
              />
            </GridListTile>
          ))}
        </GridList>
      )}
      {imageDialogOpen && (
        <MWImageDialog
          open={imageDialogOpen}
          close={closeImageDialogCB}
          project={activeProject}
          serverAddress={serverAddress}
        />
      )}
    </Box>
  );
};

export default Gallery;
