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
import { useSelector } from "react-redux";

import MWContactForm from "../components/MWContactForm";
import MWMap from "../components/MWMap";
import MWHeading from "../components/MWHeading";

function Contact() {
  const { preferences } = useSelector((state) => ({
    preferences: state.preferencesReducer.preferences,
  }));
  const theme = useTheme();
  return (
    <Paper elevation={0}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Box p={theme.custom.spacing.appBody}>
            <MWHeading text="Contact Info" position="left" />
            {preferences &&
              preferences.content &&
              preferences.content.contact &&
              preferences.content.contact.length > 0 && (
                <Box mt={theme.custom.spacing.verticalHeading}>
                  <Typography variant={theme.custom.typography.body}>
                    Lorem ipsum dolor sit amet, inani nonumes fabellas sit id,
                    duo dicat exerci persius an, te inani mollis conclusionemque
                    eos. Hinc quaeque mei eu, qui et sumo evertitur moderatius,
                    cu usu natum pertinacia intellegam.
                  </Typography>
                </Box>
              )}
            <Box my={theme.custom.spacing.aLittleExtra}>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant={theme.custom.typography.body}>
                      (916) 123-4567
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Email />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant={theme.custom.typography.body}>
                      something@gmail.com
                    </Typography>
                  </ListItemText>
                </ListItem>
              </List>
            </Box>
            <Box>
              <Typography variant={theme.custom.typography.body}>
                Has et falli comprehensam, te dicam voluptaria mei. In has
                veniam civibus. Ut purto brute audire mei, in erat tation
                liberavisse nec.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box p={theme.custom.spacing.appBody}>
            <MWHeading text="Send Us A Message" position="left" />
            <Box mt={theme.custom.spacing.verticalHeading}>
              <MWContactForm />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box my={theme.custom.spacing.verticalHeading}>
        <MWMap center={{ lat: 38.6446, lng: -121.2722 }} zoom={10} />
      </Box>
    </Paper>
  );
}

export default Contact;
