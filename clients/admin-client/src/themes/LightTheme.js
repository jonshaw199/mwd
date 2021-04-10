import { createMuiTheme } from "@material-ui/core/styles";
import global from "./GlobalTheme";

const light = {
  ...global,
  palette: {
    type: "light",
    custom: {
      background: {
        innerCard: "#fefefe",
      },
    },
  },
};

const lightTheme = createMuiTheme(light);

export default lightTheme;
