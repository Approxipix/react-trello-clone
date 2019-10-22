import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import BoardHeader from '../BoardHeader';

const mockStore = configureStore([]);

describe('<BoardHeader>', () => {
  let store;
  let component;
  let mockToggleSidebar = jest.fn();

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = mockToggleSidebar;

    const wrapper = shallow(<BoardHeader store={store}  />);
    component = wrapper.find('BoardHeader').dive();
  });

  it('should render correctly', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it("should dispatch an action after click on button", () => {
    const expectedAction = {
      type: 'TOGGLE_SIDEBAR',
    };

    component.find('Button').simulate('click');

    expect(mockToggleSidebar).toHaveBeenCalledTimes(1);
    expect(mockToggleSidebar).toHaveBeenCalledWith(expectedAction);
  });
});

