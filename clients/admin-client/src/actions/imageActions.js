import {
  UPLOAD_IMAGE_LOADING,
  UPLOAD_IMAGE_FAILURE,
  UPLOAD_IMAGE_SUCCESS,
} from "./types";
import Images from "../api/Images";

export const uploadImage = (data) => async (dispatch, getState) => {
  dispatch({ type: UPLOAD_IMAGE_LOADING });
  const response = await Images.uploadImage(
    data,
    getState().userReducer.currentUser.token
  );
  if (response.errors && response.errors.length) {
    dispatch({ type: UPLOAD_IMAGE_FAILURE, response });
  } else {
    dispatch({ type: UPLOAD_IMAGE_SUCCESS, response });
  }
};
