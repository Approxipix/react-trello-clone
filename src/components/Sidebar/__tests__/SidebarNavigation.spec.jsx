import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import SidebarNavigation from '../SidebarNavigation';


describe('<SidebarNavigation>', () => {
  let state;
  let component;
  let mockChangeView = jest.fn();

  beforeEach(() => {
    state = {
      navigation: [
        { title: 'Change Background', component: 'BoardBackgroundEdit', icon: 'fill-drip' },
        { title: 'Delete Board', component: 'BoardDelete', icon: 'trash' },
      ]
    };

    component = shallow(<SidebarNavigation changeView={mockChangeView} />);
    component.setState({ ...state });
  });

  it('should renders without crashing', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render a nav link for each item from state', () => {
    expect(component.find('Link').length).toEqual(2)
  });

  it("should call changeView after click on nav item", () => {
    component.find('Link').first().simulate('click', {
      preventDefault: () => {}
    });

    expect(mockChangeView).toHaveBeenCalledTimes(1);
    expect(mockChangeView).toHaveBeenCalledWith('BoardBackgroundEdit', 'Change Background');
  });
});
