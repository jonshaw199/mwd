import {
  REGISTER_USER_LOADING,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS,
  SET_CURRENT_USER,
  GET_USER_LOADING,
  GET_USER_FAILURE,
  GET_USER_SUCCESS,
} from "../actions/types";

const initialState = {
  currentUser: {},
  registerUserErrors: [],
  registerUserLoading: false,
  getUserErrors: [],
  getUserLoading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
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
      return {
        ...state,
        registerUserLoading: false,
        registerUserErrors: [],
      };
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
