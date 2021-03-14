import {
  LOG_IN_LOADING,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT,
  OPEN_USER_LOGIN_DIALOG,
} from "./types";
import { setCurrentUser } from "./userActions";
import { goToAdminClient } from "./adminActions";
import { logIn as logInAPI } from "../api/Auth";

export const logInLoading = (username) => {
  return {
    type: LOG_IN_LOADING,
    data: username,
  };
};

export const logIn = (username, password) => async (dispatch) => {
  dispatch({ type: LOG_IN_LOADING }, username);
  const data = await logInAPI(username, password);
  if (data.errors && data.errors.length)
    return dispatch({ type: LOG_IN_FAILURE, data });
  dispatch(setCurrentUser(data));
  dispatch({ type: LOG_IN_SUCCESS, data });
  dispatch({ type: OPEN_USER_LOGIN_DIALOG });
  dispatch(goToAdminClient());
};

export const logOut = (userID) => {
  return {
    type: LOG_OUT,
    data: userID,
  };
};
