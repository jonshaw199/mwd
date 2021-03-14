import { GO_TO_ADMIN_CLIENT, OPEN_USER_LOGIN_DIALOG } from "./types";

export const goToAdminClient = () => async (dispatch, getState) => {
  const { currentUser } = getState().userReducer;
  if (currentUser && currentUser.token) {
    return dispatch({
      type: GO_TO_ADMIN_CLIENT,
    });
  }
  return dispatch({ type: OPEN_USER_LOGIN_DIALOG });
};
