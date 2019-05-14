import uuid from "uuid";

class List {
  static addList(state, payload) {
    const { boards, currentBoardIndex } = state;
    const { listTitle } = payload;
    const currentBoard = boards[currentBoardIndex];
    currentBoard.lists.push({
      _listId: uuid.v4(),
      title: listTitle,
      cards: []
    });
    return {
      ...state,
      boards: Object.assign([], boards, { [currentBoardIndex]: currentBoard })
    };
  }

  static editListTitle(state, payload) {
    const { boards, currentBoardIndex } = state;
    const { listIndex, listTitle } = payload;
    const currentBoard = boards[currentBoardIndex];
    currentBoard.lists[listIndex].title = listTitle;
    return {
      ...state,
      boards: Object.assign([], boards, { [currentBoardIndex]: currentBoard })
    };
  }

  static moveList(state, payload) {
    const { boards, currentBoardIndex } = state;
    const { sourceIndex, destinationIndex } = payload;
    const currentBoard = boards[currentBoardIndex];
    let sourceList = currentBoard.lists[sourceIndex];
    currentBoard.lists.splice(sourceIndex, 1);
    currentBoard.lists.splice(destinationIndex, 0, sourceList);
    return {
      ...state,
      boards: Object.assign([], boards, { [currentBoardIndex]: currentBoard })
    };
  }

  static deleteList(state, payload) {
    const { boards, currentBoardIndex } = state;
    const { _listId } = payload;
    const currentBoard = boards[currentBoardIndex];
    currentBoard.lists = currentBoard.lists.filter(list => list._listId !== _listId);
    return {
      ...state,
      boards: Object.assign([], boards, { [currentBoardIndex]: currentBoard })
    };
  }
}

export default List;
