import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import BoardBackgroundEdit from '../BoardBackgroundEdit';

const mockStore = configureStore([]);

describe('<BoardBackgroundEdit>', () => {
  let store;
  let component;
  let mockToggleSidebar = jest.fn();

  beforeEach(() => {
    const props = { boardId: 'BoardID' };
    store = mockStore({
      rootReducer: {
        colors: ['#2E7EAF', '#00603d', '#D29034'],
      }
    });
    store.dispatch = mockToggleSidebar;

    const wrapper = shallow(<BoardBackgroundEdit store={store} {...props} />);
    component = wrapper.find('BoardBackgroundEdit').dive();
  });

  it('should renders without crashing', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render a item for each colors', () => {
    expect(component.find('List').children().length).toEqual(3)
  });

  it('should sets the color prop as the `value` on the item', () => {
    const list = component.find('List');

    expect(list.childAt(0).find('Button').props().value).toEqual('#2E7EAF');
    expect(list.childAt(1).find('Button').props().value).toEqual('#00603d');
    expect(list.childAt(2).find('Button').props().value).toEqual('#D29034');
  });

  it("should dispatch an action after click on item", () => {
    const expectedAction = {
      type: 'EDIT_BOARD_COLOR',
      payload: {
        boardId: 'BoardID',
        boardColor: '#2E7EAF'
      }
    };

    component.find('List').childAt(0).find('Button').simulate('click');

    expect(mockToggleSidebar).toHaveBeenCalledTimes(1);
    expect(mockToggleSidebar).toHaveBeenCalledWith(expectedAction);
  });

  it('should render fontawesome icon if boardColor and color are the same', () => {
    const props = {
      boardId: 'BoardID',
      boardColor: '#2E7EAF'
    };
    store = mockStore({
      rootReducer: {
        colors: ['#2E7EAF', '#00603d', '#D29034'],
      }
    });
    const wrapper = shallow(<BoardBackgroundEdit store={store} {...props} />);
    const component = wrapper.find('BoardBackgroundEdit').dive();

    expect(toJson(component)).toMatchSnapshot();
  });
});

