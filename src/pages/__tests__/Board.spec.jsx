import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import Board, { InnerList } from '../Board';

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

describe('<Board>', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      rootReducer: {
        currentBoardID: 'BoardID',
      },
      boardReducer: {
        BoardID: {
          _boardId: 'BoardID',
          title: 'Board Title',
          color: '#b1b1b1',
          lists: [],
        },
      }
    });
    store.dispatch = jest.fn();

    const wrapper = shallow(<Board store={store} />, { disableLifecycleMethods: true });
    component = wrapper.find('Board').dive();
  });

  it('should render with given state from Redux store', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should dispatch an action when drag type is column', () => {
    const expectedAction = {
      type: 'MOVE_LIST',
      payload: {
        boardId: 'BoardID',
        sourceIndex: 0,
        destinationIndex: 1,
      }
    };

    component.instance().handleDragEnd({
      type: 'column',
      source: {
        index: 0,
        droppableId: 0,
      },
      destination: {
        index: 1,
        droppableId: 1,
      },
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch an action when drag type is task', () => {
    const expectedAction = {
      type: 'MOVE_CARD',
      payload: {
        sourceIndex: 0,
        sourceListIndex: 0,
        destinationIndex: 1,
        destinationListIndex: 1,
      }
    };

    component.instance().handleDragEnd({
      type: 'task',
      source: {
        index: 0,
        droppableId: 0,
      },
      destination: {
        index: 1,
        droppableId: 1,
      },
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  describe('<InnerList>', () => {
    let component;

    beforeEach(() => {
      const props = {
        boardId: 'BoardID',
        listsId: ['List1ID', 'List2ID', 'List3ID'],
      };

      component = shallow(<InnerList {...props} />);
    });

    it('should render correctly', () => {
      expect(toJson(component)).toMatchSnapshot();
    });

    it('should render a List component for each list id', () => {
      expect(component.length).toEqual(3)
    });
  })
});
