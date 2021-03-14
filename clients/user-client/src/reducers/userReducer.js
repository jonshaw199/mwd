import {
  REGISTER_USER_LOADING,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS,
  SET_CURRENT_USER,
  GET_USER_LOADING,
  GET_USER_FAILURE,
  GET_USER_SUCCESS,
  OPEN_USER_LOGIN_DIALOG,
  CLOSE_USER_LOGIN_DIALOG,
} from "../actions/types";
import Constants from "../Constants";

const initialState = {
  userLoginDialogOpen: false,
  currentUser: {
    user: {},
    token: localStorage.getItem(Constants.authTokenName),
  },
  registerUserErrors: [],
  registerUserLoading: false,
  getUserErrors: [],
  getUserLoading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_USER_LOGIN_DIALOG:
      return {
        ...state,
        userLoginDialogOpen: true,
      };
    case CLOSE_USER_LOGIN_DIALOG:
      return {
        ...state,
        userLoginDialogOpen: false,
      };
    case REGISTER_USER_LOADING:
      return {
        ...state,
        registerUserErrors: [],
        registerUserLoading: true,
      };
    case REGISTER_USER_FAILURE:
      return {
        ...state,
        registerUserLoading: false,
        registerUserErrors: action.data.errors,
      };
    case REGISTER_USER_SUCCESS:
      const newState = {
        ...state,
        registerUserLoading: false,
        registerUserErrors: [],
      };
      // Experimental; an admin stays logged in even after creating a user
      if (!state.currentUser.isAdmin) newState.currentUser = action.data.data;
      return newState;
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.data.data,
      };
    case GET_USER_LOADING:
      return {
        ...state,
        getUserLoading: true,
        getUserErrors: [],
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        currentUser: {},
        getUserLoading: false,
        getUserErrors: action.data.errors,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.data.data,
        getUserLoading: false,
        getUserErrors: [],
      };
    default:
      return state;
  }
};

export default userReducer;
