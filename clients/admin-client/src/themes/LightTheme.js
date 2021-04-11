import { createMuiTheme } from "@material-ui/core/styles";
import global from "./GlobalTheme";

const light = {
  ...global,
  palette: {
    type: "light",
    primary: {
      main: "#c23c25",
    },
    custom: {
      background: {
        innerCard: "#fefefe",
      },
    },
  },
};

const lightTheme = createMuiTheme(light);

export default lightTheme;
