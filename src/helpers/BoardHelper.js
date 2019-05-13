import uuid from "uuid";

class Board {
  static serCurrentBoardIndex(state, payload) {
    return {
      ...state,
      currentBoardIndex: payload
    }
  }

  static addBoard(state, payload) {
    const { title } = payload;
    return {
      ...state,
      boards: [
        ...state.boards,
        {
          _id: uuid.v4(),
          title: title,
          color: '#2E7EAF',
          list: [],
        }
      ]
    }
  }

  static editBoardTitle(state, payload) {
    let newBoardsState = state.boards;
    newBoardsState[state.currentBoardIndex].title = payload.title;
    return {
      ...state,
      boards: newBoardsState
    };
  }

  static editBoardColor(state, payload) {
    let newBoardsState = state.boards;
    newBoardsState[state.currentBoardIndex].color = payload.color;
    return {
      ...state,
      boards: newBoardsState.map(item => item)
    };
  }

  static deleteBoard(state, payload) {
    return {
      ...state,
      boards: state.boards.filter(board => board._id !== payload._id)
    }
  }
}

export default Board;
