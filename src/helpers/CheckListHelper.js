class CheckList {
  static addCheckList(state, payload) {
    const { checkListId, checkListTitle,} = payload;
    return {
      ...state,
      [checkListId]: {
        _checkListId: checkListId,
        title: checkListTitle,
        items: []
      }
    }
  }

  static editCheckListTitle(state, payload) {
    const {checkListId, checkListTitle} = payload;
    return {
      ...state,
      [checkListId]: {
        ...state[checkListId],
        title: checkListTitle,
      }
    }
  }

  static deleteCheckList(state, payload) {
    const { checkListId } = payload;
    const { [checkListId]: deletedList, ...restOfLists } = state;
    return restOfLists;
  }


  static addCheckListItem(state, payload) {
    const { checkListTitle, checkListId} = payload;
    return {
      ...state,
      [checkListId]: {
        ...state[checkListId],
        items: [...state[checkListId].items.concat({
          status: false,
          description: checkListTitle,
        })],
      }
    };
  }

  static updateCheckListItem(state, payload) {
    const { status, checkListId, checkListItemIndex} = payload;
    return {
      ...state,
      [checkListId]: {
        ...state[checkListId],
        items: state[checkListId].items.map((item, index) => {
          if (index === checkListItemIndex) {
            return {
              ...state[checkListId].items[checkListItemIndex],
              status: status
            }
          } else {
            return item
          }
        })
      }
    };
  }

  static deleteCheckListItem(state, payload) {
    const {checkListId, checkListItemIndex } = payload;
    return {
      ...state,
      [checkListId]: {
        ...state[checkListId],
        items: state[checkListId].items.filter((item, index) => index !== checkListItemIndex)
      }
    };
  }
}

export default CheckList;
