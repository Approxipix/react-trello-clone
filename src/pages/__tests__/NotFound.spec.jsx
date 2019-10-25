import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import NotFound from '../NotFound';

describe('<NotFound>', () => {
  let component;

  beforeEach(() => {
    component = shallow(<NotFound />);
  });

  it('should render correctly', () => {
    expect(toJson(component)).toMatchSnapshot();
  });
});
