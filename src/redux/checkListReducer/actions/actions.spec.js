import * as actions from './actions';
import * as constants from '../constants/constants';
import uuid from "uuid";

describe('checkListReducer actions', () => {
  it('creates ADD_CHECKLIST when checklist is successfully added', () => {
    const payload = {
      cardId: 'Card ID',
      checkListId: 'Checklist ID',
      checkListTitle: 'Checklist title'
    };
    const expectedAction = {
      type: constants.ADD_CHECKLIST,
      payload,
    };

    expect(actions.addCheckList(payload)).toEqual(expectedAction)
  });

  it('creates ADD_CHECKLIST_ITEM when item is successfully added to a checklist', () => {
    const payload = {
      checkListId: 'Checklist item ID',
      checkListTitle: 'Checklist item title',
    };
    const expectedAction = {
      type: constants.ADD_CHECKLIST_ITEM,
      payload,
    };

    expect(actions.addCheckListItem(payload)).toEqual(expectedAction)
  });

  it('creates EDIT_CHECKLIST_TITLE when checklist title has been changed', () => {
    const payload = {
      listId: 'Checklist ID',
      listTitle: 'New checklist title'
    };
    const expectedAction = {
      type: constants.EDIT_CHECKLIST_TITLE,
      payload: payload,
    };

    expect(actions.editCheckListTitle(payload)).toEqual(expectedAction)
  });

  it('creates UPDATE_CHECKLIST_ITEM when checklist item changed its status', () => {
    const payload = {
      checkListId: 'Checklist ID',
      checkListItemIndex: 0,
      status: true,
    };
    const expectedAction = {
      type: constants.UPDATE_CHECKLIST_ITEM,
      payload: payload,
    };

    expect(actions.updateCheckListItem(payload)).toEqual(expectedAction)
  });

  it('creates DELETE_CHECKLIST when checklist is successfully deleted', () => {
    const payload = {
      cardId: 'Card ID',
      checkListId: 'Checklist ID',
    };
    const expectedAction = {
      type: constants.DELETE_CHECKLIST,
      payload: payload,
    };

    expect(actions.deleteCheckList(payload)).toEqual(expectedAction)
  });

  it('creates DELETE_CHECKLIST_ITEM when checklist item is successfully deleted', () => {
    const payload = {
      checkListId: 'Checklist ID',
      checkListItemIndex: 0,
    };
    const expectedAction = {
      type: constants.DELETE_CHECKLIST_ITEM,
      payload: payload,
    };

    expect(actions.deleteCheckListItem(payload)).toEqual(expectedAction)
  });
});
