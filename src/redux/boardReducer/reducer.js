import data from '../../data'
import fetchBoardData from '../../helpers/fetchBoardData'
import {
  SET_CURRENT_BOARD_INDEX,
  SET_CURRENT_CARD_INDEX,

  ADD_BOARD,
  EDIT_BOARD_TITLE,
  EDIT_BOARD_COLOR,
  DELETE_BOARD,

  ADD_LIST,
  EDIT_LIST_TITLE,
  MOVE_LIST,
  DELETE_LIST,

  ADD_CARD,
  ADD_LABEL_TO_CARD,
  EDIT_CARD_TITLE,
  EDIT_CARD_DESCRIPTION,
  MOVE_CARD,
  DELETE_CARD,

  ADD_CHECKLIST,
  ADD_CHECKLIST_ITEM,
  UPDATE_CHECKLIST_ITEM,
  DELETE_CHECKLIST,
  DELETE_CHECKLIST_ITEM, UPDATE_CHECKLIST_TITLE,
} from "./constants";

import Bh from '../../helpers/BoardHelper'
import Lh from '../../helpers/ListHelper'
import Ch from '../../helpers/CardHelper'
import CLh from '../../helpers/CheckListHelper'

const initialState = data;

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_BOARD_INDEX:
      return Bh.serCurrentBoardIndex(state, action.payload);
    case SET_CURRENT_CARD_INDEX:
      return Ch.serCurrentCardIndex(state, action.payload);

    case ADD_BOARD:
      return Bh.addBoard(state, action.payload);
    case EDIT_BOARD_TITLE:
      return Bh.editBoardTitle(state, action.payload);
    case EDIT_BOARD_COLOR:
      return Bh.editBoardColor(state, action.payload);
    case DELETE_BOARD:
      return Bh.deleteBoard(state, action.payload);

    case ADD_LIST:
      return Lh.addList(state, action.payload);
    case EDIT_LIST_TITLE:
      return Lh.editListTitle(state, action.payload);
    case MOVE_LIST:
      return Lh.moveList(state, action.payload);
    case DELETE_LIST:
      return Lh.deleteList(state, action.payload);

    case ADD_CARD:
      return Ch.addCard(state, action.payload);
    case ADD_LABEL_TO_CARD:
      return Ch.addLabelToCard(state, action.payload);
    case EDIT_CARD_TITLE:
      return Ch.editCardTitle(state, action.payload);
    case EDIT_CARD_DESCRIPTION:
      return Ch.editCardDescription(state, action.payload);
    case MOVE_CARD:
      return Ch.moveCard(state, action.payload);
    case DELETE_CARD:
      return Ch.deleteCard(state, action.payload);

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

export default rootReducer;
