import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import CheckList from '../CheckList';

const mockStore = configureStore([]);

describe('<CheckList>', () => {
  let store;
  let props;
  let state;
  let component;

  beforeEach(() => {
    store = mockStore({
      checkListReducer: {
        CheckListID: {
          _checkListId: 'CheckListID',
          title: 'CheckList Title',
          items: [
            { description: 'CheckList Item1 Title', status: false },
            { description: 'CheckList Item2 Title', status: true },
          ]
        }
      }
    });
    store.dispatch = jest.fn();
    props = {
      cardId: 'CardID',
      checkListId: 'CheckListID',
    };
    state = {
      hideCompletedItems: false,
    };

    const wrapper = shallow(<CheckList store={store} {...props} />);
    component = wrapper.find('CheckList').dive();
    component.setState({...state});
  });

  it('should render with given state from Redux store and correct props', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render a CheckListItem component for each items in checklist', () => {
    expect(component.find('CheckListContainer').children().length).toEqual(2)
  });

  it('should call toggleHideCompletedItems after click button', () => {
    const spy = jest.spyOn(component.instance(), "toggleHideCompletedItems");

    component.find('Button').last().simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call setState on hideCompletedItems', () => {
    const expectedState = {
      hideCompletedItems: true,
    };

    component.instance().toggleHideCompletedItems();

    expect(component.state()).toEqual(expectedState)
  });

  it('should render correct button text depending on the state', () => {
    expect(component.find('Button').last().text()).toEqual('Hide completed items');

    component.instance().toggleHideCompletedItems();

    expect(component.find('Button').last().text()).toEqual('Show checked items (1)');
  });

  it('should dispatch an action on delete button click', () => {
    const expectedAction = {
      type: 'DELETE_CHECKLIST',
      payload: {
        cardId: 'CardID',
        checkListId: 'CheckListID',
      }
    };

    component.find('Button').first().simulate('click');

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
