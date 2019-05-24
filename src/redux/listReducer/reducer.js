import boards from '../../data'
import fetchBoardData from '../../helpers/fetchBoardData'
import Lh from '../../helpers/ListHelper'
import {
  ADD_LIST,
  EDIT_LIST_TITLE,
  MOVE_CARD,
  MOVE_ALL_CARDS,
  DELETE_LIST,
  DELETE_ALL_CARDS,
} from "./constants";
import {
  ADD_CARD,
  DELETE_CARD
} from "../cardReducer/constants";

const initialState = fetchBoardData(boards).lists;

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIST:
      return Lh.addList(state, action.payload);
    case ADD_CARD:
      return Lh.addCardToList(state, action.payload);
    case EDIT_LIST_TITLE:
      return Lh.editListTitle(state, action.payload);
    case MOVE_CARD:
      return Lh.moveCard(state, action.payload);
    case MOVE_ALL_CARDS:
      return Lh.moveAllCards(state, action.payload);
    case DELETE_LIST:
      return Lh.deleteList(state, action.payload);
    case DELETE_CARD:
      return Lh.deleteCardFromList(state, action.payload);
    case DELETE_ALL_CARDS:
      return Lh.deleteAllCards(state, action.payload);
    default:
      return state;
  }
};

export default listReducer;
