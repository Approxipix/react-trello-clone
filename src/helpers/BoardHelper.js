class Board {
  static addBoard(state, payload) {
    const { boardId, boardTitle, boardColor } = payload;
    return {
      ...state,
      [boardId]: {
        _boardId: boardId,
        title: boardTitle,
        color: boardColor,
        lists: [],
      }
    }
  }

  static addListToBoard(state, payload) {
    const { boardId, newListId } = payload;
    return {
      ...state,
      [boardId]: {
        ...state[boardId],
        lists: state[boardId].lists.concat(newListId)
      }
    }
  }

  static deleteListFromBoard(state, payload) {
    const { boardId, listId: deleteListId } = payload;
    return {
      ...state,
      [boardId]: {
        ...state[boardId],
        lists: state[boardId].lists.filter(listId => listId !== deleteListId)
      },
    };
  }

  static editBoardTitle(state, payload) {
    const { boardId, boardTitle } = payload;
    return {
      ...state,
      [boardId]: {
        ...state[boardId],
        title: boardTitle
      }
    };
  }

  static editBoardColor(state, payload) {
    const { boardId, boardColor } = payload;
    return {
      ...state,
      [boardId]: {
        ...state[boardId],
        color: boardColor
      }
    };
  }

  static deleteBoard(state, payload) {
    const { boardId } = payload;
    const { [boardId]: deletedBoard, ...restOfBoards } = state;
    return restOfBoards;
  }

  static moveList(state, payload) {
    const { boardId, sourceIndex, destinationIndex } = payload;
    const newLists = Array.from(state[boardId].lists);
    const [removedList] = newLists.splice(sourceIndex, 1);
    newLists.splice(destinationIndex, 0, removedList);
    return {
      ...state,
      [boardId]: {
        ...state[boardId],
        lists: newLists
      }
    };
  }

  static moveListToAnotherBoard(state, payload) {
    const { boardId, newBoardId, listId, newListPosition } = payload;
    const oldBoardLists = Array.from(state[boardId].lists);
    const [removedList] = oldBoardLists.splice(oldBoardLists.indexOf(listId), 1);
    const newBoardList = Array.from(state[newBoardId].lists);
    newBoardList.splice(newListPosition, 0, removedList);
    return {
      ...state,
      [boardId]: {
        ...state[boardId],
        lists: oldBoardLists
      },
      [newBoardId]: {
        ...state[newBoardId],
        lists: newBoardList
      }
    };
  }
}

export default Board;
