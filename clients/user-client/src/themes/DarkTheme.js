import { createMuiTheme } from "@material-ui/core/styles";
import global from "./GlobalTheme";

const dark = {
  ...global,
  palette: {
    type: "dark",
    background: {
      default: "#000",
    },
  },
};

const darkTheme = createMuiTheme(dark);

export default darkTheme;
