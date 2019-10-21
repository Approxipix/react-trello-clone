import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import LabelAdd from '../LabelAdd';

const mockStore = configureStore([]);

describe('<LabelAdd>', () => {
  let store;
  let wrapper;
  let component;

  beforeEach(() => {
    store = mockStore({
      rootReducer: {
        labels: [
          { _labelId: 0, color: '#61BC4F' },
          { _labelId: 1, color: '#F2D600' },
          { _labelId: 2, color: '#FF9F1A' },
        ]
      }
    });
    store.dispatch = jest.fn();

    wrapper = shallow(<LabelAdd store={store}  />);
    component = wrapper.find('LabelAdd').dive();
  });

  it('should render with given state from Redux store', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render a label item for each labels from store', () => {
    expect(component.children().length).toEqual(3)
  });

  it('should sets the color prop as the `value` on the Label item', () => {
    expect(component.childAt(0).props().value).toEqual('#61BC4F');
    expect(component.childAt(1).props().value).toEqual('#F2D600');
    expect(component.childAt(2).props().value).toEqual('#FF9F1A');
  });

  it('should renders fontawesome icon for label with same labelID', () => {
    const props = { cardLabels: [{_labelId: 1}] };
    const wrapper = shallow(<LabelAdd store={store} {...props} />);
    const component = wrapper.find('LabelAdd').dive();

    expect(toJson(component)).toMatchSnapshot()
  });

  it('should dispatch an action on Label Item click', () => {
    const props = { cardId: 'CardID' };
    const wrapper = shallow(<LabelAdd store={store} {...props} />);
    const component = wrapper.find('LabelAdd').dive();
    const expectedAction = {
      type: 'ADD_LABEL_TO_CARD',
      payload: {
        cardId: 'CardID',
        cardLabel: { _labelId: 0, color: '#61BC4F' }
      }
    };

    component.childAt(0).simulate('click');

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
