import {
  GET_PROJECTS_LOADING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILURE,
  SET_ACTIVE_PROJECT,
  CREATE_PROJECT_LOADING,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  UPDATE_PROJECT_LOADING,
  UPDATE_PROJECT_FAILURE,
  UPDATE_PROJECT_SUCCESS,
  CREATE_PROJECT_IMAGE_LOADING,
  CREATE_PROJECT_IMAGE_SUCCESS,
  CREATE_PROJECT_IMAGE_FAILURE,
  DELETE_PROJECT_IMAGE_LOADING,
  DELETE_PROJECT_IMAGE_FAILURE,
  DELETE_PROJECT_IMAGE_SUCCESS,
  MOVE_PROJECT_IMAGE_FAILURE,
  MOVE_PROJECT_IMAGE_LOADING,
  MOVE_PROJECT_IMAGE_SUCCESS,
  MAKE_PRIMARY_PROJECT_IMAGE_LOADING,
  MAKE_PRIMARY_PROJECT_IMAGE_FAILURE,
  MAKE_PRIMARY_PROJECT_IMAGE_SUCCESS,
  DELETE_PROJECT_LOADING,
  DELETE_PROJECT_FAILURE,
  DELETE_PROJECT_SUCCESS,
  MOVE_PROJECT_LOADING,
  MOVE_PROJECT_FAILURE,
  MOVE_PROJECT_SUCCESS,
} from "../actions/types";

const initialState = {
  projects: [],
  getProjectsErrors: [],
  getProjectsLoading: false,
  activeProject: {},
  createProjectErrors: [],
  createProjectLoading: false,
  createdProject: {},
  updateProjectErrors: [],
  updateProjectLoading: false,
  updatedProject: {},
  createProjectImageErrors: [],
  createProjectImageLoading: false,
  createdProjectImage: {},
  deletedProjectImage: {},
  deleteProjectImageLoading: false,
  deleteProjectImageErrors: [],
  movedProjectImage: {},
  moveProjectImageLoading: false,
  moveProjectImageErrors: [],
  makePrimaryImageLoading: false,
  makePrimaryImageErrors: [],
  newPrimaryImage: {},
  deletedProject: {},
  deleteProjectLoading: false,
  deleteProjectErrors: [],
  movedProject: {},
  moveProjectLoading: false,
  moveProjectErrors: [],
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
    case CREATE_PROJECT_LOADING:
      return {
        ...state,
        createProjectLoading: true,
        createProjectErrors: [],
      };
    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        createProjectLoading: false,
        createProjectErrors: [],
        createdProject: action.data.data,
      };
    case CREATE_PROJECT_FAILURE:
      return {
        ...state,
        createProjectLoading: false,
        createProjectErrors: action.data.errors,
      };
    case UPDATE_PROJECT_LOADING:
      return {
        ...state,
        updateProjectLoading: true,
        updateProjectErrors: [],
      };
    case UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        updateProjectLoading: false,
        updateProjectErrors: [],
        updatedProject: action.data.data,
      };
    case UPDATE_PROJECT_FAILURE:
      return {
        ...state,
        updateProjectLoading: false,
        updateProjectErrors: action.data.errors,
      };
    case CREATE_PROJECT_IMAGE_LOADING:
      return {
        ...state,
        createProjectImageLoading: true,
        createProjectImageErrors: [],
      };
    case CREATE_PROJECT_IMAGE_SUCCESS:
      return {
        ...state,
        createProjectImageLoading: false,
        createdProjectImage: action.data.data,
        createProjectImageErrors: [],
      };
    case CREATE_PROJECT_IMAGE_FAILURE:
      return {
        ...state,
        createProjectImageLoading: false,
        createProjectImageErrors: action.data.errors,
      };
    case DELETE_PROJECT_IMAGE_LOADING:
      return {
        ...state,
        deleteProjectImageLoading: true,
        deleteProjectImageErrors: [],
      };
    case DELETE_PROJECT_IMAGE_FAILURE:
      return {
        ...state,
        deleteProjectImageLoading: false,
        deleteProjectImageErrors: action.data.errors,
      };
    case DELETE_PROJECT_IMAGE_SUCCESS:
      return {
        ...state,
        deleteProjectImageLoading: false,
        deleteProjectImageErrors: [],
        deletedProjectImage: action.data.data,
      };
    case MOVE_PROJECT_IMAGE_LOADING:
      return {
        ...state,
        moveProjectImageLoading: true,
        moveProjectImageErrors: [],
      };
    case MOVE_PROJECT_IMAGE_FAILURE:
      return {
        ...state,
        moveProjectImageLoading: false,
        moveProjectImageErrors: action.data.errors,
      };
    case MOVE_PROJECT_IMAGE_SUCCESS:
      return {
        ...state,
        moveProjectImageLoading: false,
        moveProjectImageErrors: [],
        movedProjectImage: action.data.data,
      };
    case MAKE_PRIMARY_PROJECT_IMAGE_LOADING:
      return {
        ...state,
        makePrimaryImageLoading: true,
        makePrimaryImageErrors: [],
      };
    case MAKE_PRIMARY_PROJECT_IMAGE_FAILURE:
      return {
        ...state,
        makePrimaryImageLoading: false,
        makePrimaryImageErrors: action.data.errors,
      };
    case MAKE_PRIMARY_PROJECT_IMAGE_SUCCESS:
      return {
        ...state,
        makePrimaryImageLoading: false,
        makePrimaryImageErrors: [],
        newPrimaryImage: action.data.data,
      };
    case DELETE_PROJECT_LOADING:
      return {
        ...state,
        deleteProjectLoading: true,
        deleteProjectErrors: [],
      };
    case DELETE_PROJECT_FAILURE:
      return {
        ...state,
        deleteProjectLoading: false,
        deleteProjectErrors: action.data.errors,
      };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        deleteProjectLoading: false,
        deleteProjectErrors: [],
        deletedProject: action.data.data,
      };
    case MOVE_PROJECT_LOADING:
      return {
        ...state,
        moveProjectLoading: true,
        moveProjectErrors: [],
      };
    case MOVE_PROJECT_FAILURE:
      return {
        ...state,
        moveProjectLoading: false,
        moveProjectErrors: action.data.errors,
      };
    case MOVE_PROJECT_SUCCESS:
      return {
        ...state,
        moveProjectLoading: false,
        moveProjectErrors: [],
        movedProject: action.data.data,
      };
    default:
      return state;
  }
};

export default projectReducer;
