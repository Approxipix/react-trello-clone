import uuid from "uuid";

class Board {
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

  static deleteBoard(state, payload) {
    return {
      ...state,
      boards: state.boards.filter(board => board._id !== payload._id)
    }
  }

  static serCurrentBoardIndex(state, payload) {
    return {
      ...state,
      currentBoardIndex: payload
    }
  }
}

export default Board;
