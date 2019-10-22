import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import CardActions from '../CardActions';

describe('<CardActions>', () => {
  let component;

  beforeEach(() => {
    const props = {
      card: {
        _cardId: "CardID",
        cardLabels: [],
      },
      listId: "ListID",
      title: "Test Title",
      actions: ["Label", "CheckList"],
    };
    const state = {
      isOpened: 'Label'
    };

    component = shallow(<CardActions {...props} />);
    component.setState({...state})
  });

  it('should renders without crashing given the required props', () => {
    expect(toJson(component)).toMatchSnapshot()
  });

  it('should render a component for each action', () => {
    expect(component.find('ActionList').children().length).toEqual(2)
  });

  it('checks if toggleIsOpened sets isOpened correctly', () => {
    expect(component.instance().state.isOpened).toEqual('Label');

    component.instance().toggleIsOpened('CheckList');
    expect(component.instance().state.isOpened).toEqual('CheckList');

    component.instance().toggleIsOpened('CheckList');
    expect(component.instance().state.isOpened).toEqual(null);
  });

  it("should call toggleIsOpened after click on link", () => {
    const spy = jest.spyOn(component.instance(), "toggleIsOpened");

    component.find('Link').last().simulate('click', 'CheckList');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('CheckList');
  });
});
