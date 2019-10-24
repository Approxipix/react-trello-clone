import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import ListCards from '../ListCards';

const mockStore = configureStore([]);
jest.mock('react-beautiful-dnd', () => ({
  Droppable: ({ children }) => children({
    draggableProps: {
      style: {},
    },
    innerRef: jest.fn(),
  }, {}),
  Draggable: ({ children }) => children({
    draggableProps: {
      style: {},
    },
    innerRef: jest.fn(),
  }, {}),
  DragDropContext: ({ children }) => children,
}));

describe('<ListCards>', () => {
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
      listId: 'ListID',
      cardsId: ['Card1ID', 'Card2ID', 'Card3ID']
    };

    component = shallow(<ListCards store={store} {...props} />).dive();
  });

  it('should render with given state from Redux store', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render a Card component for each card id', () => {
    expect(component.find('InnerList').dive().length).toEqual(3)
  });
});
