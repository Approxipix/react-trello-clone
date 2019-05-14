import uuid from "uuid";

class Board {
  static serCurrentBoardIndex(state, payload) {
    return {
      ...state,
      currentBoardIndex: payload
    }
  }

  static addBoard(state, payload) {
    const { boardTitle } = payload;
    return {
      ...state,
      boards: [
        ...state.boards,
        {
          _boardId: uuid.v4(),
          title: boardTitle,
          color: '#2E7EAF',
          lists: [],
        }
      ]
    }
  }

  static editBoardTitle(state, payload) {
    const { boards, currentBoardIndex } = state;
    const { boardTitle } = payload;
    let currentBoard = boards[currentBoardIndex];
    currentBoard.title = boardTitle;
    return {
      ...state,
      boards: Object.assign([], boards, { [currentBoardIndex]: currentBoard })
    };
  }

  static editBoardColor(state, payload) {
    const { boards, currentBoardIndex } = state;
    const { boardColor } = payload;
    let currentBoard = boards[currentBoardIndex];
    currentBoard.color = boardColor;
    return {
      ...state,
      boards: Object.assign([], boards, { [currentBoardIndex]: currentBoard })
    };
  }

  static deleteBoard(state, payload) {
    const { _boardId } = payload;
    return {
      ...state,
      boards: state.boards.filter(board => board._boardId !== _boardId)
    }
  }
}

export default Board;
