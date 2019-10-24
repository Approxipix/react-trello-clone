import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import CheckListAdd from '../CheckListAdd';

const mockStore = configureStore([]);

describe('<CheckListAdd>', () => {
  let store;
  let props;
  let state;
  let component;
  let mockAddCheckList = jest.fn();

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = mockAddCheckList;
    props = {
      cardId: 'CardID',
      toggleTooltip: jest.fn()
    };
    state = { title: '' };

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
    component.find('SubmitButton').simulate('click');

    expect(mockAddCheckList).toHaveBeenCalledTimes(1);
    expect(mockAddCheckList).toHaveBeenCalledWith(expectedAction);
  });

  // describe('add board form', () => {
  //   beforeEach(() => {
  //     component.setState({ isOpened: true });
  //   });
  //
  //   it("should call toggleOpened if key code equal 27", () => {
  //     const spy = jest.spyOn(component.instance(), "toggleOpened");
  //
  //     component.instance().handleKeyDown({ keyCode: 27 });
  //
  //     expect(spy).toHaveBeenCalledTimes(1);
  //   });
  //
  //   it('should call handleChange on boardTitle change with the correct params', () => {
  //     const spy = jest.spyOn(component.instance(), "handleChange");
  //     const mockEvent = {
  //       target: {
  //         name: "title",
  //         value: "Test title"
  //       }
  //     };
  //
  //     component.find("Input").simulate("change", mockEvent);
  //
  //     expect(spy).toHaveBeenCalledTimes(1);
  //     expect(spy).toHaveBeenCalledWith("boardTitle", "Test title");
  //   });

  //   it('should call handleChange on boardColor after click on color item', () => {
  //     const spy = jest.spyOn(component.instance(), "handleChange");
  //
  //     component.find('ColorPicker').childAt(0).simulate('click');
  //
  //     expect(spy).toHaveBeenCalledTimes(1);
  //     expect(spy).toHaveBeenCalledWith("boardColor", "#2E7EAF");
  //
  //     component.find('ColorPicker').childAt(1).simulate('click');
  //
  //     expect(spy).toHaveBeenCalledTimes(2);
  //     expect(spy).toHaveBeenCalledWith("boardColor", "#00603d");
  //   });
  //
  //   it('should call setState on boardTitle', () => {
  //     const expectedState = {
  //       boardTitle: "Test Title",
  //       boardColor: "",
  //       isOpened: true
  //     };
  //
  //     component.instance().handleChange("boardTitle", "Test Title");
  //
  //     expect(component.state()).toEqual(expectedState)
  //   });
  //
  //   it('should call setState on boardColor', () => {
  //     const expectedState = {
  //       boardTitle: "",
  //       boardColor: "#D29034",
  //       isOpened: true
  //     };
  //
  //     component.instance().handleChange("boardColor", "#D29034");
  //
  //     expect(component.state()).toEqual(expectedState)
  //   });
  //
  //   it('should render fontawesome icon if boardColor and color are the same', () => {
  //     component.setState({ boardTitle: 'Test Title', boardColor: '#D29034' });
  //
  //     expect(toJson(component)).toMatchSnapshot();
  //   });
  //
  //   it("should call handleSubmit with the correct params", () => {
  //     const spy = jest.spyOn(component.instance(), "handleSubmit");
  //     const mockEvent = {
  //       preventDefault: jest.fn()
  //     };
  //
  //     component.setState({ boardTitle: 'Test Title', boardColor: '#D29034' });
  //     component.instance().handleSubmit(mockEvent);
  //
  //     expect(spy).toHaveBeenCalledTimes(1);
  //   });
  //
  //   it("should return handleSubmit if title is empty", () => {
  //     const spy = jest.spyOn(component.instance(), "handleSubmit");
  //     const mockEvent = {
  //       preventDefault: jest.fn()
  //     };
  //
  //     component.instance().handleSubmit(mockEvent);
  //
  //     expect(spy).toReturn();
  //   });
  //
  //   it("should dispatch an action after handleSubmit", () => {
  //     const expectedAction = {
  //       type: 'ADD_BOARD',
  //       payload: {
  //         boardTitle: 'Test Title',
  //         boardColor: '#D29034',
  //         boardId: expect.any(String),
  //       }
  //     };
  //
  //     component.setState({ boardTitle: 'Test Title', boardColor: '#D29034' });
  //     component.find('SubmitButton').simulate('click');
  //
  //     expect(mockAddBoard).toHaveBeenCalledTimes(1);
  //     expect(mockAddBoard).toHaveBeenCalledWith(expectedAction);
  //   });
  // })
});
