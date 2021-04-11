import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { useSelector, useDispatch } from "react-redux";
import Box from "@material-ui/core/Box";

import { closeQuoteDialog } from "../actions/quoteDialogActions";
import MWContactForm from "./MWContactForm";
import { sendMessage } from "../actions/messageActions";

const MWAdminLoginDialog = () => {
  const dispatch = useDispatch();

  const { quoteDialogOpen } = useSelector((state) => ({
    quoteDialogOpen: state.quoteDialogReducer.quoteDialogOpen,
  }));

  const closeQuoteDialogCB = React.useCallback(() => {
    dispatch(closeQuoteDialog());
  }, [dispatch]);

  const handleSendCB = React.useCallback(
    (imgData) => {
      dispatch(sendMessage(imgData));
    },
    [dispatch]
  );

  return (
    <Dialog open={quoteDialogOpen} onClose={closeQuoteDialogCB}>
      <Box py={2} px={3}>
        <MWContactForm sendHandler={handleSendCB} />
      </Box>
    </Dialog>
  );
};

export default MWAdminLoginDialog;
