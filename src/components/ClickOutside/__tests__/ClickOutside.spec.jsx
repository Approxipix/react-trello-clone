import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import ClickOutside from '../ClickOutside';

describe('<ClickOutside>', () => {
  let component;
  let mockToggleOpened;

  beforeEach(() => {
    mockToggleOpened = jest.fn();
    const props = {
      toggleOpened: mockToggleOpened
    };
    component = shallow(
      <ClickOutside {...props}>
        <p>Test Component</p>
      </ClickOutside>
    );
  });

  it('should renders correctly', () => {
    expect(toJson(component)).toMatchSnapshot()
  });

  it('should not call toggleOpened on click inside the component', () => {
    component.find('Wrapper').simulate('click');

    expect(mockToggleOpened).toHaveBeenCalledTimes(0)
  })
});
