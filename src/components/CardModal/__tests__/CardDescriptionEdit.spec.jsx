import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import CardDescriptionEdit from '../CardDescription/CardDescriptionEdit';
import configureStore from "redux-mock-store";
import { number, string } from "prop-types";

const mockStore = configureStore([]);

describe('<CardDescriptionEdit>', () => {
  let store;
  let props;
  let component;
  let mockEditCardDescription = jest.fn();
  let mockToggleEditDescription = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();

    store = mockStore({});
    store.dispatch = mockEditCardDescription;
    props = {
      cardId: 'CardID',
      cardDescription: 'Card Description',
      toggleEditDescription: mockToggleEditDescription
    };

    const wrapper = shallow(<CardDescriptionEdit store={store} {...props} />, { disableLifecycleMethods: true });
    component = wrapper.find('CardDescriptionEdit').dive();
  });

  it('should render with given state from Redux store', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it("should call toggleEditDescription if key code equal 27", () => {
    component.find('TextArea').simulate('keydown', { keyCode: 27 });

    expect(mockToggleEditDescription).toHaveBeenCalledTimes(1);
  });

  it('should call handleChange on description change with the correct params', () => {
    const spy = jest.spyOn(component.instance(), "handleChange");
    const mockEvent = {
      target: {
        name: "description",
        value: "Test Description",
        style: {}
      }
    };

    component.find("TextArea").simulate("change", mockEvent);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(mockEvent);
  });

  it('should call setState on description', () => {
    const mockEvent = {
      target: {
        name: "description",
        value: "Test Description",
        style: {}
      }
    };
    const expectedState = {
      description: "Test Description",
      rows: expect.any(Number),
      minRows: expect.any(Number),
    };

    component.instance().handleChange(mockEvent);

    expect(component.state()).toEqual(expectedState)
  });

  it("should call handleSubmit with the correct params", () => {
    const spy = jest.spyOn(component.instance(), "handleSubmit");
    const mockEvent = {
      preventDefault: jest.fn()
    };

    component.setState({ description: "Test Description" });
    component.instance().handleSubmit(mockEvent);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should return handleSubmit if description is empty", () => {
    const spy = jest.spyOn(component.instance(), "handleSubmit");
    const mockEvent = {
      preventDefault: jest.fn()
    };

    component.instance().handleSubmit(mockEvent);

    expect(spy).toReturn();
  });

  it("should dispatch an action after handleSubmit", () => {
    const expectedAction = {
      type: 'EDIT_CARD_DESCRIPTION',
      payload: {
        cardDescription: 'Test Description',
        cardId: 'CardID',
      }
    };

    component.setState({ description: "Test Description" });
    component.instance().handleSubmit({ preventDefault: jest.fn() });

    expect(mockEditCardDescription).toHaveBeenCalledTimes(1);
    expect(mockEditCardDescription).toHaveBeenCalledWith(expectedAction);
  });

  it("should call toggleEditDescription after submit", () => {
    component.setState({ description: "Test Description" });
    component.instance().handleSubmit({ preventDefault: jest.fn() });

    expect(mockToggleEditDescription).toHaveBeenCalledTimes(1);
  });
});
