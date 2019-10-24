import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import toJson from "enzyme-to-json";
import CheckListItemAdd from '../CheckListItem/CheckListItemAdd';

const mockStore = configureStore([]);

describe('<CheckListItemAdd>', () => {
  let store;
  let component;
  let mockAddCheckListItem = jest.fn();

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = mockAddCheckListItem;
    const props = {
      checkListId: 'CheckListID',
    };
    const state = {
      isOpened: false,
      title: '',
    };

    const wrapper = shallow(<CheckListItemAdd store={store} {...props} />);
    component = wrapper.find('CheckListItemAdd').dive();
    component.setState({...state})
  });

  it('should render AddButton if isOpened is false', () => {
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render form if isOpened is true', () => {
    component.instance().toggleOpened();
    expect(toJson(component)).toMatchSnapshot();
  });

  it('checks if toggleOpened sets isOpened correctly', () => {
    component.instance().toggleOpened();
    expect(component.instance().state.isOpened).toEqual(true);

    component.instance().toggleOpened();
    expect(component.instance().state.isOpened).toEqual(false);
  });

  it("should call toggleOpened after click on AddButton", () => {
    const spy = jest.spyOn(component.instance(), "toggleOpened");

    component.find('AddButton').simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should call toggleOpened after click on CancelButton", () => {
    const spy = jest.spyOn(component.instance(), "toggleOpened");

    component.setState({ isOpened: true });
    component.find('CancelButton').simulate('click');

    expect(spy).toHaveBeenCalledTimes(1);
  });

  describe('add checklist item form', () => {
    beforeEach(() => {
      component.setState({ isOpened: true });
    });

    it("should call toggleOpened if key code equal 27", () => {
      const spy = jest.spyOn(component.instance(), "toggleOpened");

      component.instance().handleKeyDown({ keyCode: 27 });

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call handleChange on boardTitle change with the correct params', () => {
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
        isOpened: true
      };

      component.instance().handleChange(mockEvent);

      expect(component.state()).toEqual(expectedState)
    });

    it("should call handleSubmit with the correct params", () => {
      const spy = jest.spyOn(component.instance(), "handleSubmit");
      const mockEvent = {
        preventDefault: jest.fn()
      };

      component.setState({ title: 'Test Title' });
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
        type: 'ADD_CHECKLIST_ITEM',
        payload: {
          checkListId: 'CheckListID',
          checkListTitle: 'Test Title',
        }
      };

      component.setState({ title: 'Test Title' });
      component.find('SubmitButton').simulate('click');

      expect(mockAddCheckListItem).toHaveBeenCalledTimes(1);
      expect(mockAddCheckListItem).toHaveBeenCalledWith(expectedAction);
    });
  })
});
