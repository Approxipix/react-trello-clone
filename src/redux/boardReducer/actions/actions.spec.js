import * as actions from './actions';
import * as constants from '../constants/constants';

describe('boardReducer actions', () => {
  it('creates ADD_BOARD when board is successfully added', () => {
    const payload = {
      boardTitle: 'New Board Title',
      boardColor: '#af2232',
      boardId: 'New BoardID',
    };
    const expectedAction = {
      type: constants.ADD_BOARD,
      payload,
    };

    expect(actions.addBoard(payload)).toEqual(expectedAction)
  });

  it('creates EDIT_BOARD_COLOR when board color has been changed', () => {
    const payload = {
      boardId: 'BoardID',
      boardColor: '#2dff92'
    };
    const expectedAction = {
      type: constants.EDIT_BOARD_COLOR,
      payload: payload,
    };

    expect(actions.editBoardColor(payload)).toEqual(expectedAction)
  });

  it('creates EDIT_BOARD_TITLE when board title has been changed', () => {
    const payload = {
      boardId: 'BoardID',
      boardTitle: 'New Board Title'
    };
    const expectedAction = {
      type: constants.EDIT_BOARD_TITLE,
      payload: payload,
    };

    expect(actions.editBoardTitle(payload)).toEqual(expectedAction)
  });

  it('creates DELETE_BOARD when board is successfully deleted', () => {
    const payload = {
      boardId: 'BoardID',
    };
    const expectedAction = {
      type: constants.DELETE_BOARD,
      payload: payload,
    };

    expect(actions.deleteBoard(payload)).toEqual(expectedAction)
  });

  it('creates MOVE_LIST when list is successfully moved', () => {
    const payload = {
      boardId: 'BoardID',
      sourceIndex: 0,
      destinationIndex: 1,
    };
    const expectedAction = {
      type: constants.MOVE_LIST,
      payload: payload,
    };

    expect(actions.moveList(payload)).toEqual(expectedAction)
  });

  it('creates MOVE_LIST_TO_ANOTHER_BOARD when list moved to another board', () => {
    const payload = {
      boardId: 'BoardID',
      newBoardId: 'New BoardID',
      listId: 'ListID',
      newListPosition: 0,
    };
    const expectedAction = {
      type: constants.MOVE_LIST_TO_ANOTHER_BOARD,
      payload: payload,
    };

    expect(actions.moveListToAnotherBoard(payload)).toEqual(expectedAction)
  });
});
