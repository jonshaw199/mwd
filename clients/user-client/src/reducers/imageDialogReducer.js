import { OPEN_IMAGE_DIALOG, CLOSE_IMAGE_DIALOG } from "../actions/types";

const initialState = {
  imageDialogOpen: false,
};

const imageDialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_IMAGE_DIALOG:
      return {
        ...state,
        imageDialogOpen: true,
      };
    case CLOSE_IMAGE_DIALOG:
      return {
        ...state,
        imageDialogOpen: false,
      };
    default:
      return state;
  }
};

export default imageDialogReducer;
