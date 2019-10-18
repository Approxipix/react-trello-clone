import * as t from '../../constants';

export const addBoard = (fields) => ({
  type: t.ADD_BOARD,
  payload: fields
});

export const editBoardColor = (fields) => ({
  type: t.EDIT_BOARD_COLOR,
  payload: fields
});

export const editBoardTitle = (fields) => ({
  type: t.EDIT_BOARD_TITLE,
  payload: fields
});

export const moveList = (fields) => ({
  type: t.MOVE_LIST,
  payload: fields
});

export const moveListToAnotherBoard = (fields) => ({
  type: t.MOVE_LIST_TO_ANOTHER_BOARD,
  payload: fields
});

export const deleteBoard = (fields) => ({
  type: t.DELETE_BOARD,
  payload: fields
});
