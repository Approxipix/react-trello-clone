import cardReducer from './reducer'
import * as t from '../constants/constants';

describe('cardReducer', () => {
  let initialState;
  let mockCardId;

  beforeEach(() => {
    mockCardId = 'CardId';
    initialState = {
      [mockCardId]: {
        _cardId: mockCardId,
        title: 'Card title',
        description: 'Card description',
        cardLabels: [],
        checkLists: [],
      }
    };
  });

  it('should return the initial state', () => {
    expect(cardReducer(undefined, {})).toStrictEqual({})
  });

  it('should handle ADD_ENTITIES action', () => {
    const fetchCards = {
      cards: {
        Card1: {
          _cardId: 'Card1',
          title: 'Card1 title',
          description: 'Card1 description',
          cardLabels: [],
          checkLists: [],
        },
        Card2: {
          _cardId: 'Card2',
          title: 'Card2 title',
          description: 'Card2 description',
          cardLabels: [],
          checkLists: [],
        }
      }
    };
    const action = {
      type: 'ADD_ENTITIES',
      payload: fetchCards
    };
    const expectedState = {
      ...initialState,
      ...fetchCards.cards,
    };

    expect(cardReducer(initialState, action)).toEqual(expectedState)
  });

  it('should handle ADD_CARD action', () => {
    const mockCardId = 'New Card ID';
    const action = {
      type: t.ADD_CARD,
      payload: {
        listId: 'List ID',
        cardTitle: 'New Card title',
        newCardId: mockCardId,
      }
    };
    const expectedState = {
      ...initialState,
      [mockCardId]: {
        _cardId: mockCardId,
        title: 'New Card title',
        description: '',
        cardLabels: [],
        checkLists: [],
      }
    };

    expect(cardReducer(initialState, action)).toEqual(expectedState)
  });

  it('should handle ADD_LABEL_TO_CARD action', () => {
    const action = {
      type: t.ADD_LABEL_TO_CARD,
      payload: {
        cardId: mockCardId,
        cardLabel: {
          _labelId: 0,
          color: '#61BC4F',
        }
      }
    };
    const expectedState = {
      ...initialState,
      [mockCardId]: {
        ...initialState[mockCardId],
        cardLabels: [{
          _labelId: 0,
          color: '#61BC4F',
        }],
      }
    };

    expect(cardReducer(initialState, action)).toEqual(expectedState)
  });

  it('should handle EDIT_CARD_TITLE action', () => {
    const action = {
      type: t.EDIT_CARD_TITLE,
      payload: {
        cardId: mockCardId,
        cardTitle: 'New card title',
      }
    };
    const expectedState = {
      ...initialState,
      [mockCardId]: {
        ...initialState[mockCardId],
        title: 'New card title',
      }
    };

    expect(cardReducer(initialState, action)).toEqual(expectedState)
  });

  it('should handle EDIT_CARD_DESCRIPTION action', () => {
    const action = {
      type: t.EDIT_CARD_DESCRIPTION,
      payload: {
        cardId: mockCardId,
        cardDescription: 'New card description',
      }
    };
    const expectedState = {
      ...initialState,
      [mockCardId]: {
        ...initialState[mockCardId],
        description: 'New card description',
      }
    };

    expect(cardReducer(initialState, action)).toEqual(expectedState)
  });

  it('should handle DELETE_CARD action', () => {
    const action = {
      type: t.DELETE_CARD,
      payload: {
        cardId: mockCardId
      }
    };
    const expectedState = {};

    expect(cardReducer(initialState, action)).toEqual(expectedState)
  });
});
