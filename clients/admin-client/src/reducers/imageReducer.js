import {
  CREATE_IMAGE_LOADING,
  CREATE_IMAGE_FAILURE,
  CREATE_IMAGE_SUCCESS,
  UPDATE_IMAGE_LOADING,
  UPDATE_IMAGE_FAILURE,
  UPDATE_IMAGE_SUCCESS,
} from "../actions/types";

const initialState = {
  createImageErrors: [],
  createImageLoading: false,
  createdImage: {},
  updateImageErrors: [],
  updateImageLoading: false,
  updatedImage: {},
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_IMAGE_LOADING:
      return {
        ...state,
        createImageLoading: true,
        createImageErrors: [],
      };
    case CREATE_IMAGE_FAILURE:
      return {
        ...state,
        creteImageLoading: false,
        createImageErrors: action.data.errors,
      };
    case CREATE_IMAGE_SUCCESS:
      return {
        ...state,
        createImageLoading: false,
        createImageErrors: [],
        createdImage: action.data.data,
      };
    case UPDATE_IMAGE_LOADING:
      return {
        ...state,
        updateImageLoading: true,
        updateImageErrors: [],
      };
    case UPDATE_IMAGE_FAILURE:
      return {
        ...state,
        updateImageLoading: false,
        updateImageErrors: action.data.errors,
      };
    case UPDATE_IMAGE_SUCCESS:
      return {
        ...state,
        updateImageLoading: false,
        updateImageErrors: [],
        updatedImage: action.data.data,
      };
    default:
      return state;
  }
};

export default imageReducer;
