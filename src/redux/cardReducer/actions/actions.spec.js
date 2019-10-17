import * as actions from './actions';
import * as constants from '../constants/constants';

describe('cardReducer actions', () => {
  it('creates ADD_CARD when card is successfully added', () => {
    const payload = {
      listId: 'List ID',
      cardTitle: 'Card title',
      newCardId: 'Card ID',
    };
    const expectedAction = {
      type: constants.ADD_CARD,
      payload,
    };

    expect(actions.addCard(payload)).toEqual(expectedAction)
  });

  it('creates ADD_LABEL_TO_CARD when label successfully added to a card', () => {
    const payload = {
      cardId: 'Card ID',
      cardLabel: {
        _labelId: 0,
        color: '#61BC4F',
      }
    };
    const expectedAction = {
      type: constants.ADD_LABEL_TO_CARD,
      payload,
    };

    expect(actions.addLabelToCard(payload)).toEqual(expectedAction)
  });

  it('creates EDIT_CARD_TITLE when card title has been changed', () => {
    const payload = {
      cardId: 'Card ID',
      cardTitle: 'New card title',
    };
    const expectedAction = {
      type: constants.EDIT_CARD_TITLE,
      payload: payload,
    };

    expect(actions.editCardTitle(payload)).toEqual(expectedAction)
  });

  it('creates EDIT_CARD_DESC when card description has been changed', () => {
    const payload = {
      cardId: 'Card ID',
      cardDescription: 'New card description',
    };
    const expectedAction = {
      type: constants.EDIT_CARD_DESC,
      payload: payload,
    };

    expect(actions.editCardDesc(payload)).toEqual(expectedAction)
  });

  it('creates DELETE_CARD when card is successfully deleted', () => {
    const payload = {
      listId: 'List ID',
      cardId: 'Card ID',
    };
    const expectedAction = {
      type: constants.DELETE_CARD,
      payload: payload,
    };

    expect(actions.deleteCard(payload)).toEqual(expectedAction)
  });
});
