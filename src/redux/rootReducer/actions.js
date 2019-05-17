import {
  SET_CURRENT_BOARD_ID,

  ADD_CHECKLIST,
  ADD_CHECKLIST_ITEM,
  UPDATE_CHECKLIST_ITEM,
  DELETE_CHECKLIST,
  UPDATE_CHECKLIST_TITLE,
  DELETE_CHECKLIST_ITEM,
} from "./constants";

export const setCurrentBoardID = (fields) => ({
  type: SET_CURRENT_BOARD_ID,
  payload: fields
});




export const addCheckList = (fields) => ({
  type: ADD_CHECKLIST,
  payload: fields
});

export const addCheckListItem = (fields) => ({
  type: ADD_CHECKLIST_ITEM,
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

export const editCheckListTitle = (fields) => ({
  type: UPDATE_CHECKLIST_TITLE,
  payload: fields
});


