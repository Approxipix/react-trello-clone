import checkListReducer from './reducer'
import * as t from '../../constants';

describe('cardReducer', () => {
  it('should return the initial state', () => {
    expect(checkListReducer(undefined, {})).toStrictEqual({})
  });

  it('should handle RESPONSE_BOARDS_SUCCESS action', () => {
    const fetchCheckLists = {
      checkLists: {
        CheckList1: {
          _checkListId: 'CheckList1',
          title: 'Checklist1 Title',
          items: []
        },
        CheckList2: {
          _checkListId: 'CheckList2',
          title: 'Checklist2 Title',
          items: []
        }
      }
    };
    const action = {
      type: t.RESPONSE_BOARDS_SUCCESS,
      payload: fetchCheckLists
    };
    const expectedState = fetchCheckLists.checkLists;

    expect(checkListReducer(undefined, action)).toEqual(expectedState)
  });

  it('should handle ADD_CHECKLIST action', () => {
    const action = {
      type: t.ADD_CHECKLIST,
      payload: {
        checkListId: 'CheckListID',
        checkListTitle: 'CheckList Title'
      }
    };
    const expectedState = {
      CheckListID: {
        _checkListId: 'CheckListID',
        title: 'CheckList Title',
        items: []
      }
    };

    expect(checkListReducer(undefined, action)).toEqual(expectedState)
  });

  it('should handle ADD_CHECKLIST_ITEM action', () => {
    const initialState = {
      CheckListID: {
        _checkListId: 'CheckListID',
        items: []
      }
    };
    const action = {
      type: t.ADD_CHECKLIST_ITEM,
      payload: {
        checkListId: 'CheckListID',
        checkListTitle: 'CheckList Item Title',
      }
    };
    const expectedState = {
      CheckListID: {
        _checkListId: 'CheckListID',
        items: [
          {
            description: 'CheckList Item Title',
            status: false
          }
        ]
      }
    };

    expect(checkListReducer(initialState, action)).toEqual(expectedState)
  });

  it('should handle EDIT_CHECKLIST_TITLE action', () => {
    const initialState = {
      CheckListID: {
        _checkListId: 'CheckListID',
        title: 'CheckList Title'
      }
    };
    const action = {
      type: t.EDIT_CHECKLIST_TITLE,
      payload: {
        checkListId: 'CheckListID',
        checkListTitle: 'New CheckList Title',
      }
    };
    const expectedState = {
      CheckListID: {
        _checkListId: 'CheckListID',
        title: 'New CheckList Title'
      }
    };

    expect(checkListReducer(initialState, action)).toEqual(expectedState)
  });

  it('should handle UPDATE_CHECKLIST_ITEM action', () => {
    const initialState = {
      CheckListID: {
        _checkListId: 'CheckListID',
        items: [
          { description: 'CheckList Item1 Title', status: false },
          { description: 'CheckList Item2 Title', status: false },
        ]
      }
    };
    const action = {
      type: t.UPDATE_CHECKLIST_ITEM,
      payload: {
        checkListId: 'CheckListID',
        checkListItemIndex: 1,
        status: true,
      }
    };
    const expectedState = {
      CheckListID: {
        _checkListId: 'CheckListID',
        items: [
          { description: 'CheckList Item1 Title', status: false },
          { description: 'CheckList Item2 Title', status: true },
        ]
      }
    };

    expect(checkListReducer(initialState, action)).toEqual(expectedState)
  });

  it('should handle DELETE_CHECKLIST action', () => {
    const initialState = {
      CheckList1ID: {
        _checkListId: 'CheckList1ID',
        items: []
      },
      CheckList2ID: {
        _checkListId: 'CheckList2ID',
        items: []
      }
    };
    const action = {
      type: t.DELETE_CHECKLIST,
      payload: {
        checkListId: 'CheckList2ID',
      }
    };
    const expectedState = {
      CheckList1ID: {
        _checkListId: 'CheckList1ID',
        items: []
      }
    };

    expect(checkListReducer(initialState, action)).toEqual(expectedState)
  });

  it('should handle DELETE_CHECKLIST_ITEM action', () => {
    const initialState = {
      CheckListID: {
        _checkListId: 'CheckListID',
        items: [
          { description: 'CheckList Item1 Title', status: false },
          { description: 'CheckList Item2 Title', status: true },
        ]
      }
    };
    const action = {
      type: t.DELETE_CHECKLIST_ITEM,
      payload: {
        checkListId: 'CheckListID',
        checkListItemIndex: 1,
      }
    };
    const expectedState = {
      CheckListID: {
        _checkListId: 'CheckListID',
        items: [
          { description: 'CheckList Item1 Title', status: false },
        ]
      }
    };

    expect(checkListReducer(initialState, action)).toEqual(expectedState)
  });
});
