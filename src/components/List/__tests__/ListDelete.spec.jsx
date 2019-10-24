import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import ListDelete from '../ListDelete';

const mockStore = configureStore([]);

describe('<ListDelete>', () => {
  let store;
  let component;
  let mockDeleteList = jest.fn();

  beforeEach(() => {
    store = mockStore();
    store.dispatch = mockDeleteList;
    const props = {
      boardId: 'BoardID',
      listId: 'ListID',
    };

    const wrapper = shallow(<ListDelete store={store} {...props} />);
    component = wrapper.find('ListDelete').dive();
  });

  it('should render with given state from Redux store', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it("should dispatch an action after click on button", () => {
    const expectedAction = {
      type: 'DELETE_LIST',
      payload: {
        boardId: 'BoardID',
        listId: 'ListID',
      }
    };

    component.find('SubmitButton').simulate('click');
    expect(mockDeleteList).toHaveBeenCalledTimes(1);
    expect(mockDeleteList).toHaveBeenCalledWith(expectedAction);
  });
});
