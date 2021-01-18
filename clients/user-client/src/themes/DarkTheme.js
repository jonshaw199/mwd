import { createMuiTheme } from "@material-ui/core/styles";
import { green, red } from "@material-ui/core/colors";

import global from "./GlobalTheme";

const dark = {
  ...global,
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: green[500],
    },
  },
};

const darkTheme = createMuiTheme(dark);

export default darkTheme;
