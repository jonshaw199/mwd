import { CHANGE_THEME } from "../actions/types";
import lightTheme from "../themes/LightTheme";
import darkTheme from "../themes/DarkTheme";

const initialState = {
  theme: lightTheme,
  inverseTheme: darkTheme,
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
