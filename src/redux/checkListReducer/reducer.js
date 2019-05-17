import {
  ADD_CHECKLIST,
  ADD_CHECKLIST_ITEM,
  UPDATE_CHECKLIST_ITEM,
  DELETE_CHECKLIST,
  DELETE_CHECKLIST_ITEM,
  UPDATE_CHECKLIST_TITLE,
} from "./constants";


import CLh from '../../helpers/CheckListHelper'
import fetchBoardData from "../../helpers/fetchBoardData";
import boards from "../../data";

const initialState = fetchBoardData(boards).checkLists;

const checkListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHECKLIST:
      return CLh.addCheckList(state, action.payload);
    case ADD_CHECKLIST_ITEM:
      return CLh.addCheckListItem(state, action.payload);
    case UPDATE_CHECKLIST_ITEM:
      return CLh.updateCheckListItem(state, action.payload);
    case DELETE_CHECKLIST:
      return CLh.deleteCheckList(state, action.payload);
    case DELETE_CHECKLIST_ITEM:
      return CLh.deleteCheckListItem(state, action.payload);
    case UPDATE_CHECKLIST_TITLE:
      return CLh.editCheckListTitle(state, action.payload);

    default:
      return state;
  }
};

export default checkListReducer;
