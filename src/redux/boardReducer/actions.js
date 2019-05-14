import {
  SET_CURRENT_BOARD_INDEX,
  ADD_BOARD,
  EDIT_BOARD_TITLE,
  EDIT_BOARD_COLOR,
  DELETE_BOARD,

  ADD_LIST,
  EDIT_LIST_TITLE,
  MOVE_LIST,
  DELETE_LIST,

  ADD_CARD,
  EDIT_CARD_TITLE,
  EDIT_CARD_DESCRIPTION,
  MOVE_CARD,
  DELETE_CARD,
} from "./constants";

export const setCurrentBoardIndex = (fields) => ({
  type: SET_CURRENT_BOARD_INDEX,
  payload: fields
});

export const addBoard = (fields) => ({
  type: ADD_BOARD,
  payload: fields
});

export const editBoardTitle = (fields) => ({
  type: EDIT_BOARD_TITLE,
  payload: fields
});

export const editBoardColor = (fields) => ({
  type: EDIT_BOARD_COLOR,
  payload: fields
});

export const deleteBoard = (fields) => ({
  type: DELETE_BOARD,
  payload: fields
});

export const addList = (fields) => ({
  type: ADD_LIST,
  payload: fields
});

export const editListTitle = (fields) => ({
  type: EDIT_LIST_TITLE,
  payload: fields
});

export const moveList = (fields) => ({
  type: MOVE_LIST,
  payload: fields
});

export const deleteList = (fields) => ({
  type: DELETE_LIST,
  payload: fields
});

export const addCard = (fields) => ({
  type: ADD_CARD,
  payload: fields
});

export const editCardTitle = (fields) => ({
  type: EDIT_CARD_TITLE,
  payload: fields
});

export const editCardDescription = (fields) => ({
  type: EDIT_CARD_DESCRIPTION,
  payload: fields
});

export const moveCard = (fields) => ({
  type: MOVE_CARD,
  payload: fields
});

export const deleteCard = (fields) => ({
  type: DELETE_CARD,
  payload: fields
});


