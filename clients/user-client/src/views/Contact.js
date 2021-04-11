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
import { useSelector, useDispatch } from "react-redux";

import MWContactForm from "../components/MWContactForm";
import MWMap from "../components/MWMap";
import MWHeading from "../components/MWHeading";
import { sendMessage } from "../actions/messageActions";

function Contact() {
  const { preferences } = useSelector((state) => ({
    preferences: state.preferencesReducer.preferences,
  }));
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleSendCB = React.useCallback(
    (imgData) => {
      dispatch(sendMessage(imgData));
    },
    [dispatch]
  );

  return (
    <Paper elevation={0}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Box p={theme.custom.spacing.appBody}>
            <MWHeading text="Contact Info" />
            {preferences &&
              preferences.content &&
              preferences.content.contact1 &&
              preferences.content.contact1.length > 0 && (
                <Box mt={theme.custom.spacing.verticalHeading}>
                  <Typography variant={theme.custom.typography.body}>
                    {preferences.content.contact1}
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
            <MWHeading text="Send Us A Message" />
            <Box mt={theme.custom.spacing.verticalHeading}>
              <MWContactForm sendHandler={handleSendCB} />
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
