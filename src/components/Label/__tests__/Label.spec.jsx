import React from 'react'
import { shallow, mount } from 'enzyme'
import Label from '../Label'
import toJson from "enzyme-to-json";

describe('<Label>', () => {
  it('should renders correctly without props', () => {
    const wrapper = shallow(<Label />);

    expect(toJson(wrapper)).toMatchSnapshot()
  });

  it('should renders without crashing given the required props', () => {
    const props = {
      cardLabels: [{color: '#fff'}, {color: '#ccc'}, {color: '#000'}]
    };
    const wrapper = shallow(<Label {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot()
  });

  it('should render a Label item for each cardLabels', () => {
    const props = {
      cardLabels: [{color: '#fff'}, {color: '#ccc'}, {color: '#000'}]
    };
    const wrapper = mount(<Label {...props} />);

    expect(wrapper.find('ul').children().length).toEqual(3)
  });

  it('should sets the color prop as the `value` on the Label item', () => {
    const props = {
      cardLabels: [{color: '#fff'}, {color: '#ccc'}, {color: '#000'}]
    };
    const wrapper = mount(<Label {...props} />);
    const labelList = wrapper.find('ul');

    expect(labelList.childAt(0).props().value).toEqual('#fff');
    expect(labelList.childAt(1).props().value).toEqual('#ccc');
    expect(labelList.childAt(2).props().value).toEqual('#000');
  });
});
