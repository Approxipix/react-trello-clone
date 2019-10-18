import * as actions from './actions';
import * as t from '../constants/constants';

describe('rootReducer actions', () => {
  it('creates REQUEST_BOARDS when a random fact fetch has started', () => {
    const expectedAction = {
      type: t.REQUEST_BOARDS,
    };

    expect(actions.requestBoards()).toEqual(expectedAction)
  });

  it('creates RESPONSE_BOARDS_SUCCESS for a successful fetch of a boards', () => {
    const payload = {};
    const expectedAction = {
      type: t.RESPONSE_BOARDS_SUCCESS,
      payload,
    };

    expect(actions.responseBoardsSuccess(payload)).toEqual(expectedAction)
  });

  it('creates SET_CURRENT_BOARD_ID when user moved to the board page', () => {
    const boardId = 'Board ID';
    const expectedAction = {
      type: t.SET_CURRENT_BOARD_ID,
      payload: boardId,
    };

    expect(actions.setCurrentBoardID(boardId)).toEqual(expectedAction)
  });

  it('creates TOGGLE_SIDEBAR when sidebar has been toggled', () => {
    const payload = true;
    const expectedAction = {
      type: t.TOGGLE_SIDEBAR,
      payload: payload,
    };

    expect(actions.toggleSidebar(payload)).toEqual(expectedAction)
  });
});
