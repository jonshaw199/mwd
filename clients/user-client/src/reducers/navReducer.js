import { CHANGE_NAV_HEIGHT } from "../actions/types";

const initialState = {
  navHeight: 64,
};

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_NAV_HEIGHT:
      return {
        ...state,
        navHeight: action.data,
      };
    default:
      return state;
  }
};

export default navReducer;
