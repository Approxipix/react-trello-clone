import * as t from "../constants/constants";

export const requestBoards = () => ({
  type: t.REQUEST_BOARDS,
});

export const responseBoardsSuccess = (fields) => ({
  type: t.RESPONSE_BOARDS_SUCCESS,
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
