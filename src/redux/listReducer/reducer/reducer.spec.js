import listReducer from './reducer'
import * as t from '../../constants';

describe('listReducer', () => {
  it('should return the initial state', () => {
    expect(listReducer(undefined, {})).toStrictEqual({})
  });

  it('should handle RESPONSE_BOARDS_SUCCESS action', () => {
    const fetchLists = {
      lists: {
        List1: {
          _listId: 'List1ID',
          title: 'List1 Title',
          cards: []
        },
        List2: {
          _listId: 'List2ID',
          title: 'List2 Title',
          cards: []
        },
      }
    };
    const action = {
      type: t.RESPONSE_BOARDS_SUCCESS,
      payload: fetchLists
    };
    const expectedState = fetchLists.lists;

    expect(listReducer(undefined, action)).toEqual(expectedState)
  });

  it('should handle ADD_LIST action', () => {
    const action = {
      type: t.ADD_LIST,
      payload: {
        listId: 'ListID',
        listTitle: 'List Title',
      }
    };
    const expectedState = {
      ListID: {
        _listId: 'ListID',
        title: 'List Title',
        cards: [],
      }
    };

    expect(listReducer(undefined, action)).toEqual(expectedState)
  });

  it('should handle EDIT_LIST_TITLE action', () => {
    const initialState = {
      ListID: {
        _listId: 'ListID',
        title: 'List Title',
      }
    };
    const action = {
      type: t.EDIT_LIST_TITLE,
      payload: {
        listId: 'ListID',
        listTitle: 'New List Title'
      }
    };
    const expectedState = {
      ListID: {
        _listId: 'ListID',
        title: 'New List Title',
      }
    };

    expect(listReducer(initialState, action)).toEqual(expectedState)
  });

  it('should handle DELETE_LIST action', () => {
    const initialState = {
      List1ID: {
        _listId: 'List1ID',
      },
      List2ID: {
        _listId: 'List2ID',
      }
    };
    const action = {
      type: t.DELETE_LIST,
      payload: {
        listId: 'List2ID'
      }
    };
    const expectedState = {
      List1ID: {
        _listId: 'List1ID',
      },
    };

    expect(listReducer(initialState, action)).toEqual(expectedState)
  });

  it('should handle DELETE_ALL_CARDS action', () => {
    const initialState = {
      List1ID: {
        _listId: 'List1ID',
        cards: ['Card1ID', 'Card2ID', 'Card3ID']
      },
    };
    const action = {
      type: t.DELETE_ALL_CARDS,
      payload: {
        listId: 'List1ID'
      }
    };
    const expectedState = {
      List1ID: {
        _listId: 'List1ID',
        cards: []
      },
    };

    expect(listReducer(initialState, action)).toEqual(expectedState)
  });

  it('should handle ADD_CARD action', () => {
    const initialState = {
      List1ID: {
        _listId: 'List1ID',
        cards: ['Card1ID', 'Card2ID']
      },
    };
    const action = {
      type: t.ADD_CARD,
      payload: {
        listId: 'List1ID',
        newCardId: 'New CardID',
      }
    };
    const expectedState = {
      List1ID: {
        _listId: 'List1ID',
        cards: ['Card1ID', 'Card2ID', 'New CardID']
      },
    };

    expect(listReducer(initialState, action)).toEqual(expectedState)
  });

  it('should handle DELETE_CARD action', () => {
    const initialState = {
      List1ID: {
        _listId: 'List1ID',
        cards: ['Card1ID', 'Card2ID', 'Card3ID']
      },
    };
    const action = {
      type: t.DELETE_CARD,
      payload: {
        listId: 'List1ID',
        cardId: 'Card2ID',
      }
    };
    const expectedState = {
      List1ID: {
        _listId: 'List1ID',
        cards: ['Card1ID', 'Card3ID']
      },
    };

    expect(listReducer(initialState, action)).toEqual(expectedState)
  });
});
