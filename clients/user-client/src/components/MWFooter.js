import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";

import { goToAdminClient } from "../actions/adminActions";

const useStyles = makeStyles((theme) => ({
  opaqueText: {
    opacity: theme.custom.opacity.footerOpacity,
  },
}));

const MWFooter = () => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentDate = new Date();

  const goToAdminClientCB = React.useCallback(
    () => dispatch(goToAdminClient()),
    [dispatch]
  );

  return (
    <Box my={theme.custom.spacing.verticalFooter} onClick={goToAdminClientCB}>
      <Typography variant="body2" align="center" className={classes.opaqueText}>
        &copy; {currentDate.getFullYear()} May Welding and Design
      </Typography>
    </Box>
  );
};

export default MWFooter;
