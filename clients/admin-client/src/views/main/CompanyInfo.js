import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import MWInfoGeneral from "../../components/MWInfoGeneral";
import MWContactInfo from "../../components/MWContactInfo";

const CompanyInfo = () => {
  const theme = useTheme();

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Box p={theme.custom.spacing.card}>
            <Paper>
              <Box p={theme.custom.spacing.cardInner}>
                <MWInfoGeneral />
              </Box>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box p={theme.custom.spacing.card}>
            <Paper>
              <Box p={theme.custom.spacing.cardInner}>
                <MWContactInfo />
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyInfo;
