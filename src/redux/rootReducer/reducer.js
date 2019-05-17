import {
  SET_CURRENT_BOARD_ID,

  ADD_CHECKLIST,
  ADD_CHECKLIST_ITEM,
  UPDATE_CHECKLIST_ITEM,
  DELETE_CHECKLIST,
  DELETE_CHECKLIST_ITEM,
  UPDATE_CHECKLIST_TITLE,
} from "./constants";


import CLh from '../../helpers/CheckListHelper'

const initialState = {
  currentBoardID: null,
  labels: [
    {
      _labelId: 0,
      color: '#61BC4F',
    },
    {
      _labelId: 1,
      color: '#F2D600',
    },
    {
      _labelId: 2,
      color: '#FF9F1A',
    },
    {
      _labelId: 3,
      color: '#EB5A46',
    },
    {
      _labelId: 4,
      color: '#C376E0',
    },
    {
      _labelId: 5,
      color: '#0078BF',
    }
  ],
  colors: ['#2E7EAF', '#00603d', '#D29034', "#89609D"],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_BOARD_ID:
      return {
        ...state,
        currentBoardID: action.payload
      };


    case ADD_CHECKLIST:
      return CLh.addCheckList(state, action.payload);
    case ADD_CHECKLIST_ITEM:
      return CLh.addCheckListItem(state, action.payload);
    case UPDATE_CHECKLIST_ITEM:
      return CLh.updateCheckListItem(state, action.payload);
    case DELETE_CHECKLIST:
      return CLh.deleteCheckList(state, action.payload);
    case DELETE_CHECKLIST_ITEM:
      return CLh.deleteCheckListItem(state, action.payload);
    case UPDATE_CHECKLIST_TITLE:
      return CLh.editCheckListTitle(state, action.payload);

    default:
      return state;
  }
};

export default rootReducer;
