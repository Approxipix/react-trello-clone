import * as t from "../constants/constants";

export const addEntities = (fields) => ({
  type: t.ADD_ENTITIES,
  payload: fields
});

export const setCurrentBoardID = (fields) => ({
  type: t.SET_CURRENT_BOARD_ID,
  payload: fields
});

export const toggleSidebar = (fields) => ({
  type: t.TOGGLE_SIDEBAR,
  payload: fields
});
