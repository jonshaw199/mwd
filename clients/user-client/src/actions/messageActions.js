import {
  SEND_MESSAGE_LOADING,
  SEND_MESSAGE_FAILURE,
  SEND_MESSAGE_SUCCESS,
} from "./types";
import Message from "../api/Message";

export const sendMessage = (msgData) => async (dispatch) => {
  dispatch({ type: SEND_MESSAGE_LOADING });
  const data = await Message.postMessage(msgData);
  if (data.errors && data.errors.length)
    dispatch({ type: SEND_MESSAGE_FAILURE, data });
  else {
    dispatch({ type: SEND_MESSAGE_SUCCESS, data });
  }
};
