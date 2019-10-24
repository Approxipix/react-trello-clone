import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import CardDescription from '../CardDescription/CardDescription';

describe('<CardDescription>', () => {
  let component;

  describe('when cardDescription prop is exist', () => {
    beforeEach(() => {
      const props = { cardDescription: 'Card Description' };
      const state = { editDescription: false };

      component = shallow(<CardDescription {...props} />);
      component.setState({...state});
    });

    it('should render Edit button if editDescription is false', () => {
      expect(toJson(component)).toMatchSnapshot();
    });

  });

  describe('when cardDescription prop does not exist', () => {
    beforeEach(() => {
      const props = { cardDescription: '' };
      const state = { editDescription: false };

      component = shallow(<CardDescription {...props} />);
      component.setState({...state});
    });

    it('should render AddDescription if editDescription is false', () => {
      expect(toJson(component)).toMatchSnapshot();
    });

    it("should call toggleEditDescription after click on AddDescription", () => {
      const spy = jest.spyOn(component.instance(), "toggleEditDescription");

      component.find('AddDescription').simulate('click');

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should render CardDescriptionEdit if editDescription is true', () => {
      component.setState({ editDescription: true });
      expect(toJson(component)).toMatchSnapshot();
    });
  });

  it('checks if toggleEditDescription sets editDescription correctly', () => {
    component.setState({ editDescription: false });

    component.instance().toggleEditDescription();
    expect(component.instance().state.editDescription).toEqual(true);

    component.instance().toggleEditDescription();
    expect(component.instance().state.editDescription).toEqual(false);
  });
});
