import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import CardTitleEdit from '../CardTitle/CardTitleEdit';
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe('<CardTitleEdit>', () => {
  let store;
  let props;
  let component;
  let mockEditCardTitle = jest.fn();
  let mockToggleEditTitle = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();

    store = mockStore({});
    store.dispatch = mockEditCardTitle;
    props = {
      cardId: 'CardID',
      title: 'Card Title',
      toggleEditTitle: mockToggleEditTitle
    };

    const wrapper = shallow(<CardTitleEdit store={store} {...props} />);
    component = wrapper.find('CardTitleEdit').dive();
  });

  it('should render with given state from Redux store', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it("should call toggleEditTitle if key code equal 27", () => {
    component.find('Input').simulate('keydown', { keyCode: 27 });

    expect(mockToggleEditTitle).toHaveBeenCalledTimes(1);
  });

  it('should call handleChange on title change with the correct params', () => {
    const spy = jest.spyOn(component.instance(), "handleChange");
    const mockEvent = {
      target: {
        name: "title",
        value: "Test title"
      }
    };

    component.find("Input").simulate("change", mockEvent);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(mockEvent);
  });

  it('should call setState on title', () => {
    const mockEvent = {
      target: {
        name: "title",
        value: "Test Title"
      }
    };
    const expectedState = {
      title: "Test Title",
    };

    component.instance().handleChange(mockEvent);

    expect(component.state()).toEqual(expectedState)
  });

  it("should call handleSubmit with the correct params", () => {
    const spy = jest.spyOn(component.instance(), "handleSubmit");
    const mockEvent = {
      preventDefault: jest.fn()
    };

    component.setState({ title: "Test Title" });
    component.instance().handleSubmit(mockEvent);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should return handleSubmit if title is empty", () => {
    const spy = jest.spyOn(component.instance(), "handleSubmit");
    const mockEvent = {
      preventDefault: jest.fn()
    };

    component.instance().handleSubmit(mockEvent);

    expect(spy).toReturn();
  });

  it("should dispatch an action after handleSubmit", () => {
    const expectedAction = {
      type: 'EDIT_CARD_TITLE',
      payload: {
        cardTitle: 'Test Title',
        cardId: 'CardID',
      }
    };

    component.setState({ title: "Test Title" });
    component.instance().handleSubmit({ preventDefault: jest.fn() });

    expect(mockEditCardTitle).toHaveBeenCalledTimes(1);
    expect(mockEditCardTitle).toHaveBeenCalledWith(expectedAction);
  });

  it("should call toggleEditTitle after submit", () => {
    component.setState({ title: "Test Title" });
    component.instance().handleSubmit({ preventDefault: jest.fn() });

    expect(mockToggleEditTitle).toHaveBeenCalledTimes(1);
  });
});
