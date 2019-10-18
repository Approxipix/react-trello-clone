import * as t from '../../constants';
import Bh from '../../../services/BoardHelper'

const boardReducer = (state = {}, action) => {
  switch (action.type) {
    case t.RESPONSE_BOARDS_SUCCESS:
      return {
        ...state,
        ...action.payload.boards
      };

    case t.ADD_BOARD:
      return Bh.addBoard(state, action.payload);
    case t.EDIT_BOARD_TITLE:
      return Bh.editBoardTitle(state, action.payload);
    case t.EDIT_BOARD_COLOR:
      return Bh.editBoardColor(state, action.payload);
    case t.MOVE_LIST:
      return Bh.moveList(state, action.payload);
    case t.MOVE_LIST_TO_ANOTHER_BOARD:
      return Bh.moveListToAnotherBoard(state, action.payload);
    case t.DELETE_BOARD:
      return Bh.deleteBoard(state, action.payload);

    case t.ADD_LIST:
      return Bh.addListToBoard(state, action.payload);
    case t.DELETE_LIST:
      return Bh.deleteListFromBoard(state, action.payload);
    default:
      return state;
  }
};

export default boardReducer;
