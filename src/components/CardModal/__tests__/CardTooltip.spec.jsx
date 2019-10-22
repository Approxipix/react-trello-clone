import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import CardTooltip from '../CardTooltip';

describe('<CardTooltip>', () => {
  let component;
  let mockToggleTooltip;

  beforeEach(() => {
    mockToggleTooltip = jest.fn();
    const props = {
      toggleTooltip: mockToggleTooltip,
      isOpened: true,
      body: <p>Test component</p>
    };
    component = shallow(<CardTooltip {...props} />);
  });

  it('should renders without crashing given the required props', () => {
    expect(toJson(component)).toMatchSnapshot()
  });

  it("should return if isOpened false", () => {
    const props = {
      toggleTooltip: mockToggleTooltip,
      isOpened: false,
      body: <p>Test component</p>
    };
    const component = shallow(<CardTooltip {...props} />);

    expect(toJson(component)).toMatchSnapshot();
  });

  it('should call toggleOpened after click on the button', () => {
    component.find('Button').simulate('click');

    expect(mockToggleTooltip).toHaveBeenCalledTimes(1)
  });
});
