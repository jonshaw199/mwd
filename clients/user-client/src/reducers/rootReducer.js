import { combineReducers } from "redux";

import projectReducer from "./projectReducer";
import drawerReducer from "./drawerReducer";
import preferencesReducer from "./preferencesReducer";
import imageDialogReducer from "./imageDialogReducer";
import themeReducer from "./themeReducer";
import navReducer from "./navReducer";
import adminReducer from "./adminReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import quoteDialogReducer from "./quoteDialogReducer";
import messageReducer from "./messageReducer";

const initialState = {};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  rootReducer,
  projectReducer,
  drawerReducer,
  preferencesReducer,
  imageDialogReducer,
  themeReducer,
  navReducer,
  adminReducer,
  authReducer,
  userReducer,
  quoteDialogReducer,
  messageReducer,
});
