import * as t from '../../constants';

export const addCheckList = (fields) => ({
  type: t.ADD_CHECKLIST,
  payload: fields
});

export const addCheckListItem = (fields) => ({
  type: t.ADD_CHECKLIST_ITEM,
  payload: fields
});

export const editCheckListTitle = (fields) => ({
  type: t.EDIT_CHECKLIST_TITLE,
  payload: fields
});

export const updateCheckListItem = (fields) => ({
  type: t.UPDATE_CHECKLIST_ITEM,
  payload: fields
});

export const deleteCheckList = (fields) => ({
  type: t.DELETE_CHECKLIST,
  payload: fields
});

export const deleteCheckListItem = (fields) => ({
  type: t.DELETE_CHECKLIST_ITEM,
  payload: fields
});
