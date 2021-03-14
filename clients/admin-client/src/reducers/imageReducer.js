import {
  UPLOAD_IMAGE_LOADING,
  UPLOAD_IMAGE_FAILURE,
  UPLOAD_IMAGE_SUCCESS,
} from "../actions/types";

const initialState = {
  uploadImageErrors: [],
  uploadImageLoading: false,
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE_LOADING:
      return {
        ...state,
        uploadImageLoading: true,
        uploadImageErrors: [],
      };
    case UPLOAD_IMAGE_FAILURE:
      return {
        ...state,
        uploadImageLoading: false,
        uploadImageErrors: action.data.errors,
      };
    case UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        uploadImageLoading: false,
        uploadImageErrors: [],
      };
    default:
      return state;
  }
};

export default imageReducer;
