import boards from '../../data'
import fetchBoardData from '../../helpers/fetchBoardData'
import Ch from '../../helpers/CardHelper'
import {
  ADD_CARD,
  ADD_LABEL_TO_CARD,
  EDIT_CARD_TITLE,
  EDIT_CARD_DESC,
  DELETE_CARD,
} from "./constants";
import {
  ADD_CHECKLIST,
  DELETE_CHECKLIST
} from "../checkListReducer/constants";

const initialState = fetchBoardData(boards).cards;

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CARD:
      return Ch.addCard(state, action.payload);
    case ADD_CHECKLIST:
      return Ch.addCheckListToCard(state, action.payload);
    case ADD_LABEL_TO_CARD:
      return Ch.addLabelToCard(state, action.payload);
    case EDIT_CARD_TITLE:
      return Ch.editCardTitle(state, action.payload);
    case EDIT_CARD_DESC:
      return Ch.editCardDesc(state, action.payload);
    case DELETE_CARD:
      return Ch.deleteCard(state, action.payload);
    case DELETE_CHECKLIST:
      return Ch.deleteCheckListFromCard(state, action.payload);
    default:
      return state;
  }
};

export default cardReducer;
