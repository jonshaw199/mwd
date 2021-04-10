import {
  SEND_MESSAGE_LOADING,
  SEND_MESSAGE_FAILURE,
  SEND_MESSAGE_SUCCESS,
} from "../actions/types";

const initialState = {
  sentMessage: {},
  sendMessageErrors: [],
  sendMessageLoading: false,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE_LOADING:
      return {
        ...state,
        sendMessageLoading: true,
        sendMessageErrors: [],
      };
    case SEND_MESSAGE_FAILURE:
      return {
        ...state,
        sendMessageLoading: false,
        sendMessageErrors: action.data.errors,
      };
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        sendMessageLoading: false,
        sendMessageErrors: [],
        sentMessage: action.data.data,
      };
    default:
      return state;
  }
};

export default messageReducer;
