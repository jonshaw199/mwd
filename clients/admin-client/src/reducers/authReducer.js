import {
  LOG_IN_LOADING,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
} from "../actions/types";

const initialState = {
  logInErrors: [],
  logInLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_LOADING:
      return {
        ...state,
        logInErrors: [],
        logInLoading: true,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        logInErrors: [],
        logInLoading: false,
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        logInErrors: action.data.errors,
        logInLoading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
