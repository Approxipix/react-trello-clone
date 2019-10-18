import cardReducer from './reducer'
import * as t from '../../constants';

describe('cardReducer', () => {
  it('should return the initial state', () => {
    expect(cardReducer(undefined, {})).toStrictEqual({})
  });

  it('should handle RESPONSE_BOARDS_SUCCESS action', () => {
    const fetchCards = {
      cards: {
        Card1: {
          _cardId: 'Card1ID',
          title: 'Card1 Title',
          description: 'Card1 Description',
          cardLabels: [],
          checkLists: [],
        },
        Card2: {
          _cardId: 'Card2ID',
          title: 'Card2 Title',
          description: 'Card2 Description',
          cardLabels: [],
          checkLists: [],
        }
      }
    };
    const action = {
      type: t.RESPONSE_BOARDS_SUCCESS,
      payload: fetchCards
    };
    const expectedState = fetchCards.cards;

    expect(cardReducer(undefined, action)).toEqual(expectedState)
  });

  it('should handle ADD_CARD action', () => {
    const action = {
      type: t.ADD_CARD,
      payload: {
        newCardId: 'CardID',
        cardTitle: 'Card Title',
      }
    };
    const expectedState = {
      CardID: {
        _cardId: 'CardID',
        title: 'Card Title',
        description: '',
        cardLabels: [],
        checkLists: [],
      }
    };

    expect(cardReducer(undefined, action)).toEqual(expectedState)
  });

  describe('should handle ADD_LABEL_TO_CARD action', () => {
    it('when label does not exist', () => {
      const label = {
        _labelId: 0,
        color: '#61BC4F',
      };
      const initialState = {
        CardID: {
          _cardId: 'CardID',
          cardLabels: [],
        }
      };
      const action = {
        type: t.ADD_LABEL_TO_CARD,
        payload: {
          cardId: 'CardID',
          cardLabel: label
        }
      };
      const expectedState = {
        CardID: {
          _cardId: 'CardID',
          cardLabels: [ label ],
        }
      };

      expect(cardReducer(initialState, action)).toEqual(expectedState)
    });

    it('when label exist', () => {
      const label = {
        _labelId: 0,
        color: '#61BC4F',
      };
      const initialState = {
        CardID: {
          _cardId: 'CardID',
          cardLabels: [ label ],
        }
      };
      const action = {
        type: t.ADD_LABEL_TO_CARD,
        payload: {
          cardId: 'CardID',
          cardLabel: label
        }
      };
      const expectedState = {
        CardID: {
          _cardId: 'CardID',
          cardLabels: [],
        }
      };

      expect(cardReducer(initialState, action)).toEqual(expectedState)
    });
  });

  it('should handle EDIT_CARD_TITLE action', () => {
    const initialState = {
      CardID: {
        _cardId: 'CardID',
        title: 'Card Title',
      }
    };
    const action = {
      type: t.EDIT_CARD_TITLE,
      payload: {
        cardId: 'CardID',
        cardTitle: 'New Card Title',
      }
    };
    const expectedState = {
      CardID: {
        _cardId: 'CardID',
        title: 'New Card Title',
      }
    };

    expect(cardReducer(initialState, action)).toEqual(expectedState)
  });

  it('should handle EDIT_CARD_DESCRIPTION action', () => {
    const initialState = {
      CardID: {
        _cardId: 'CardID',
        description: 'Card Description',
      }
    };
    const action = {
      type: t.EDIT_CARD_DESCRIPTION,
      payload: {
        cardId: 'CardID',
        cardDescription: 'New Card Description',
      }
    };
    const expectedState = {
      CardID: {
        _cardId: 'CardID',
        description: 'New Card Description',
      }
    };

    expect(cardReducer(initialState, action)).toEqual(expectedState)
  });

  it('should handle DELETE_CARD action', () => {
    const initialState = {
      Card1ID: {
        _cardId: 'Card1ID',
        title: 'Card1 Title',
      },
      Card2ID: {
        _cardId: 'Card2ID',
        title: 'Card2 Title',
      }
    };
    const action = {
      type: t.DELETE_CARD,
      payload: {
        cardId: 'Card2ID'
      }
    };
    const expectedState = {
      Card1ID: {
        _cardId: 'Card1ID',
        title: 'Card1 Title',
      }
    };

    expect(cardReducer(initialState, action)).toEqual(expectedState)
  });

  it('should handle ADD_CHECKLIST action', () => {
    const initialState = {
      CardID: {
        _cardId: 'CardID',
        checkLists: [ 'CheckList1ID' ],
      },
    };
    const action = {
      type: t.ADD_CHECKLIST,
      payload: {
        cardId: 'CardID',
        checkListId: 'New CheckListID'
      }
    };
    const expectedState = {
      CardID: {
        _cardId: 'CardID',
        checkLists: [ 'CheckList1ID', 'New CheckListID' ],
      },
    };

    expect(cardReducer(initialState, action)).toEqual(expectedState)
  });

  it('should handle DELETE_CHECKLIST action', () => {
    const initialState = {
      CardID: {
        _cardId: 'CardID',
        checkLists: [ 'CheckList1ID', 'CheckList2ID', 'CheckList3ID' ],
      },
    };
    const action = {
      type: t.DELETE_CHECKLIST,
      payload: {
        cardId: 'CardID',
        checkListId: 'CheckList2ID'
      }
    };
    const expectedState = {
      CardID: {
        _cardId: 'CardID',
        checkLists: [ 'CheckList1ID', 'CheckList3ID' ],
      },
    };

    expect(cardReducer(initialState, action)).toEqual(expectedState)
  });
});
