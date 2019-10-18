import * as t from '../../constants';

export const addList = (fields) => ({
  type: t.ADD_LIST,
  payload: fields
});

export const editListTitle = (fields) => ({
  type: t.EDIT_LIST_TITLE,
  payload: fields
});

export const moveCard = (fields) => ({
  type: t.MOVE_CARD,
  payload: fields
});

export const moveAllCards = (fields) => ({
  type: t.MOVE_ALL_CARDS,
  payload: fields
});

export const deleteList = (fields) => ({
  type: t.DELETE_LIST,
  payload: fields
});

export const deleteAllCards = (fields) => ({
  type: t.DELETE_ALL_CARDS,
  payload: fields
});
