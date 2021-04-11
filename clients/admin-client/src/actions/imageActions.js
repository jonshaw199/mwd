import {
  CREATE_IMAGE_LOADING,
  CREATE_IMAGE_FAILURE,
  CREATE_IMAGE_SUCCESS,
  UPDATE_IMAGE_LOADING,
  UPDATE_IMAGE_FAILURE,
  UPDATE_IMAGE_SUCCESS,
} from "./types";
import Images from "../api/Images";
import { refreshProjects } from "./projectActions";

export const createImage = (imgData) => async (dispatch, getState) => {
  dispatch({ type: CREATE_IMAGE_LOADING });
  const data = await Images.createImage(
    imgData,
    getState().userReducer.currentUser.token
  );
  if (data.errors && data.errors.length) {
    dispatch({ type: CREATE_IMAGE_FAILURE, data });
  } else {
    dispatch({ type: CREATE_IMAGE_SUCCESS, data });
    dispatch(refreshProjects());
  }
};

export const updateImage = (imgData) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_IMAGE_LOADING });
  const data = await Images.updateImage(
    imgData,
    getState().userReducer.currentUser.token
  );
  if (data.errors && data.errors.length) {
    dispatch({ type: UPDATE_IMAGE_FAILURE, data });
  } else {
    dispatch({ type: UPDATE_IMAGE_SUCCESS, data });
    dispatch(refreshProjects());
  }
};
