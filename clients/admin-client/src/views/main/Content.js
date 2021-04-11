import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import MWContactContent from "../../components/MWContactContent";
import MWAboutContent from "../../components/MWAboutContent";

const Content = () => {
  const theme = useTheme();

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Box p={theme.custom.spacing.card}>
            <Paper>
              <Box p={theme.custom.spacing.cardInner}>
                <MWAboutContent />
              </Box>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box p={theme.custom.spacing.card}>
            <Paper>
              <Box p={theme.custom.spacing.cardInner}>
                <MWContactContent />
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Content;
