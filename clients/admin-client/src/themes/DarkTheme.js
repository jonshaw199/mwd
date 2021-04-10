import { createMuiTheme } from "@material-ui/core/styles";
import global from "./GlobalTheme";

const dark = {
  ...global,
  palette: {
    type: "dark",
    custom: {
      background: {
        innderCard: "#f7f7f7",
      },
    },
  },
};

const darkTheme = createMuiTheme(dark);

export default darkTheme;
