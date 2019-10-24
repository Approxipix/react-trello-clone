import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import CheckListItem from '../CheckListItem/CheckListItem';

const mockStore = configureStore([]);

describe('<CheckListItem>', () => {
  let store;
  let component;
  let mockUpdateCheckListItem = jest.fn();
  let mockDeleteCheckListItem = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();

    const props = {
      index: 0,
      checkListId: 'CheckListID',
      description: 'Description',
      hideCompletedItems: false,
    };
    const state = {
      status: false,
    };
    store = mockStore({});
    store.dispatch = mockUpdateCheckListItem;
    store.dispatch = mockDeleteCheckListItem;

    const wrapper = shallow(<CheckListItem store={store} {...props} />);
    component = wrapper.find('CheckListItem').dive();
    component.setState({...state});
  });

  it('should renders without crashing given the required props', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should return if hideCompletedItems and status equals true', () => {
    const props = {
      hideCompletedItems: true,
    };
    const state = {
      status: true,
    };

    const wrapper = shallow(<CheckListItem store={store} {...props} />);
    component = wrapper.find('CheckListItem').dive();
    component.setState({...state});

    expect(toJson(component)).toMatchSnapshot();
  });

  it('should call handleStatus on checkbox change with the correct params', () => {
    const spy = jest.spyOn(component.instance(), "handleStatus");

    component.find({ type: 'checkbox' }).simulate("change");

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call setState on status', () => {
    const expectedState = {
      status: true,
    };

    component.instance().handleStatus();

    expect(component.state()).toEqual(expectedState)
  });

  it('should dispatch an action on delete button click ', () => {
    const expectedAction = {
      type: 'DELETE_CHECKLIST_ITEM',
      payload: {
        checkListId: 'CheckListID',
        checkListItemIndex: 0,
      }
    };

    component.find('Button').simulate('click');

    expect(mockDeleteCheckListItem).toHaveBeenCalledTimes(1);
    expect(mockDeleteCheckListItem).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch an action on handleStatus ', () => {
    const expectedAction = {
      type: 'UPDATE_CHECKLIST_ITEM',
      payload: {
        checkListId: 'CheckListID',
        checkListItemIndex: 0,
        status: true,
      }
    };

    component.instance().handleStatus();

    expect(mockDeleteCheckListItem).toHaveBeenCalledTimes(1);
    expect(mockDeleteCheckListItem).toHaveBeenCalledWith(expectedAction);
  });
});
