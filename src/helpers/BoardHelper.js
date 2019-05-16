import uuid from "uuid";

class Board {
  static serCurrentBoardID(state, payload) {
    return {
      ...state,
      currentBoardID: payload
    }
  }

  static addBoard(state, payload) {
    const { boardTitle } = payload;
    const newBoardId = uuid.v4();
    return {
      ...state,
      boards: {
        ...state.boards,
        [newBoardId]: {
          _boardId: newBoardId,
          title: boardTitle,
          color: state.colors[0],
          lists: [],
        }
      }
    }
  }

  static editBoardTitle(state, payload) {
    const { boardId, boardTitle } = payload;
    return {
      ...state,
      boards: {
        ...state.boards,
        [boardId]: {
          ...state.boards[boardId],
          title: boardTitle
        }
      }
    };
  }

  static editBoardColor(state, payload) {
    const { boardId, boardColor } = payload;
    return {
      ...state,
      boards: {
        ...state.boards,
        [boardId]: {
          ...state.boards[boardId],
          color: boardColor
        }
      }
    };
  }

  static deleteBoard(state, payload) {
    const { boardId } = payload;
    const { [boardId]: deletedBoard, ...restOfBoards } = state.boards;
    return {
      ...state,
      boards: restOfBoards
    }
  }
}

export default Board;
