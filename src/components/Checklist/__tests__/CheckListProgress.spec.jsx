import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import CheckListProgress from '../CheckListProgress';

describe('<CheckListProgress>', () => {
  let component;
  beforeEach(() => {
    const props = {
      items: [
        { status: true, description: 'Item 1' },
        { status: true, description: 'Item 2' },
        { status: false, description: 'Item 3' },
        { status: true, description: 'Item 4' },
        { status: false, description: 'Item 5' },
      ]
    };
    component = shallow(<CheckListProgress {...props} />);
  });

  it('should renders correctly without props', () => {
    const wrapper = shallow(<CheckListProgress />);

    expect(toJson(wrapper)).toMatchSnapshot()
  });

  it('should renders without crashing given the required props', () => {
    expect(toJson(component)).toMatchSnapshot()
  });

  it('checks if progress bar width sets correctly', () => {
    expect(component.find('Progress').props().width).toEqual(60);
  });

  it('should sets the color prop if all items done', () => {
    const props = {
      items: [
        { status: true, description: 'Item 1' },
        { status: true, description: 'Item 2' },
        { status: true, description: 'Item 3' },
      ]
    };
    const component = shallow(<CheckListProgress {...props} />);

    expect(component.find('Progress').props().color).toBeDefined();
  });
});
