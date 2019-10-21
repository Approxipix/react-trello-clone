import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import Header from '../Header';

const mockStore = configureStore([]);

describe('<Header>', () => {
  let store;
  let state;
  let wrapper;
  let component;

  beforeEach(() => {
    store = mockStore({
      rootReducer: {
        currentBoardID: "Board2ID"
      },
      boardReducer: {
        Board1ID: { _boardId: "Board1ID", color: "61BC4F" },
        Board2ID: { _boardId: "Board2ID", color: "FF9F1A" }
      }
    });
    state = {
      navigation: [
        { title: 'Home', path: '/home', faIcon: 'times', },
        { title: 'Boards', path: '/boards', faIcon: 'columns', },
      ]
    };

    wrapper = shallow(<Header store={store}  />);
    component = wrapper.find('Header').dive();
    component.setState({ ...state });
  });

  it('should render with given state from Redux store', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should sets the color prop as the `value` if the _boardID and currentBoardID are the same', () => {
    expect(component.props().color).toEqual("FF9F1A");
  });

  it('should render a nav link for each item from state', () => {
    expect(component.find('NavList').length).toEqual(2)
  });
});
