import {
  ADD_LIST,
  EDIT_LIST_TITLE,
  DELETE_LIST,
  MOVE_CARD,
} from "./constants";

export const addList = (fields) => ({
  type: ADD_LIST,
  payload: fields
});

export const editListTitle = (fields) => ({
  type: EDIT_LIST_TITLE,
  payload: fields
});



export const deleteList = (fields) => ({
  type: DELETE_LIST,
  payload: fields
});

export const moveCard = (fields) => ({
  type: MOVE_CARD,
  payload: fields
});
