import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { useTheme } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import MWLoginForm from "../components/MWLoginForm";
import Constants from "../Constants";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    maxWidth: "750px",
  },
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.custom.spacing.appBody,
  },
}));

const Login = (props) => {
  const { currentUser } = useSelector((state) => ({
    currentUser: state.userReducer.currentUser,
  }));
  const theme = useTheme();
  const classes = useStyles(theme);

  // If authenticated then redirect to main
  if (currentUser && currentUser.token) {
    return <Redirect to={`${props.mainAppPath}`} />;
  }

  return (
    <Box
      padding={theme.custom.spacing.appBody}
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#E2E6E9"
    >
      <Box className={classes.formContainer}>
        <Paper elevation={1}>
          <Box padding={1}>
            <MWLoginForm />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

Login.propTypes = {
  mainAppPath: PropTypes.string.isRequired,
};

export default Login;
