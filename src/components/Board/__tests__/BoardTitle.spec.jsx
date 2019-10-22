import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import { BoardTitle } from '../BoardTitle/BoardTitle';

describe('<BoardTitle>', () => {
  let state;
  let component;

  beforeEach(() => {
    state = {
      editTitle: false,
    };
    const props = {
      board: {
        title: 'Board Title'
      },
    };

    component = shallow(<BoardTitle {...props} />);
    component.setState({...state});
  });

  it('should render title if editTitle is false', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render BoardTitleEdit component if editTitle is true', () => {
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
