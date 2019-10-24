import React from 'react';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import ListTitleEdit from '../ListTitle/ListTitleEdit';
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe('<ListTitleEdit>', () => {
  let store;
  let component;
  let mockEditListTitle = jest.fn();
  let mockToggleEditTitle = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();

    store = mockStore({});
    store.dispatch = mockEditListTitle;
    const props = {
      listId: 'ListID',
      title: 'List Title',
      toggleEditTitle: mockToggleEditTitle
    };

    const wrapper = shallow(<ListTitleEdit store={store} {...props} />);
    component = wrapper.find('ListTitleEdit').dive();
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
      type: 'EDIT_LIST_TITLE',
      payload: {
        listTitle: 'Test Title',
        listId: 'ListID',
      }
    };

    component.setState({ title: "Test Title" });
    component.instance().handleSubmit({ preventDefault: jest.fn() });

    expect(mockEditListTitle).toHaveBeenCalledTimes(1);
    expect(mockEditListTitle).toHaveBeenCalledWith(expectedAction);
  });

  it("should call toggleEditTitle after submit", () => {
    component.setState({ title: "Test Title" });
    component.instance().handleSubmit({ preventDefault: jest.fn() });

    expect(mockToggleEditTitle).toHaveBeenCalledTimes(1);
  });
});
