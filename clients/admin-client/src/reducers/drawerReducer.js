import { OPEN_DRAWER, CLOSE_DRAWER, TOGGLE_DRAWER } from "../actions/types";

const initialState = {
  drawerOpen: false,
};

const drawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return {
        ...state,
        drawerOpen: true,
      };
    case CLOSE_DRAWER:
      return {
        ...state,
        drawerOpen: false,
      };
    case TOGGLE_DRAWER:
      return {
        ...state,
        drawerOpen: !state.drawerOpen,
      };
    default:
      return state;
  }
};

export default drawerReducer;
