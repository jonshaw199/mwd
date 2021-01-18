import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  opaqueText: {
    opacity: theme.opacity.footerOpacity,
  },
}));

const MWFooter = () => {
  const theme = useTheme();
  const classes = useStyles();
  const currentDate = new Date();

  return (
    <Box my={theme.margin.verticalFooterMargin}>
      <Typography variant="body2" align="center" className={classes.opaqueText}>
        &copy; {currentDate.getFullYear()} May Welding and Design
      </Typography>
    </Box>
  );
};

export default MWFooter;
