import * as actions from './actions';
import * as t from '../../constants';

describe('checkListReducer actions', () => {
  it('creates ADD_CHECKLIST when checklist is successfully added', () => {
    const payload = {
      cardId: 'CardID',
      checkListId: 'CheckListID',
      checkListTitle: 'CheckList Title'
    };
    const expectedAction = {
      type: t.ADD_CHECKLIST,
      payload,
    };

    expect(actions.addCheckList(payload)).toEqual(expectedAction)
  });

  it('creates ADD_CHECKLIST_ITEM when item is successfully added to a checklist', () => {
    const payload = {
      checkListId: 'CheckList ItemID',
      checkListTitle: 'CheckList Item Title',
    };
    const expectedAction = {
      type: t.ADD_CHECKLIST_ITEM,
      payload,
    };

    expect(actions.addCheckListItem(payload)).toEqual(expectedAction)
  });

  it('creates EDIT_CHECKLIST_TITLE when checklist title has been changed', () => {
    const payload = {
      checkListId: 'CheckListID',
      checkListTitle: 'New CheckList Title'
    };
    const expectedAction = {
      type: t.EDIT_CHECKLIST_TITLE,
      payload: payload,
    };

    expect(actions.editCheckListTitle(payload)).toEqual(expectedAction)
  });

  it('creates UPDATE_CHECKLIST_ITEM when checklist item changed its status', () => {
    const payload = {
      checkListId: 'CheckListID',
      checkListItemIndex: 0,
      status: true,
    };
    const expectedAction = {
      type: t.UPDATE_CHECKLIST_ITEM,
      payload: payload,
    };

    expect(actions.updateCheckListItem(payload)).toEqual(expectedAction)
  });

  it('creates DELETE_CHECKLIST when checklist is successfully deleted', () => {
    const payload = {
      checkListId: 'CheckListID',
    };
    const expectedAction = {
      type: t.DELETE_CHECKLIST,
      payload: payload,
    };

    expect(actions.deleteCheckList(payload)).toEqual(expectedAction)
  });

  it('creates DELETE_CHECKLIST_ITEM when checklist item is successfully deleted', () => {
    const payload = {
      checkListId: 'CheckListID',
      checkListItemIndex: 0,
    };
    const expectedAction = {
      type: t.DELETE_CHECKLIST_ITEM,
      payload: payload,
    };

    expect(actions.deleteCheckListItem(payload)).toEqual(expectedAction)
  });
});
