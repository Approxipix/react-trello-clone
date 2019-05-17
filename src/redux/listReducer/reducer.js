import boards from '../../data'
import fetchBoardData from '../../helpers/fetchBoardData'
import {
  ADD_LIST,
  EDIT_LIST_TITLE,
  DELETE_LIST,
  MOVE_CARD,
} from "./constants";

import Lh from '../../helpers/ListHelper'
import { ADD_CARD } from "../cardReducer/constants";

const initialState = fetchBoardData(boards).lists;

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CARD:
      return Lh.addCardToList(state, action.payload);
    case ADD_LIST:
      return Lh.addList(state, action.payload);
    case EDIT_LIST_TITLE:
      return Lh.editListTitle(state, action.payload);
    case DELETE_LIST:
      return Lh.deleteList(state, action.payload);
    case MOVE_CARD:
      return Lh.moveCard(state, action.payload);
    default:
      return state;
  }
};

export default listReducer;
