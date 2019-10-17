import boards from '../../data'
import fetchBoardData from '../../helpers/fetchBoardData'
import Bh from '../../services/BoardHelper'
import {
  ADD_BOARD,
  EDIT_BOARD_TITLE,
  EDIT_BOARD_COLOR,
  MOVE_LIST,
  MOVE_LIST_TO_ANOTHER_BOARD,
  DELETE_BOARD,
} from "./constants";
import {
  ADD_LIST,
  DELETE_LIST,
} from "../listReducer/constants";

const initialState = fetchBoardData(boards).boards || {};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOARD:
      return Bh.addBoard(state, action.payload);
    case ADD_LIST:
      return Bh.addListToBoard(state, action.payload);
    case EDIT_BOARD_TITLE:
      return Bh.editBoardTitle(state, action.payload);
    case EDIT_BOARD_COLOR:
      return Bh.editBoardColor(state, action.payload);
    case MOVE_LIST:
      return Bh.moveList(state, action.payload);
    case MOVE_LIST_TO_ANOTHER_BOARD:
      return Bh.moveListToAnotherBoard(state, action.payload);
    case DELETE_BOARD:
      return Bh.deleteBoard(state, action.payload);
    case DELETE_LIST:
      return Bh.deleteListFromBoard(state, action.payload);
    default:
      return state;
  }
};

export default boardReducer;
