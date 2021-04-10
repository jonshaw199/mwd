import {
  LOG_IN_LOADING,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT,
} from "./types";
import { setCurrentUser } from "./userActions";
import { logIn as logInAPI } from "../api/Auth";

export const logInLoading = (username) => {
  return {
    type: LOG_IN_LOADING,
    data: username,
  };
};

export const logIn = (frmData) => async (dispatch) => {
  const user = frmData.get("username");
  dispatch({ type: LOG_IN_LOADING }, user);
  const data = await logInAPI(frmData);
  if (data.errors && data.errors.length) {
    dispatch(setCurrentUser({}));
    dispatch({ type: LOG_IN_FAILURE, data });
  } else {
    dispatch(setCurrentUser(data));
    dispatch({ type: LOG_IN_SUCCESS, data });
  }
};

export const logOut = (userID) => {
  return {
    type: LOG_OUT,
    data: userID,
  };
};
