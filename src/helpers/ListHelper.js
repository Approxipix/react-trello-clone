import uuid from "uuid";

class List {
  static addList(state, payload) {
    const { listTitle, boardId } = payload;
    const newListId = uuid.v4();
    return {
      ...state,
      boards: {
        ...state.boards,
        [boardId]: {
          ...state.boards[boardId],
          lists: state.boards[boardId].lists.concat(newListId)
        }
      },
      lists: {
        ...state.lists,
        [newListId]: {
          _listId: newListId,
          title: listTitle,
          cards: []
        }
      }
    }
  }

  static editListTitle(state, payload) {
    const { listTitle, listId } = payload;
    return {
      ...state,
      lists: {
        ...state.lists,
        [listId]: {
          ...state.lists[listId],
          title: listTitle,
        }
      }
    };
  }

  static moveList(state, payload) {
    const { boardId, sourceIndex, destinationIndex } = payload;
    const newLists = Array.from(state.boards[boardId].lists);
    const [removedList] = newLists.splice(sourceIndex, 1);
    newLists.splice(destinationIndex, 0, removedList);
    return {
      ...state,
      boards: {
        ...state.boards,
        [boardId]: {
          ...state.boards[boardId],
          lists: newLists
        }
      }
    };
  }

  static deleteList(state, payload) {
    const { boardId, listId } = payload;
    const { [listId]: deletedList, ...restOfLists } = state.lists;
    return {
      ...state,
      boards: {
        ...state.boards,
        [boardId]: {
          ...state.boards[boardId],
          lists: state.boards[boardId].lists.filter(listId => listId !== deletedList._listId)
        }
      },
      lists: restOfLists
    };
  }
}

export default List;
