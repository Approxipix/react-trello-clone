import {
  ADD_CHECKLIST,
  ADD_CHECKLIST_ITEM,
  EDIT_CHECKLIST_TITLE,
  UPDATE_CHECKLIST_ITEM,
  DELETE_CHECKLIST,
  DELETE_CHECKLIST_ITEM,
} from "./constants";

export const addCheckList = (fields) => ({
  type: ADD_CHECKLIST,
  payload: fields
});

export const addCheckListItem = (fields) => ({
  type: ADD_CHECKLIST_ITEM,
  payload: fields
});

export const editCheckListTitle = (fields) => ({
  type: EDIT_CHECKLIST_TITLE,
  payload: fields
});

export const updateCheckListItem = (fields) => ({
  type: UPDATE_CHECKLIST_ITEM,
  payload: fields
});

export const deleteCheckList = (fields) => ({
  type: DELETE_CHECKLIST,
  payload: fields
});

export const deleteCheckListItem = (fields) => ({
  type: DELETE_CHECKLIST_ITEM,
  payload: fields
});

