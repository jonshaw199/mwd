import { CHANGE_THEME } from "../actions/types";
import lightTheme from "../themes/LightTheme";

const initialState = {
  theme: lightTheme,
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.data,
      };
    default:
      return state;
  }
};

export default themeReducer;
