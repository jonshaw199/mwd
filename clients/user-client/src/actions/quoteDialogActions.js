import { OPEN_QUOTE_DIALOG, CLOSE_QUOTE_DIALOG } from "./types";

export const openQuoteDialog = () => {
  return {
    type: OPEN_QUOTE_DIALOG,
  };
};

export const closeQuoteDialog = () => {
  return {
    type: CLOSE_QUOTE_DIALOG,
  };
};
