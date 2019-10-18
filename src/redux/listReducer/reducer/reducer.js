import * as t from '../../constants';
import Lh from '../../../services/ListHelper'

const listReducer = (state = {}, action) => {
  switch (action.type) {
    case t.RESPONSE_BOARDS_SUCCESS:
      return {
        ...state,
        ...action.payload.lists
      };

    case t.ADD_LIST:
      return Lh.addList(state, action.payload);
    case t.EDIT_LIST_TITLE:
      return Lh.editListTitle(state, action.payload);
    case t.MOVE_CARD:
      return Lh.moveCard(state, action.payload);
    case t.MOVE_ALL_CARDS:
      return Lh.moveAllCards(state, action.payload);
    case t.DELETE_LIST:
      return Lh.deleteList(state, action.payload);
    case t.DELETE_ALL_CARDS:
      return Lh.deleteAllCards(state, action.payload);

    case t.ADD_CARD:
      return Lh.addCardToList(state, action.payload);
    case t.DELETE_CARD:
      return Lh.deleteCardFromList(state, action.payload);
    default:
      return state;
  }
};

export default listReducer;
