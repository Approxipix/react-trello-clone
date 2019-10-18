import * as actions from './actions';
import * as t from '../../constants';

describe('listReducer actions', () => {
  it('creates ADD_LIST when list is successfully added', () => {
    const payload = {
      boardId: 'BoardID',
      listId: 'ListID',
      listTitle: 'List Title',
    };
    const expectedAction = {
      type: t.ADD_LIST,
      payload,
    };

    expect(actions.addList(payload)).toEqual(expectedAction)
  });

  it('creates EDIT_LIST_TITLE when list title has been changed', () => {
    const payload = {
      listTitle: 'List Title',
      listId: 'ListID'
    };
    const expectedAction = {
      type: t.EDIT_LIST_TITLE,
      payload: payload,
    };

    expect(actions.editListTitle(payload)).toEqual(expectedAction)
  });

  it('creates DELETE_LIST when list is successfully deleted', () => {
    const payload = {
      listId: 'ListID',
      cardId: 'CardId',
    };
    const expectedAction = {
      type: t.DELETE_LIST,
      payload: payload,
    };

    expect(actions.deleteList(payload)).toEqual(expectedAction)
  });

  it('creates DELETE_ALL_CARDS when all cards are successfully deleted', () => {
    const payload = {
      listId: 'ListId',
    };
    const expectedAction = {
      type: t.DELETE_ALL_CARDS,
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
      type: t.MOVE_CARD,
      payload: payload,
    };

    expect(actions.moveCard(payload)).toEqual(expectedAction)
  });

  it('creates MOVE_ALL_CARDS when all cards moved to another list', () => {
    const payload = {
      listId: 'ListID',
      newListId: 'New ListID',
    };
    const expectedAction = {
      type: t.MOVE_ALL_CARDS,
      payload: payload,
    };

    expect(actions.moveAllCards(payload)).toEqual(expectedAction)
  });
});
