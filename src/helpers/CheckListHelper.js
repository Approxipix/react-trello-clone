class CheckList {
  static addCheckList(state, payload) {
    const { boards, currentBoardIndex } = state;
    const { checkListTitle, cardIndex, listIndex,} = payload;
    const currentBoard = boards[currentBoardIndex];
    let checkLists = currentBoard.lists[listIndex].cards[cardIndex].checkLists;
    checkLists = [
      ...checkLists,
      {
        title: checkListTitle,
        items: []
      }
    ];
    currentBoard.lists[listIndex].cards[cardIndex].checkLists = checkLists;
    return {
      ...state,
      boards: Object.assign([], boards, { [currentBoardIndex]: currentBoard })
    };
  }

  static addCheckListItem(state, payload) {
    const { boards, currentBoardIndex } = state;
    const { checkListTitle, cardIndex, listIndex, checkListIndex} = payload;
    const currentBoard = boards[currentBoardIndex];
    let checkLists = currentBoard.lists[listIndex].cards[cardIndex].checkLists[checkListIndex].items;
    checkLists = [
      ...checkLists,
      {
        status: false,
        description: checkListTitle,
      }
    ];
    currentBoard.lists[listIndex].cards[cardIndex].checkLists[checkListIndex].items = checkLists;
    return {
      ...state,
      boards: Object.assign([], boards, { [currentBoardIndex]: currentBoard })
    };
  }

  static updateCheckListItem(state, payload) {
    const { boards, currentBoardIndex } = state;
    const {status, checkBoxItemIndex, cardIndex, listIndex, checkBoxIndex} = payload;
    const currentBoard = boards[currentBoardIndex];
    let checkListsItems = currentBoard.lists[listIndex].cards[cardIndex].checkLists[checkBoxIndex].items[checkBoxItemIndex];
    checkListsItems.status = status;
    currentBoard.lists[listIndex].cards[cardIndex].checkLists[checkBoxIndex].items[checkBoxItemIndex] = checkListsItems;
    return {
      ...state,
      boards: Object.assign([], boards, { [currentBoardIndex]: currentBoard })
    };
  }

  static editCheckListTitle(state, payload) {
    const { boards, currentBoardIndex } = state;
    const {title, cardIndex, listIndex, checkBoxIndex} = payload;
    const currentBoard = boards[currentBoardIndex];
    let checkListsItems = currentBoard.lists[listIndex].cards[cardIndex].checkLists[checkBoxIndex];
    checkListsItems.title = title;
    currentBoard.lists[listIndex].cards[cardIndex].checkLists[checkBoxIndex] = checkListsItems;
    return {
      ...state,
      boards: Object.assign([], boards, { [currentBoardIndex]: currentBoard })
    };
  }

  static deleteCheckList(state, payload) {
    const { boards, currentBoardIndex } = state;
    const {cardIndex, listIndex, checkBoxIndex} = payload;
    const currentBoard = boards[currentBoardIndex];
    let checkLists = currentBoard.lists[listIndex].cards[cardIndex].checkLists;
    checkLists = checkLists.filter((item, index) => index !== checkBoxIndex);
    currentBoard.lists[listIndex].cards[cardIndex].checkLists = checkLists;
    return {
      ...state,
      boards: Object.assign([], boards, { [currentBoardIndex]: currentBoard })
    };
  }

  static deleteCheckListItem(state, payload) {
    const { boards, currentBoardIndex } = state;
    const {checkBoxItemIndex, cardIndex, listIndex, checkBoxIndex} = payload;
    const currentBoard = boards[currentBoardIndex];
    let checkLists = currentBoard.lists[listIndex].cards[cardIndex].checkLists[checkBoxIndex].items;
    checkLists = checkLists.filter((item, index) => index !== checkBoxItemIndex);
    currentBoard.lists[listIndex].cards[cardIndex].checkLists[checkBoxIndex].items = checkLists;

    return {
      ...state,
      boards: Object.assign([], boards, { [currentBoardIndex]: currentBoard })
    };
  }
}

export default CheckList;
