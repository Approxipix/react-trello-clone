import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import ListActionsNavigation from '../ListActions/ListActionsNavigation';

describe('<ListActionsNavigation>', () => {
  let component;
  let mockChangeView = jest.fn();

  beforeEach(() => {
    const state = {
      navigation: [
        { title: 'Move List', component: 'ListMove', },
        { title: 'Move All Cards', component: 'ListMoveAllCards', },
        { title: 'Delete List', component: 'ListDelete', },
      ]
    };

    component = shallow(<ListActionsNavigation changeView={mockChangeView} />);
    component.setState({ ...state });
  });

  it('should renders without crashing', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render a nav link for each item from state', () => {
    expect(component.find('Link').length).toEqual(3)
  });

  it("should call changeView after click on nav item", () => {
    component.find('Link').first().simulate('click', {
      preventDefault: () => {}
    });

    expect(mockChangeView).toHaveBeenCalledTimes(1);
    expect(mockChangeView).toHaveBeenCalledWith('ListMove', 'Move List');
  });
});
