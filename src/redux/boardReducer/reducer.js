import uuid from "uuid";
import data from '../../data'
import {
  SET_CURRENT_BOARD_INDEX,

  ADD_BOARD,
  EDIT_BOARD_TITLE,
  EDIT_BOARD_COLOR,
  DELETE_BOARD,

  ADD_LIST,
  ADD_TASK,
  DELETE_LIST,
  DELETE_TASK, EDIT_COLUMN,
  EDIT_TASK,
  MOVE_LIST,
  MOVE_TASK,
} from "./constants";

import Bh from '../../helpers/BoardHelper'

const initialState = data;

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_BOARD_INDEX:
      return Bh.serCurrentBoardIndex(state, action.payload);

    case ADD_BOARD:
      return Bh.addBoard(state, action.payload);
    case EDIT_BOARD_TITLE:
      return Bh.editBoardTitle(state, action.payload);
    case EDIT_BOARD_COLOR:
      return Bh.editBoardColor(state, action.payload);
    case DELETE_BOARD:
      return Bh.deleteBoard(state, action.payload);


    case ADD_LIST:
      const { boardsIndex, listTitle,} = action.payload;
      return {
        ...state,
        boards: state.boards.map((board, index) => {
          if (index === boardsIndex) {
            let newBoard = board;
            newBoard.list.push({
              listId: uuid.v4(),
              title: listTitle,
              task: []
            });
            return newBoard;
          } else {
            return board;
          }
        })
      };
    case ADD_TASK:
      const { boardIndex, listIndex, taskTitle, taskContent } = action.payload;
      return {
        ...state,
        boards: state.boards.map((board, index) => {
          if (index === boardIndex) {
            let newBoard = board;
            newBoard.list[listIndex].task.push({
              taskId: uuid.v4(),
              title: taskTitle,
              content: taskContent,
            });
            return newBoard;
          } else {
            return board;
          }
        })
      };
    case DELETE_LIST:
      return {
        ...state,
        boards: state.boards.map((board, j) => {
          if (j === action.payload.index) {
            let newBoard = board;
            newBoard.list = newBoard.list.filter(list => list.listId !== action.payload.listId);
            return newBoard;
          } else {
            return board;
          }
        })
      };
    case DELETE_TASK:
      return {
        ...state,
        boards: state.boards.map((board, j) => {
          if (j === action.payload.index) {
            let newBoard = board;
            newBoard.list[action.payload.listId].task = newBoard.list[action.payload.listId].task.filter(task => {
              return task.taskId !== action.payload.task
            });
            return newBoard;
          } else {
            return board;
          }
        })
      };
    case MOVE_LIST:
      const { sourceIndex, destinationIndex, index } = action.payload;
      return {
        ...state,
        boards: state.boards.map((board, j) => {
          if (j === index) {
            let newBoard = board;
            const list = newBoard.list[sourceIndex];
            newBoard.list.splice(sourceIndex, 1);
            newBoard.list.splice(destinationIndex, 0, list);
            return newBoard;
          } else {
            return board;
          }
        })
      };
    case MOVE_TASK:
      const { indeex, sourceeIndex, sourceListIndex, destinationnIndex, destinationListIndex } = action.payload;
      return {
        ...state,
        boards: state.boards.map((board, j) => {
          if (j === indeex) {
            let newBoard = board;
            let listIndex;
            let desditnIndex;
            newBoard.list.forEach((list, index) => {
              if (list.listId === sourceListIndex) {
                listIndex = index;
              }
              if (list.listId === destinationListIndex) {
                desditnIndex = index;
              }
            });
            const task = board.list[listIndex].task[sourceeIndex];
            board.list[listIndex].task.splice(sourceeIndex, 1);
            board.list[desditnIndex].task.splice(destinationnIndex, 0, task);
            return newBoard;
          } else {
            return board;
          }
        })
      };
    case EDIT_TASK:
      return {
        ...state,
        boards: state.boards.map((board, j) => {
          if (j === action.payload.boardIndex) {
            let newBoard = board;
            newBoard.list[action.payload.listIndex].task[action.payload.taskId] = {
              ...newBoard.list[action.payload.listIndex].task[action.payload.taskId],
              title: action.payload.taskTitle,
              content: action.payload.taskContent
            };
            return newBoard;
          } else {
            return board;
          }
        })
      };
    case EDIT_COLUMN:
      return {
        ...state,
        boards: state.boards.map((board, j) => {
          if (j === action.payload.boardIndex) {
            let newBoard = board;
            newBoard.list[action.payload.listIndex] = {
              ...newBoard.list[action.payload.listIndex],
              title: action.payload.listTitle,
            };
            return newBoard;
          } else {
            return board;
          }
        })
      };
    default:
      return state;
  }
};

export default rootReducer;