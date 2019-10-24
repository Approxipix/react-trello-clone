import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import CheckListTitle from '../CheckListTitle/CheckListTitle';

describe('<CheckListTitle>', () => {
  let component;

  beforeEach(() => {
    const props = {
      checkListId: 'CheckListID',
      checkListTitle: 'CheckList Title',
    };
    const state = {
      editTitle: false,
    };

    component = shallow(<CheckListTitle {...props} />);
    component.setState({...state})
  });

  it('should render title if editTitle is false', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render CheckListTitleEdit component if editTitle is true', () => {
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
