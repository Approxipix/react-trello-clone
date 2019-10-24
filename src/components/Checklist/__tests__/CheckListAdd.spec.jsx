import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import CheckListAdd from '../CheckListAdd';

const mockStore = configureStore([]);

describe('<CheckListAdd>', () => {
  let store;
  let component;
  let mockAddCheckList = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    store = mockStore({});
    store.dispatch = mockAddCheckList;
    const props = {
      cardId: 'CardID',
      toggleTooltip: jest.fn()
    };
    const state = { title: '' };

    const wrapper = shallow(<CheckListAdd store={store} {...props} />);
    component = wrapper.find('CheckListAdd').dive();
    component.setState({...state})
  });

  it('should renders without crashing', () => {
    expect(toJson(component)).toMatchSnapshot();
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
      type: 'ADD_CHECKLIST',
      payload: {
        checkListTitle: 'Test Title',
        cardId: 'CardID',
        checkListId: expect.any(String)
      }
    };

    component.setState({ title: "Test Title" });
    component.find('SubmitButton').simulate('click', {
      preventDefault: () => {}
    });

    expect(mockAddCheckList).toHaveBeenCalledTimes(1);
    expect(mockAddCheckList).toHaveBeenCalledWith(expectedAction);
  });
});
