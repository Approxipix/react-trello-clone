import * as t from '../../constants';

export const addCard = (fields) => ({
  type: t.ADD_CARD,
  payload: fields
});

export const addLabelToCard = (fields) => ({
  type: t.ADD_LABEL_TO_CARD,
  payload: fields
});

export const editCardTitle = (fields) => ({
  type: t.EDIT_CARD_TITLE,
  payload: fields
});

export const editCardDesc = (fields) => ({
  type: t.EDIT_CARD_DESCRIPTION,
  payload: fields
});

export const deleteCard = (fields) => ({
  type: t.DELETE_CARD,
  payload: fields
});

