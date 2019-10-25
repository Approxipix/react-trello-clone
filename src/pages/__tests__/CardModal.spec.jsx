import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import CardModal from '../CardModal';

const mockStore = configureStore([]);

describe('<CardModal>', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      rootReducer: {
        currentBoardID: 'BoardID',
      },
      listReducer: {
        ListID: {
          _listId: 'ListID',
          title: 'List Title',
          cards: ['Card1']
        }
      },
      cardReducer: {
        Card1: {
          _cardId: 'Card1ID',
          title: 'Card1 Title',
          description: 'Card1 Description',
          cardLabels: ['CardLabel1', 'CardLabel2'],
          checkLists: ['CheckList1', 'CheckList2', 'CheckList3'],
        },
      }
    });
    const props = {
      match: { params: { cardId: 'Card1' } }
    };

    const wrapper = shallow(<CardModal store={store} {...props} />,);
    component = wrapper.find('CardModal').dive();
  });

  it('should redirect to `/b/BoardID` if the card is not found', () => {
    const props = {
      match: { params: { cardId: '' } }
    };
    const wrapper = shallow(<CardModal store={store} {...props} />,);
    const component = wrapper.find('CardModal').dive();

    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render with given state from Redux store and correct props', () => {
    expect(toJson(component)).toMatchSnapshot();
  });
});
