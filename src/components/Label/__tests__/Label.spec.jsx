import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import Label from '../Label';

describe('<Label>', () => {
  let component;

  beforeEach(() => {
    const props = {
      cardLabels: [{color: '#fff'}, {color: '#ccc'}, {color: '#000'}]
    };
    component = shallow(<Label {...props} />);
  });

  it('should renders correctly without props', () => {
    const wrapper = shallow(<Label />);

    expect(toJson(wrapper)).toMatchSnapshot()
  });

  it('should renders without crashing given the required props', () => {
    expect(toJson(component)).toMatchSnapshot()
  });

  it('should render a Label item for each cardLabels', () => {
    expect(component.children().length).toEqual(3)
  });

  it('should sets the color prop as the `value` on the Label item', () => {
    expect(component.childAt(0).props().value).toEqual('#fff');
    expect(component.childAt(1).props().value).toEqual('#ccc');
    expect(component.childAt(2).props().value).toEqual('#000');
  });
});
