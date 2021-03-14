import { combineReducers } from "redux";

import authReducer from "./authReducer";
import userReducer from "./userReducer";
import drawerReducer from "./drawerReducer";
import preferencesReducer from "./preferencesReducer";
import themeReducer from "./themeReducer";
import projectReducer from "./projectReducer";

const initialState = {};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  rootReducer,
  authReducer,
  userReducer,
  drawerReducer,
  preferencesReducer,
  themeReducer,
  projectReducer,
});
