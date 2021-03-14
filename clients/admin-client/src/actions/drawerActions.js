import { OPEN_DRAWER, CLOSE_DRAWER, TOGGLE_DRAWER } from "./types";

export const openDrawer = () => {
  return {
    type: OPEN_DRAWER,
  };
};

export const closeDrawer = () => {
  return {
    type: CLOSE_DRAWER,
  };
};

export const toggleDrawer = () => {
  return {
    type: TOGGLE_DRAWER,
  };
};
