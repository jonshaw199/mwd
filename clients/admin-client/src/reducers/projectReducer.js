import {
  GET_PROJECTS_LOADING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILURE,
  SET_ACTIVE_PROJECT,
} from "../actions/types";

const initialState = {
  projects: [],
  getProjectsErrors: [],
  getProjectsLoading: false,
  activeProject: {},
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECTS_LOADING:
      return {
        ...state,
        getProjectsErrors: [],
        getProjectsLoading: true,
      };
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.data.data,
        getProjectsErrors: [],
        getProjectsLoading: false,
      };
    case GET_PROJECTS_FAILURE:
      return {
        ...state,
        getProjectsLoading: false,
        getProjectsErrors: action.data.errors,
      };
    case SET_ACTIVE_PROJECT:
      return {
        ...state,
        activeProject: action.data,
      };
    default:
      return state;
  }
};

export default projectReducer;
