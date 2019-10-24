import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import ListHeader from '../ListHeader';

describe('<ListDelete>', () => {
  let component;

  beforeEach(() => {
    const props = {
      boardId: 'BoardID',
      listId: 'ListID',
      listTitle: 'List Title',
    };

    component = shallow(<ListHeader {...props} />);
  });

  it('should render with given state from Redux store', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('checks if toggleOpened sets isOpened correctly', () => {
    component.instance().toggleOpened();
    expect(component.instance().state.isOpened).toEqual(true);

    component.instance().toggleOpened();
    expect(component.instance().state.isOpened).toEqual(false);
  });

  it("should call toggleOpened after click on icon", () => {
    const spy = jest.spyOn(component.instance(), "toggleOpened");

    component.find('Icon').simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should render ListActions if isOpened is true', () => {
    component.instance().toggleOpened();

    expect(toJson(component)).toMatchSnapshot();
  });
});
