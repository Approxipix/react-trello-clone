import React from 'react';
import { shallow } from 'enzyme';
import configureStore from "redux-mock-store";
import toJson from "enzyme-to-json";
import Boards from '../Boards';

const mockStore = configureStore([]);

describe('<Boards>', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      boardReducer: {
        Board1ID: {
          _boardId: 'Board1ID',
          title: 'Board1 Title',
          color: '#af2232',
          lists: ['List1ID', 'List2ID', 'List3ID'],
        },
        Board2ID: {
          _boardId: 'Board2ID',
          title: 'Board2 Title',
          color: '#af2232',
          lists: ['List4ID'],
        }
      },
      listReducer: {
        List1ID: {
          _listId: 'List1ID',
          title: 'List1 Title',
          cards: []
        },
        List2ID: {
          _listId: 'List2ID',
          title: 'List2 Title',
          cards: []
        },
        List3ID: {
          _listId: 'List3ID',
          title: 'List3 Title',
          cards: []
        },
        List4ID: {
          _listId: 'List4ID',
          title: 'List4 Title',
          cards: []
        }
      },
    });
    const props = {
      cardId: 'CardID',
      checkListId: 'CheckListID',
    };

    const wrapper = shallow(<Boards store={store} {...props} />);
    component = wrapper.find('Boards').dive();
  });

  it('should render with given state from Redux store and correct props', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render a BoardItem for each board in boardReducer', () => {
    expect(component.find('BoardItem').length).toEqual(2)
  });

  it('should render a BoardSchemeBar for each list in board', () => {
    expect(component.find('BoardItem').first().find('BoardSchemeBar').length).toEqual(3)
  });
});
