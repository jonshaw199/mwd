import {
  GET_PROJECTS_LOADING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILURE,
  SET_ACTIVE_PROJECT,
  CREATE_PROJECT_LOADING,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  UPDATE_PROJECT_LOADING,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILURE,
  CREATE_PROJECT_IMAGE_LOADING,
  CREATE_PROJECT_IMAGE_SUCCESS,
  CREATE_PROJECT_IMAGE_FAILURE,
  DELETE_PROJECT_IMAGE_LOADING,
  DELETE_PROJECT_IMAGE_SUCCESS,
  DELETE_PROJECT_IMAGE_FAILURE,
  MOVE_PROJECT_IMAGE_LOADING,
  MOVE_PROJECT_IMAGE_FAILURE,
  MOVE_PROJECT_IMAGE_SUCCESS,
  MAKE_PRIMARY_PROJECT_IMAGE_LOADING,
  MAKE_PRIMARY_PROJECT_IMAGE_FAILURE,
  MAKE_PRIMARY_PROJECT_IMAGE_SUCCESS,
} from "./types";
import Projects from "../api/Projects";

export const getProjectsLoading = () => {
  return {
    type: GET_PROJECTS_LOADING,
  };
};

export const getProjects = () => async (dispatch) => {
  dispatch({ type: GET_PROJECTS_LOADING });
  const data = await Projects.getProjects();
  if (data.errors && data.errors.length)
    dispatch({ GET_PROJECTS_FAILURE, data });
  else {
    dispatch({ type: GET_PROJECTS_SUCCESS, data });
  }
};

export const setActiveProject = (activeProject) => {
  return {
    type: SET_ACTIVE_PROJECT,
    data: activeProject,
  };
};

export const createProject = (projectData) => async (dispatch, getState) => {
  dispatch({ type: CREATE_PROJECT_LOADING });
  const data = await Projects.createProject(
    projectData,
    getState().userReducer.currentUser.token
  );
  if (data.errors && data.errors.length) {
    dispatch({ type: CREATE_PROJECT_FAILURE, data });
  } else {
    dispatch({ type: CREATE_PROJECT_SUCCESS, data });
    getProjects(); // Should I do this? TBD
  }
};

export const updateProject = (projectData, successCB) => async (
  dispatch,
  getState
) => {
  dispatch({ type: UPDATE_PROJECT_LOADING });
  const data = await Projects.updateProject(
    projectData,
    getState().userReducer.currentUser.token
  );
  if (data.errors && data.errors.length) {
    dispatch({ type: UPDATE_PROJECT_FAILURE, data });
  } else {
    dispatch({ type: UPDATE_PROJECT_SUCCESS, data });
    successCB && successCB(data);
  }
};

export const refreshProjects = () => async (dispatch, getState) => {
  dispatch({ type: GET_PROJECTS_LOADING });
  const data = await Projects.getProjects();
  if (data.errors && data.errors.length)
    dispatch({ type: GET_PROJECTS_FAILURE, data });
  else {
    dispatch({ type: GET_PROJECTS_SUCCESS, data });
    if (
      getState().projectReducer.activeProject &&
      getState().projectReducer.activeProject._id
    ) {
      const id = getState().projectReducer.activeProject._id;
      const project = data.data.find((project) => {
        return project._id === id;
      });
      dispatch(setActiveProject(project));
    }
  }
};

export const createProjectImage = (imageData, successCB) => async (
  dispatch,
  getState
) => {
  dispatch({ type: CREATE_PROJECT_IMAGE_LOADING });
  const data = await Projects.createProjectImage(
    imageData,
    getState().userReducer.currentUser.token
  );
  if (data.errors && data.errors.length) {
    dispatch({ type: CREATE_PROJECT_IMAGE_FAILURE, data });
  } else {
    dispatch({ type: CREATE_PROJECT_IMAGE_SUCCESS, data });
    successCB && successCB(data);
  }
};

export const deleteProjectImage = (imageID, projectID, successCB) => async (
  dispatch,
  getState
) => {
  dispatch({ type: DELETE_PROJECT_IMAGE_LOADING });
  const data = await Projects.deleteProjectImage(
    { imageID, projectID },
    getState().userReducer.currentUser.token
  );
  if (data.errors && data.errors.length) {
    dispatch({ type: DELETE_PROJECT_IMAGE_FAILURE, data });
  } else {
    dispatch({ type: DELETE_PROJECT_IMAGE_SUCCESS, data });
    successCB && successCB(data);
  }
};

export const moveProjectImage = (
  imageID,
  projectID,
  direction,
  successCB
) => async (dispatch, getState) => {
  dispatch({ type: MOVE_PROJECT_IMAGE_LOADING });
  const data = await Projects.moveProjectImage(
    { projectID, imageID, direction },
    getState().userReducer.currentUser.token
  );
  if (data.errors && data.errors.length) {
    dispatch({ type: MOVE_PROJECT_IMAGE_FAILURE, data });
  } else {
    dispatch({ type: MOVE_PROJECT_IMAGE_SUCCESS, data });
    successCB && successCB(data);
  }
};

export const makePrimaryProjectImage = (
  imageID,
  projectID,
  successCB
) => async (dispatch, getState) => {
  dispatch({ type: MAKE_PRIMARY_PROJECT_IMAGE_LOADING });
  const data = await Projects.makePrimaryProjectImage(
    { projectID, imageID },
    getState().userReducer.currentUser.token
  );
  if (data.errors && data.errors.length) {
    dispatch({ type: MAKE_PRIMARY_PROJECT_IMAGE_FAILURE, data });
  } else {
    dispatch({ type: MAKE_PRIMARY_PROJECT_IMAGE_SUCCESS, data });
    successCB && successCB(data);
  }
};
