import {
  ADD_LIST,
  EDIT_LIST_TITLE,
  MOVE_CARD,
  MOVE_ALL_CARDS,
  DELETE_LIST,
  DELETE_ALL_CARDS,
} from "../constants/constants";

export const addList = (fields) => ({
  type: ADD_LIST,
  payload: fields
});

export const editListTitle = (fields) => ({
  type: EDIT_LIST_TITLE,
  payload: fields
});

export const moveCard = (fields) => ({
  type: MOVE_CARD,
  payload: fields
});

export const moveAllCards = (fields) => ({
  type: MOVE_ALL_CARDS,
  payload: fields
});

export const deleteList = (fields) => ({
  type: DELETE_LIST,
  payload: fields
});

export const deleteAllCards = (fields) => ({
  type: DELETE_ALL_CARDS,
  payload: fields
});
