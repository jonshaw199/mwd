import { CHANGE_NAV_HEIGHT } from "./types";

export const changeNavHeight = (height) => {
  return {
    type: CHANGE_NAV_HEIGHT,
    data: height,
  };
};
