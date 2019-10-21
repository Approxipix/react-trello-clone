import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import Select from '../Select';

describe('<Select>', () => {
  let component;
  let mockOnChange;

  beforeEach(() => {
    mockOnChange = jest.fn();
    const props = {
      value: 'Test value',
      label: 'Test label',
      options: [
        { title: 'Option 1', value: 'Option1Value' },
        { title: 'Option 2', value: 'Option2Value' },
        { title: 'Option 3', value: 3 },
      ],
      onChange: mockOnChange,
      placeholder: 'Test placeholder',
    };
    component = shallow(<Select {...props} />);
  });

  it('should renders correctly without props', () => {
    const component = shallow(<Select />);

    expect(toJson(component)).toMatchSnapshot()
  });

  it('should renders without crashing given the required props', () => {
    expect(toJson(component)).toMatchSnapshot()
  });

  it('should render a dropdown item for each option', () => {
    expect(component.find('Dropdown').children().length).toEqual(3)
  });

  it("should call toggleDropdown on input change and click", () => {
    const spy = jest.spyOn(component.instance(), "toggleDropdown");
    component.instance().forceUpdate();
    const mockEvent = {
      target: {
        name: "Test label",
        value: "Test"
      }
    };

    component.find('Input').simulate("change", mockEvent);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(true);

    component.find('Input').simulate("click");
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('checks if isOpened sets toggleDropdown correctly', () => {
    component.instance().toggleDropdown();
    expect(component.instance().state.isOpened).toEqual(true);

    component.instance().toggleDropdown(false);
    expect(component.instance().state.isOpened).toEqual(false);
  });

  it('should sets the isOpened prop on the Dropdown', () => {
    expect(component.find('Dropdown').props().isOpened).toEqual(false);
    component.instance().toggleDropdown();
    expect(component.find('Dropdown').props().isOpened).toEqual(true)
  });

  it("should call onChange after click on dropdown item", () => {
    component.find('Dropdown').childAt(0).simulate('mousedown');
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('Option1Value');
  });
});
