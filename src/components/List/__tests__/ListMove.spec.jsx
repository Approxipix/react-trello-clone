import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import ListMove from '../ListMove';

const mockStore = configureStore([]);

describe('<ListMove>', () => {
  let store;
  let props;
  let component;
  let mockToggleOpened= jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    store = mockStore({
      boardReducer: {
        Board1ID: {
          _boardId: 'Board1ID',
          title: 'Board 1',
          lists: ['List11', 'List12', 'List13'],
        },
        Board2ID: {
          _boardId: 'Board2ID',
          title: 'Board 2',
          lists: ['List21', 'List22', 'List23'],
        }
      }
    });
    store.dispatch = jest.fn();
    props = {
      boardId: 'Board1ID',
      listId: 'List11',
      toggleOpened: mockToggleOpened
    };
    const state = {
      newBoardId: 'Board1ID',
      newListPosition: 0,
    };

    const wrapper = shallow(<ListMove store={store} {...props} />);
    component = wrapper.find('ListMove').dive();
    component.setState({ ...state });
  });

  it('should render with given state from Redux store and correct props', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('checks if setNewBoardId sets newBoardId correctly', () => {
    component.instance().setNewBoardId('Board2ID');

    expect(component.instance().state.newBoardId).toEqual('Board2ID');
  });

  it('checks if setNewBoardId sets newListPosition correctly', () => {
    component.setState({ newListPosition: 5 });
    component.instance().setNewBoardId('Board2ID');

    expect(component.instance().state.newListPosition).toEqual(3);
  });

  it('should call toggleOpened if boardId/newBoardId and currentListPosition/newListPosition are the same', () => {
    component.find('SubmitButton').simulate('click');

    expect(mockToggleOpened).toHaveBeenCalledTimes(1);
  });

  describe('dispatch action', () => {
    it("should dispatch an action if boardId/newBoardId are the same", () => {
      const expectedAction = {
        type: 'MOVE_LIST',
        payload: {
          boardId: 'Board1ID',
          sourceIndex: 0,
          destinationIndex: 1,
        }
      };

      component.setState({ newListPosition: 2 });
      component.find('SubmitButton').simulate('click');

      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it("should dispatch an action if boardId/newBoardId are different", () => {
      const expectedAction = {
        type: 'MOVE_LIST_TO_ANOTHER_BOARD',
        payload: {
          boardId: 'Board1ID',
          newBoardId: 'Board2ID',
          listId: 'List11',
          newListPosition: 0,
        }
      };

      component.setState({ newBoardId: 'Board2ID', newListPosition: 1 });
      component.find('SubmitButton').simulate('click');

      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });
  })
});
