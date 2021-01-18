import { GO_TO_ADMIN_CLIENT } from "../actions/types";

const initialState = {
  goToAdminClient: false,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case GO_TO_ADMIN_CLIENT:
      return {
        ...state,
        goToAdminClient: true,
      };
    default:
      return state;
  }
};

export default adminReducer;
