import {
  GET_PREFERENCES_LOADING,
  GET_PREFERENCES_FAILURE,
  GET_PREFERENCES_SUCCESS,
  UPDATE_PREFERENCES_LOADING,
  UPDATE_PREFERENCES_FAILURE,
  UPDATE_PREFERENCES_SUCCESS,
} from "../actions/types";

const initialState = {
  preferences: {},
  getPreferencesErrors: [],
  getPreferencesLoading: false,
  updatePreferencesLoading: false,
  updatePreferencesErrors: [],
  updatedPreferences: {},
};

const preferencesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PREFERENCES_LOADING:
      return {
        ...state,
        getPreferencesLoading: true,
        getPreferencesErrors: [],
      };
    case GET_PREFERENCES_FAILURE:
      return {
        ...state,
        getPreferencesLoading: false,
        getPreferencesErrors: action.data.errors,
      };
    case GET_PREFERENCES_SUCCESS:
      return {
        ...state,
        getPreferencesLoading: false,
        getPreferencesErrors: [],
        preferences: action.data.data,
      };
    case UPDATE_PREFERENCES_LOADING:
      return {
        ...state,
        updatePreferencesLoading: true,
        updatePreferencesErrors: [],
      };
    case UPDATE_PREFERENCES_FAILURE:
      return {
        ...state,
        updatePreferencesLoading: false,
        updatePreferencesErrors: action.data.errors,
      };
    case UPDATE_PREFERENCES_SUCCESS:
      return {
        ...state,
        updatePreferencesLoading: false,
        updatePreferencesErrors: [],
        updatedPreferences: action.data.data,
      };
    default:
      return state;
  }
};

export default preferencesReducer;
