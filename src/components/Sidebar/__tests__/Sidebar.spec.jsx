import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import Sidebar from '../Sidebar';

const mockStore = configureStore([]);

describe('<Sidebar>', () => {
  let store;
  let state;
  let component;

  beforeEach(() => {
    store = mockStore({
      rootReducer: {
        isSidebarOpened: false,
      }
    });
    store.dispatch = jest.fn();
    state = {
      sidebarView: null,
      sidebarTitle: 'Menu',
    };

    component = shallow(<Sidebar store={store}  />).find('Sidebar').dive();
    component.setState({ ...state });
  });

  it('should render with given state from Redux store', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should dispatch an action on button click and after componentWillUnmount', () => {
    const expectedAction = {
      type: 'TOGGLE_SIDEBAR',
      payload: false
    };

    component.find('Button').last().simulate('click');

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);

    component.unmount();

    expect(store.dispatch).toHaveBeenCalledTimes(2);
  });

  it('checks if changeView sets sidebarView and sidebarTitle correctly', () => {
    component.instance().changeView('TestComponentView', 'Test Component');
    expect(component.instance().state.sidebarTitle).toEqual('Test Component');
    expect(component.instance().state.sidebarView).toEqual('TestComponentView');
  });

  it('it should render fontawesome icon if sidebarView was selected', () => {
    component.instance().changeView('TestComponentView', 'Test Component');

    expect(toJson(component)).toMatchSnapshot();
  });
});
