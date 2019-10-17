import * as actions from './actions';
import * as t from '../constants/constants';

describe('rootReducer actions', () => {
  it('creates ADD_ENTITIES when boards data has benn successfully loaded', () => {
    const payload = {
      boards: {},
      lists: {},
      cards: {},
      checkLists: {},
    };
    const expectedAction = {
      type: t.ADD_ENTITIES,
      payload,
    };

    expect(actions.addEntities(payload)).toEqual(expectedAction)
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
    const payload = false;
    const expectedAction = {
      type: t.TOGGLE_SIDEBAR,
      payload: payload,
    };

    expect(actions.toggleSidebar(payload)).toEqual(expectedAction)
  });
});
