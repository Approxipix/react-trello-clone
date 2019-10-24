import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import ListDeleteAllCards from '../ListDeleteAllCards';

const mockStore = configureStore([]);

describe('<ListDeleteAllCards>', () => {
  let store;
  let component;
  let mockToggleOpened = jest.fn();
  let mockDeleteCard = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    store = mockStore();
    store.dispatch = mockDeleteCard;
    const props = {
      listId: 'ListID',
      toggleOpened: mockToggleOpened,
    };

    const wrapper = shallow(<ListDeleteAllCards store={store} {...props} />);
    component = wrapper.find('ListDeleteAllCards').dive();
  });

  it('should render with given state from Redux store', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it("should dispatch an action after click on button", () => {
    const expectedAction = {
      type: 'DELETE_ALL_CARDS',
      payload: {
        listId: 'ListID',
      }
    };

    component.find('SubmitButton').simulate('click');
    expect(mockDeleteCard).toHaveBeenCalledTimes(1);
    expect(mockDeleteCard).toHaveBeenCalledWith(expectedAction);
  });

  it("should call toggleOpened after submit", () => {
    component.find('SubmitButton').simulate('click');

    expect(mockToggleOpened).toHaveBeenCalledTimes(1);
  });
});
