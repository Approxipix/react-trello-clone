import * as actions from './actions';
import * as t from '../../constants';

describe('cardReducer actions', () => {
  it('creates ADD_CARD when card is successfully added', () => {
    const payload = {
      listId: 'ListID',
      cardTitle: 'Card Title',
      newCardId: 'CardID',
    };
    const expectedAction = {
      type: t.ADD_CARD,
      payload,
    };

    expect(actions.addCard(payload)).toEqual(expectedAction)
  });

  it('creates ADD_LABEL_TO_CARD when label successfully added to a card', () => {
    const payload = {
      cardId: 'CardID',
      cardLabel: {
        _labelId: 0,
        color: '#61BC4F',
      }
    };
    const expectedAction = {
      type: t.ADD_LABEL_TO_CARD,
      payload,
    };

    expect(actions.addLabelToCard(payload)).toEqual(expectedAction)
  });

  it('creates EDIT_CARD_TITLE when card title has been changed', () => {
    const payload = {
      cardId: 'CardID',
      cardTitle: 'New Card Title',
    };
    const expectedAction = {
      type: t.EDIT_CARD_TITLE,
      payload: payload,
    };

    expect(actions.editCardTitle(payload)).toEqual(expectedAction)
  });

  it('creates EDIT_CARD_DESCRIPTION when card description has been changed', () => {
    const payload = {
      cardId: 'CardID',
      cardDescription: 'New Card Description',
    };
    const expectedAction = {
      type: t.EDIT_CARD_DESCRIPTION,
      payload: payload,
    };

    expect(actions.editCardDesc(payload)).toEqual(expectedAction)
  });

  it('creates DELETE_CARD when card is successfully deleted', () => {
    const payload = {
      listId: 'ListID',
      cardId: 'CardID',
    };
    const expectedAction = {
      type: t.DELETE_CARD,
      payload: payload,
    };

    expect(actions.deleteCard(payload)).toEqual(expectedAction)
  });
});
