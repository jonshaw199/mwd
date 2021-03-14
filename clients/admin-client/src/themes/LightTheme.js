import { createMuiTheme } from "@material-ui/core/styles";
import global from "./GlobalTheme";

const light = {
  ...global,
  palette: {
    type: "light",
  },
};

const lightTheme = createMuiTheme(light);

export default lightTheme;
