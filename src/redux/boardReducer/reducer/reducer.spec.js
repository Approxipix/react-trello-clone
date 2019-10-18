import boardReducer from './reducer'
import * as t from '../../constants';

describe('boardReducer', () => {
  it('should return the initial state', () => {
    expect(boardReducer(undefined, {})).toStrictEqual({})
  });

  it('should handle RESPONSE_BOARDS_SUCCESS action', () => {
    const fetchBoards = {
      boards: {
        Board1ID: {
          _boardId: 'Board1ID',
          title: 'Board1 Title',
          color: '#af2232',
          lists: [],
        },
        Board2ID: {
          _boardId: 'Board2ID',
          title: 'Board2 Title',
          color: '#af2232',
          lists: [],
        }
      }
    };
    const action = {
      type: t.RESPONSE_BOARDS_SUCCESS,
      payload: fetchBoards
    };
    const expectedState = fetchBoards.boards;

    expect(boardReducer(undefined, action)).toEqual(expectedState)
  });

  it('should handle ADD_BOARD action', () => {
    const action = {
      type: t.ADD_BOARD,
      payload: {
        boardId: 'BoardID',
        boardTitle: 'Board Title',
        boardColor: '#af2232',
      }
    };
    const expectedState = {
      BoardID: {
        _boardId: 'BoardID',
        title: 'Board Title',
        color: '#af2232',
        lists: [],
      }
    };

    expect(boardReducer(undefined, action)).toEqual(expectedState)
  });

  it('should handle EDIT_BOARD_COLOR action', () => {
    const initialState = {
      BoardID: {
        _boardId: 'BoardID',
        color: '#fff',
      }
    };
    const action = {
      type: t.EDIT_BOARD_COLOR,
      payload: {
        boardId: 'BoardID',
        boardColor: '#000'
      }
    };
    const expectedState = {
      BoardID: {
        _boardId: 'BoardID',
        color: '#000',
      }
    };

    expect(boardReducer(initialState, action)).toEqual(expectedState)
  });

  it('should handle EDIT_BOARD_TITLE action', () => {
    const initialState = {
      BoardID: {
        _boardId: 'BoardID',
        title: 'Board Title',
      }
    };
    const action = {
      type: t.EDIT_BOARD_TITLE,
      payload: {
        boardId: 'BoardID',
        boardTitle: 'New Board Title'
      }
    };
    const expectedState = {
      BoardID: {
        _boardId: 'BoardID',
        title: 'New Board Title',
      }
    };

    expect(boardReducer(initialState, action)).toEqual(expectedState)
  });

  it('should handle DELETE_BOARD action', () => {
    const initialState = {
      Board1ID: {
        _boardId: 'Board1ID',
      },
      Board2ID: {
        _boardId: 'Board2ID',
      }
    };
    const action = {
      type: t.DELETE_BOARD,
      payload: {
        boardId: 'Board1ID'
      }
    };
    const expectedState = {
      Board2ID: {
        _boardId: 'Board2ID',
      }
    };

    expect(boardReducer(initialState, action)).toEqual(expectedState)
  });

  it('should handle MOVE_LIST action', () => {
    const initialState = {
      Board1ID: {
        _boardId: 'Board1ID',
        lists: ['List1ID', 'List2ID', 'List3ID'],
      },
    };
    const action = {
      type: t.MOVE_LIST,
      payload: {
        boardId: 'Board1ID',
        sourceIndex: 2,
        destinationIndex: 0,
      }
    };
    const expectedState = {
      Board1ID: {
        _boardId: 'Board1ID',
        lists: ['List3ID', 'List1ID', 'List2ID'],
      },
    };

    expect(boardReducer(initialState, action)).toEqual(expectedState)
  });

  it('should handle MOVE_LIST_TO_ANOTHER_BOARD action', () => {
    const initialState = {
      Board1ID: {
        _boardId: 'Board1ID',
        lists: ['Board1List1ID', 'Board1List2ID'],
      },
      Board2ID: {
        _boardId: 'Board2ID',
        lists: ['Board2List1ID', 'Board2List2ID', 'Board2List3ID'],
      },
    };
    const action = {
      type: t.MOVE_LIST_TO_ANOTHER_BOARD,
      payload: {
        boardId: 'Board2ID',
        newBoardId: 'Board1ID',
        listId: 'Board2List2ID',
        newListPosition: 0,
      }
    };
    const expectedState = {
      'Board1ID': {
        _boardId: 'Board1ID',
        lists: ['Board2List2ID', 'Board1List1ID', 'Board1List2ID'],
      },
      'Board2ID': {
        _boardId: 'Board2ID',
        lists: ['Board2List1ID', 'Board2List3ID'],
      },
    };

    expect(boardReducer(initialState, action)).toEqual(expectedState)
  });

  it('should handle ADD_LIST action', () => {
    const initialState = {
      BoardID: {
        _boardId: 'BoardID',
        lists: ['List1ID', 'List2ID'],
      }
    };
    const action = {
      type: t.ADD_LIST,
      payload: {
        boardId: 'BoardID',
        listId: 'New ListID',
      }
    };
    const expectedState = {
      BoardID: {
        _boardId: 'BoardID',
        lists: ['List1ID', 'List2ID', 'New ListID'],
      }
    };

    expect(boardReducer(initialState, action)).toEqual(expectedState)
  });

  it('should handle DELETE_LIST action', () => {
    const initialState = {
      BoardID: {
        _boardId: 'BoardID',
        lists: ['List1ID', 'List2ID', 'List3ID'],
      }
    };
    const action = {
      type: t.DELETE_LIST,
      payload: {
        boardId: 'BoardID',
        listId: 'List2ID',
      }
    };
    const expectedState = {
      BoardID: {
        _boardId: 'BoardID',
        lists: ['List1ID', 'List3ID'],
      }
    };

    expect(boardReducer(initialState, action)).toEqual(expectedState)
  });
});
