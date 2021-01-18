import { CHANGE_THEME } from "./types";
import darkTheme from "./themes/DarkTheme";
import lightTheme from "./themes/LightTheme";

export const changeTheme = (theme) => {
  theme = theme === "light" ? lightTheme : darkTheme;
  return {
    type: CHANGE_THEME,
    data: theme,
  };
};
