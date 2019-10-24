import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import ListActions from '../ListActions/ListActions';


describe('<ListActions>', () => {
  let store;
  let component;

  beforeEach(() => {
    const state = {
      actionView: null,
      actionTitle: 'List Actions',
    };

    component = shallow(<ListActions store={store}  />);
    component.setState({ ...state });
  });

  it('should render with given state from Redux store', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('checks if changeView sets actionView and actionTitle correctly', () => {
    component.instance().changeView('TestComponentView', 'Test Component');
    expect(component.instance().state.actionTitle).toEqual('Test Component');
    expect(component.instance().state.actionView).toEqual('TestComponentView');
  });

  it('it should render fontawesome icon if sidebarView was selected', () => {
    component.instance().changeView('TestComponentView', 'Test Component');

    expect(toJson(component)).toMatchSnapshot();
  });
});
