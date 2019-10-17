import rootReducer, { initialState } from './reducer'
import * as t from '../constants/constants';

describe('rootReducer', () => {
  it('should return the initial state', () => {
    expect(rootReducer(undefined, {})).toBe(initialState)
  });

  it('should handle SET_CURRENT_BOARD_ID action', () => {
    const action = {
      type: t.SET_CURRENT_BOARD_ID,
      payload: 'Board ID'
    };
    const expectedState = {
      ...initialState,
      currentBoardID: 'Board ID'
    };

    expect(rootReducer(initialState, action)).toEqual(expectedState)
  });

  it('should handle TOGGLE_SIDEBAR action', () => {
    const action = {
      type: t.TOGGLE_SIDEBAR
    };
    const expectedState = {
      ...initialState,
      isSidebarOpened: true
    };

    expect(rootReducer(initialState, action)).toEqual(expectedState)
  });
});
