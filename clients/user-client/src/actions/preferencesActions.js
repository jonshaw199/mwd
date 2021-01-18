import {
  GET_PREFERENCES_LOADING,
  GET_PREFERENCES_FAILURE,
  GET_PREFERENCES_SUCCESS,
} from "./types";
import Preferences from "../api/Preferences";

export const getPreferencesLoading = () => {
  return {
    type: GET_PREFERENCES_LOADING,
  };
};

export const getPreferences = () => async (dispatch) => {
  dispatch({ type: GET_PREFERENCES_LOADING });
  const data = await Preferences.getPreferences();
  if (data.errors && data.errors.length)
    dispatch({ type: GET_PREFERENCES_FAILURE, data });
  else dispatch({ type: GET_PREFERENCES_SUCCESS, data });
};
