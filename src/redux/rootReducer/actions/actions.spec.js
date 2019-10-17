import * as actions from './actions';
import * as constants from '../constants/constants';

describe('rootReducer actions', () => {
  it('creates SET_CURRENT_BOARD_ID when user moved to the board page', () => {
    const boardId = 'Board ID';
    const expectedAction = {
      type: constants.SET_CURRENT_BOARD_ID,
      payload: boardId,
    };

    expect(actions.setCurrentBoardID(boardId)).toEqual(expectedAction)
  });

  it('creates TOGGLE_SIDEBAR when sidebar has been toggled', () => {
    const payload = false;
    const expectedAction = {
      type: constants.TOGGLE_SIDEBAR,
      payload: payload,
    };

    expect(actions.toggleSidebar(payload)).toEqual(expectedAction)
  });
});
