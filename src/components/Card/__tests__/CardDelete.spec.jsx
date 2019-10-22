import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import CardDelete from '../CardDelete';

const mockStore = configureStore([]);

describe('<CardDelete>', () => {
  let store;
  let component;
  let mockDeleteCard = jest.fn();

  beforeEach(() => {
    const props = {
      listId: 'ListID',
      cardId: 'CardID',
    };
    store = mockStore({
      rootReducer: {
        currentBoardID: 'BoardID'
      }
    });
    store.dispatch = mockDeleteCard;

    const wrapper = shallow(<CardDelete store={store} {...props} />);
    component = wrapper.find('CardDelete').dive();
  });

  it('should render with given state from Redux store', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it("should dispatch an action after click on button", () => {
    const expectedAction = {
      type: 'DELETE_CARD',
      payload: {
        listId: 'ListID',
        cardId: 'CardID',
      }
    };

    component.find('SubmitButton').simulate('click');
    expect(mockDeleteCard).toHaveBeenCalledTimes(1);
    expect(mockDeleteCard).toHaveBeenCalledWith(expectedAction);
  });
});
