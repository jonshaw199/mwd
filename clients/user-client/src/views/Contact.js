import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Email from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/core/styles";

import MWContactForm from "../components/MWContactForm";
import MWMap from "../components/MWMap";

function Contact() {
  const theme = useTheme();
  return (
    <Paper elevation={0}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Box p={theme.padding.appBodyPadding}>
            <Box my={theme.margin.verticalHeadingMargin}>
              <Typography variant="h5">Contact Info</Typography>
            </Box>
            <Box mt={theme.margin.general}>
              <Typography variant="body2">
                Lorem ipsum dolor sit amet, inani nonumes fabellas sit id, duo
                dicat exerci persius an, te inani mollis conclusionemque eos.
                Hinc quaeque mei eu, qui et sumo evertitur moderatius, cu usu
                natum pertinacia intellegam.
              </Typography>
            </Box>
            <Box>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body1">(916) 123-4567</Typography>
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Email />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body1">something@gmail.com</Typography>
                  </ListItemText>
                </ListItem>
              </List>
            </Box>
            <Box mb={theme.margin.aLittleExtraMargin}>
              <Typography variant="body2">
                Has et falli comprehensam, te dicam voluptaria mei. In has
                veniam civibus. Ut purto brute audire mei, in erat tation
                liberavisse nec.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box p={theme.padding.appBodyPadding}>
            <Box my={theme.margin.verticalHeadingMargin}>
              <Typography variant="h5">Send Us A Message</Typography>
            </Box>
            <Box mt={theme.margin.aLittleExtraMargin}>
              <MWContactForm />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box my={theme.margin.verticalHeadingMargin}>
        <MWMap center={{ lat: 38.6446, lng: -121.2722 }} zoom={10} />
      </Box>
    </Paper>
  );
}

export default Contact;
