import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import ListMoveAllCards from '../ListMoveAllCards';

const mockStore = configureStore([]);

describe('<ListMoveAllCards>', () => {
  let store;
  let props;
  let component;
  let mockToggleOpened= jest.fn();
  let mockMoveAllCards = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    store = mockStore({
      boardReducer: {
        Board1ID: {
          _boardId: 'Board1ID',
          title: 'Board 1',
          lists: ['List1ID', 'List2ID'],
        },
      },
      listReducer: {
        List1ID: {
          _listId: 'List1ID',
          title: 'List1 Title',
          cards: ['List1 Card1', 'List1 Card2']
        },
        List2ID: {
          _listId: 'List2ID',
          title: 'List2 Title',
          cards: ['List2 Card1', 'List2 Card2']
        },
      }
    });
    store.dispatch = mockMoveAllCards;
    props = {
      boardId: 'Board1ID',
      listId: 'List1ID',
      toggleOpened: mockToggleOpened
    };
    const state = {
      newListId: 'List2ID',
    };

    const wrapper = shallow(<ListMoveAllCards store={store} {...props} />);
    component = wrapper.find('ListMoveAllCards').dive();
    component.setState({ ...state });
  });

  it('should render with given state from Redux store and correct props', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should call toggleOpened if listId/newListId are the same', () => {
    component.setState({ newListId: 'List1ID' });
    component.find('SubmitButton').simulate('click');

    expect(mockToggleOpened).toHaveBeenCalledTimes(1);
  });

  it("should dispatch an action if listId/newListId are different", () => {
    const expectedAction = {
      type: 'MOVE_ALL_CARDS',
      payload: {
        listId: 'List1ID',
        newListId: 'List2ID',
      }
    };

    component.find('SubmitButton').simulate('click');

    expect(mockMoveAllCards).toHaveBeenCalledTimes(1);
    expect(mockMoveAllCards).toHaveBeenCalledWith(expectedAction);
  });
});
