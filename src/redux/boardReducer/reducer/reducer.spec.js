import boardReducer from './reducer'
import * as t from '../constants/constants';

describe('boardReducer', () => {
  let initialState;
  let mockBoardId;

  beforeEach(() => {
    mockBoardId = 'BoardId';
    initialState = {
      [mockBoardId]: {
        _boardId: mockBoardId,
        title: 'Board title',
        color: '#af2232',
        lists: ['List 1 ID', 'List 2 ID', 'List 3 ID'],
      }
    };
  });

  it('should return the initial state', () => {
    expect(boardReducer(undefined, {})).toStrictEqual({})
  });

  it('should handle ADD_BOARD action', () => {
    const mockBoardId = 'New Board ID';
    const action = {
      type: t.ADD_BOARD,
      payload: {
        boardId: mockBoardId,
        boardTitle: 'New Board title',
        boardColor: '#af2232',
      }
    };
    const expectedState = {
      ...initialState,
      [mockBoardId]: {
        _boardId: mockBoardId,
        title: 'New Board title',
        color: '#af2232',
        lists: [],
      }
    };

    expect(boardReducer(initialState, action)).toEqual(expectedState)
  });

  it('should handle EDIT_BOARD_COLOR action', () => {
    const action = {
      type: t.EDIT_BOARD_COLOR,
      payload: {
        boardId: mockBoardId,
        boardColor: '#2dff92'
      }
    };
    const expectedState = {
      ...initialState,
      [mockBoardId]: {
        ...initialState[mockBoardId],
        color: '#2dff92',
      }
    };

    expect(boardReducer(initialState, action)).toEqual(expectedState)
  });

  it('should handle EDIT_BOARD_TITLE action', () => {
    const action = {
      type: t.EDIT_BOARD_TITLE,
      payload: {
        boardId: mockBoardId,
        boardTitle: 'New board title'
      }
    };
    const expectedState = {
      ...initialState,
      [mockBoardId]: {
        ...initialState[mockBoardId],
        title: 'New board title',
      }
    };

    expect(boardReducer(initialState, action)).toEqual(expectedState)
  });

  it('should handle DELETE_BOARD action', () => {
    const action = {
      type: t.DELETE_BOARD,
      payload: {
        boardId: mockBoardId
      }
    };
    const expectedState = {};

    expect(boardReducer(initialState, action)).toEqual(expectedState)
  });

  it('should handle MOVE_LIST action', () => {
    const action = {
      type: t.MOVE_LIST,
      payload: {
        boardId: mockBoardId,
        sourceIndex: initialState[mockBoardId].lists.length - 1,
        destinationIndex: 0,
      }
    };
    const expectedState = {
      ...initialState,
      [mockBoardId]: {
        ...initialState[mockBoardId],
        lists: ['List 3 ID', 'List 1 ID', 'List 2 ID'],
      },
    };

    expect(boardReducer(initialState, action)).toEqual(expectedState)
  });

  it('should handle MOVE_LIST_TO_ANOTHER_BOARD action', () => {
    const initialState = {
      Board1ID: {
        _boardId: 'Board1ID',
        lists: ['Board1List1', 'Board1List2'],
      },
      Board2ID: {
        _boardId: 'Board2ID',
        lists: ['Board2List1', 'Board2List2ID', 'Board2List3'],
      },
    };
    const action = {
      type: t.MOVE_LIST_TO_ANOTHER_BOARD,
      payload: {
        boardId: initialState.Board2ID._boardId,
        newBoardId: initialState.Board1ID._boardId,
        listId: 'Board2List2ID',
        newListPosition: 0,
      }
    };
    const expectedState = {
      'Board1ID': {
        _boardId: 'Board1ID',
        lists: ['Board2List2ID', 'Board1List1', 'Board1List2'],
      },
      'Board2ID': {
        _boardId: 'Board2ID',
        lists: ['Board2List1', 'Board2List3'],
      },
    };

    expect(boardReducer(initialState, action)).toEqual(expectedState)
  });
});
