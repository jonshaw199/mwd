import { createMuiTheme } from "@material-ui/core/styles";
import global from "./GlobalTheme";

const light = {
  ...global,
  palette: {
    type: "light",
    primary: {
      main: "#f5f2f0",
    },
    secondary: {
      main: "#bf360c",
    },
    error: {
      main: "#bf360c",
    },
    warning: {
      main: "#bf360c",
    },
    info: {
      main: "#bf360c",
    },
    success: {
      main: "#bf360c",
    },
  },
};

const lightTheme = createMuiTheme(light);

export default lightTheme;
