import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import Card, { CardBadges } from '../Card';

const mockStore = configureStore([]);
jest.mock('react-beautiful-dnd', () => ({
  Draggable: ({ children }) => children({
    draggableProps: {
      style: {},
    },
    innerRef: jest.fn(),
  }, {}),
}));

describe('<Card>', () => {
  let store;
  let props;
  let component;

  beforeEach(() => {
    store = mockStore({
      rootReducer: {
        currentBoardID: 'BoardID',
      },
      cardReducer: {
        CardID: {
          _cardId: 'CardID',
          title: 'Test Card',
          description: '',
          checkLists: [],
          cardLabels: [],
        }
      },
      checkListReducer: {}
    });
    props = {
      cardId: 'CardID',
    };

    const wrapper = shallow(<Card store={store} {...props} />);
    component = wrapper.find('Card').dive().dive();
  });

  it('should render with given state from Redux store', () => {
    expect(toJson(component)).toMatchSnapshot();
  });
});

describe('<CardBadges>', () => {
  it('should render description badge icon if description props is exist', () => {
    const props = {
      card: {
        description: 'Test Description',
        checkLists: [],
      }
    };
    const component = shallow(<CardBadges {...props} />).dive();

    expect(toJson(component)).toMatchSnapshot()
  });

  it('should render checkList badge icon if description props is exist', () => {
    const props = {
      card: {
        description: '',
        checkLists: ['CheckListID'],
      },
      checkLists: {
        CheckListID: {
          _checkListId: 'CheckListID',
          title: 'CheckList Title',
          items: [
            {status: true, description: '1'},
            {status: false, description: '2'},
          ]
        }
      }
    };
    const component = shallow(<CardBadges {...props} />).dive();

    expect(toJson(component)).toMatchSnapshot()
  });

  it('should sets the done prop as true if all checklist item done', () => {
    const props = {
      card: {
        description: '',
        checkLists: ['CheckListID'],
      },
      checkLists: {
        CheckListID: {
          _checkListId: 'CheckListID',
          title: 'CheckList Title',
          items: [
            {status: true, description: '1'},
            {status: true, description: '2'},
            {status: true, description: '3'},
          ]
        }
      }
    };
    const component = shallow(<CardBadges {...props} />).dive();

    expect(component.childAt(0).props().done).toEqual(true);
  });
});

