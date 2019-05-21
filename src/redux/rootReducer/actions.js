import {
  SET_CURRENT_BOARD_ID,
  TOGGLE_SIDEBAR,
} from "./constants";

export const setCurrentBoardID = (fields) => ({
  type: SET_CURRENT_BOARD_ID,
  payload: fields
});

export const toggleSidebar = (fields) => ({
  type: TOGGLE_SIDEBAR,
  payload: fields
});
