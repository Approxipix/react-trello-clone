import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import CardTitle from '../CardTitle/CardTitle';

describe('<CardTitle>', () => {
  let component;

  beforeEach(() => {
    const state = {
      editTitle: false,
    };

    component = shallow(<CardTitle />);
    component.setState({...state});
  });

  it('should render title if editTitle is false', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render CardTitleEdit component if editTitle is true', () => {
    component.instance().toggleEditTitle();
    expect(toJson(component)).toMatchSnapshot();
  });

  it('checks if toggleEditTitle sets editTitle correctly', () => {
    component.instance().toggleEditTitle();
    expect(component.instance().state.editTitle).toEqual(true);

    component.instance().toggleEditTitle();
    expect(component.instance().state.editTitle).toEqual(false);
  });

  it("should call toggleEditTitle after click on title", () => {
    const spy = jest.spyOn(component.instance(), "toggleEditTitle");

    component.find('Title').simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
