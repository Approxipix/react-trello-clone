import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import BoardDelete from '../BoardDelete';

const mockStore = configureStore([]);

describe('<BoardDelete>', () => {
  let store;
  let component;
  let mockToggleSidebar = jest.fn();

  beforeEach(() => {
    const props = { boardId: 'BoardID' };
    store = mockStore({});
    store.dispatch = mockToggleSidebar;

    const wrapper = shallow(<BoardDelete store={store} {...props} />);
    component = wrapper.find('BoardDelete').dive();
  });

  it('should render correctly', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it("should dispatch an action after click on button", () => {
    const expectedAction = {
      type: 'DELETE_BOARD',
      payload: {
        boardId: 'BoardID'
      }
    };

    component.find('SubmitButton').simulate('click');

    expect(mockToggleSidebar).toHaveBeenCalledTimes(1);
    expect(mockToggleSidebar).toHaveBeenCalledWith(expectedAction);
  });
});

