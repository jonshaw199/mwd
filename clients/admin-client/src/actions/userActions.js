import {
  REGISTER_USER_LOADING,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS,
  SET_CURRENT_USER,
  GET_USER_LOADING,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from "./types";
import {
  registerUser as registerUserAPI,
  getUserByToken as getUserByTokenAPI,
} from "../api/User";
import Constants from "../Constants";

export const registerUserLoading = (userInfo) => {
  return {
    type: REGISTER_USER_LOADING,
    data: userInfo,
  };
};

export const registerUser = (userInfo) => async (dispatch) => {
  dispatch({ type: REGISTER_USER_LOADING }, userInfo);
  const data = await registerUserAPI(userInfo);
  if (data.errors && data.errors.length)
    dispatch({ type: REGISTER_USER_FAILURE, data });
  else dispatch({ type: REGISTER_USER_SUCCESS, data });
};

export const setCurrentUser = (data) => {
  localStorage.setItem(Constants.authTokenName, data.data.token);
  return {
    type: SET_CURRENT_USER,
    data,
  };
};

export const getUserLoading = (token) => {
  return {
    type: GET_USER_LOADING,
    data: token,
  };
};

export const getUser = (token) => async (dispatch, getState) => {
  if (!token) {
    token = getState().userReducer.currentUser.token;
  }
  dispatch({ type: GET_USER_LOADING }, token);
  const data = await getUserByTokenAPI(token);
  if (data.errors && data.errors.length) {
    localStorage.removeItem(Constants.authTokenName);
    dispatch({ type: GET_USER_FAILURE, data });
  } else dispatch({ type: GET_USER_SUCCESS, data });
};
