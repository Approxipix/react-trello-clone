import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import List from '../List';

const mockStore = configureStore([]);
jest.mock('react-beautiful-dnd', () => ({
  Draggable: ({ children }) => children({
    draggableProps: {
      style: {},
    },
    innerRef: jest.fn(),
  }, {}),
}));

describe('<List>', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      listReducer: {
        ListID: {
          _listId: 'ListID',
          title: 'List Title',
          cards: []
        }
      },
    });
    const props = {
      listId: 'ListID'
    };

    const wrapper = shallow(<List store={store} {...props} />);
    component = wrapper.find('List').dive().dive();
  });

  it('should render with given state from Redux store', () => {
    expect(toJson(component)).toMatchSnapshot();
  });
});
