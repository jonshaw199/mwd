import { createMuiTheme } from "@material-ui/core/styles";
import { green, purple } from "@material-ui/core/colors";

import global from "./GlobalTheme";

const light = {
  ...global,
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: purple[500],
    },
  },
};

const lightTheme = createMuiTheme(light);

export default lightTheme;
