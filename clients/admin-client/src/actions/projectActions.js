import {
  GET_PROJECTS_LOADING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILURE,
  SET_ACTIVE_PROJECT,
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
  else dispatch({ type: GET_PROJECTS_SUCCESS, data });
};

export const setActiveProject = (activeProject) => {
  return {
    type: SET_ACTIVE_PROJECT,
    data: activeProject,
  };
};
