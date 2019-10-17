import * as actions from './actions';
import * as constants from '../constants/constants';

describe('listReducer actions', () => {
  it('creates ADD_LIST when list is successfully added', () => {
    const payload = {
      boardId: 'Board ID',
      listId: 'List ID',
      listTitle: 'List title',
    };
    const expectedAction = {
      type: constants.ADD_LIST,
      payload,
    };

    expect(actions.addList(payload)).toEqual(expectedAction)
  });

  it('creates EDIT_LIST_TITLE when list title has been changed', () => {
    const payload = {
      listTitle: 'Test list',
      listId: 'Test list ID'
    };
    const expectedAction = {
      type: constants.EDIT_LIST_TITLE,
      payload: payload,
    };

    expect(actions.editListTitle(payload)).toEqual(expectedAction)
  });

  it('creates DELETE_LIST when list is successfully deleted', () => {
    const payload = {
      listId: 'Test list ID',
      cardId: 'Test card ID',
    };
    const expectedAction = {
      type: constants.DELETE_LIST,
      payload: payload,
    };

    expect(actions.deleteList(payload)).toEqual(expectedAction)
  });

  it('creates DELETE_ALL_CARDS when all cards are successfully deleted', () => {
    const payload = {
      listId: 'Test list ID',
    };
    const expectedAction = {
      type: constants.DELETE_ALL_CARDS,
      payload: payload,
    };

    expect(actions.deleteAllCards(payload)).toEqual(expectedAction)
  });

  it('creates MOVE_CARD when card is successfully moved', () => {
    const payload = {
      sourceIndex: 0,
      sourceListIndex: 0,
      destinationIndex: 1,
      destinationListIndex: 1,
    };
    const expectedAction = {
      type: constants.MOVE_CARD,
      payload: payload,
    };

    expect(actions.moveCard(payload)).toEqual(expectedAction)
  });

  it('creates MOVE_ALL_CARDS when all cards moved to another list', () => {
    const payload = {
      listId: 'Test list ID',
      newListId: 'New list ID',
    };
    const expectedAction = {
      type: constants.MOVE_ALL_CARDS,
      payload: payload,
    };

    expect(actions.moveAllCards(payload)).toEqual(expectedAction)
  });
});
