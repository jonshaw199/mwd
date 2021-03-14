import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { useSelector, useDispatch } from "react-redux";
import Box from "@material-ui/core/Box";

import { closeQuoteDialog } from "../actions/quoteDialogActions";
import MWContactForm from "./MWContactForm";

const MWAdminLoginDialog = () => {
  const dispatch = useDispatch();

  const { quoteDialogOpen } = useSelector((state) => ({
    quoteDialogOpen: state.quoteDialogReducer.quoteDialogOpen,
  }));

  const closeQuoteDialogCB = React.useCallback(() => {
    dispatch(closeQuoteDialog());
  }, [dispatch]);

  return (
    <Dialog open={quoteDialogOpen} onClose={closeQuoteDialogCB}>
      <Box py={2} px={3}>
        <MWContactForm />
      </Box>
    </Dialog>
  );
};

// Prop types

export default MWAdminLoginDialog;
