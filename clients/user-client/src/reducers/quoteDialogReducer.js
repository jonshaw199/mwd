import { OPEN_QUOTE_DIALOG, CLOSE_QUOTE_DIALOG } from "../actions/types";

const initialState = {
  quoteDialogOpen: false,
};

const quoteDialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_QUOTE_DIALOG:
      return {
        ...state,
        quoteDialogOpen: true,
      };
    case CLOSE_QUOTE_DIALOG:
      return {
        ...state,
        quoteDialogOpen: false,
      };
    default:
      return state;
  }
};

export default quoteDialogReducer;
