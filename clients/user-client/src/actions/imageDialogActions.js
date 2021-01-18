import { OPEN_IMAGE_DIALOG, CLOSE_IMAGE_DIALOG } from "./types";

export const openImageDialog = () => {
  return {
    type: OPEN_IMAGE_DIALOG,
  };
};

export const closeImageDialog = () => {
  return {
    type: CLOSE_IMAGE_DIALOG,
  };
};
