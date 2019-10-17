import * as t from "../constants/constants";
import { ADD_ENTITIES } from "../../rootReducer/constants/constants";
import { ADD_CHECKLIST, DELETE_CHECKLIST } from "../../checkListReducer/constants/constants";
import Ch from '../../../services/CardHelper'

const cardReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ENTITIES:
      return {
        ...state,
        ...action.payload.cards
      };

    case t.ADD_CARD:
      return Ch.addCard(state, action.payload);
    case t.ADD_LABEL_TO_CARD:
      return Ch.addLabelToCard(state, action.payload);
    case t.EDIT_CARD_TITLE:
      return Ch.editCardTitle(state, action.payload);
    case t.EDIT_CARD_DESC:
      return Ch.editCardDesc(state, action.payload);
    case t.DELETE_CARD:
      return Ch.deleteCard(state, action.payload);

    case ADD_CHECKLIST:
      return Ch.addCheckListToCard(state, action.payload);
    case DELETE_CHECKLIST:
      return Ch.deleteCheckListFromCard(state, action.payload);
    default:
      return state;
  }
};

export default cardReducer;
