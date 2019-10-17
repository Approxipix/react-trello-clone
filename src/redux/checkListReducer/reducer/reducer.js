import * as t from "../constants/constants";
import { ADD_ENTITIES } from "../../rootReducer/constants/constants";
import CLh from '../../../services/CheckListHelper'

const checkListReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ENTITIES:
      return {
        ...state,
        ...action.payload.checkLists
      };

    case t.ADD_CHECKLIST:
      return CLh.addCheckList(state, action.payload);
    case t.ADD_CHECKLIST_ITEM:
      return CLh.addCheckListItem(state, action.payload);
    case t.EDIT_CHECKLIST_TITLE:
      return CLh.editCheckListTitle(state, action.payload);
    case t.UPDATE_CHECKLIST_ITEM:
      return CLh.updateCheckListItem(state, action.payload);
    case t.DELETE_CHECKLIST:
      return CLh.deleteCheckList(state, action.payload);
    case t.DELETE_CHECKLIST_ITEM:
      return CLh.deleteCheckListItem(state, action.payload);
    default:
      return state;
  }
};

export default checkListReducer;
