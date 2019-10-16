class List {
  static addList(state, payload) {
    const { listTitle, newListId } = payload;
    return {
      ...state,
      [newListId]: {
        _listId: newListId,
        title: listTitle,
        cards: []
      }
    }
  }

  static addCardToList(state, payload) {
    const { listId, newCardId } = payload;
    return {
      ...state,
      [listId]: {
        ...state[listId],
        cards: state[listId].cards.concat(newCardId)
      },
    }
  }

  static editListTitle(state, payload) {
    const { listTitle, listId } = payload;
    return {
      ...state,
      [listId]: {
        ...state[listId],
        title: listTitle,
      }
    };
  }

  static moveCard(state, payload) {
    const {
      sourceIndex,
      destinationIndex,
      sourceListIndex,
      destinationListIndex
    } = payload;
    // Move within the same list
    if (sourceListIndex === destinationListIndex) {
      const newCards = Array.from(state[sourceListIndex].cards);
      const [removedCard] = newCards.splice(sourceIndex, 1);
      newCards.splice(destinationIndex, 0, removedCard);
      return {
        ...state,
        [sourceListIndex]: { ...state[sourceListIndex], cards: newCards }
      };
    }
    // Move card from one list to another
    const sourceCards = Array.from(state[sourceListIndex].cards);
    const [removedCard] = sourceCards.splice(sourceIndex, 1);
    const destinationCards = Array.from(state[destinationListIndex].cards);
    destinationCards.splice(destinationIndex, 0, removedCard);
    return {
      ...state,
      [sourceListIndex]: { ...state[sourceListIndex], cards: sourceCards },
      [destinationListIndex]: { ...state[destinationListIndex], cards: destinationCards }
    };
  }

  static moveAllCards(state, payload) {
    const { listId, newListId } = payload;
    return {
      ...state,
      [listId]: {
        ...state[listId],
        cards: [],
      },
      [newListId]: {
        ...state[newListId],
        cards: state[newListId].cards.concat(state[listId].cards)
      }
    }
  }

  static deleteList(state, payload) {
    const { listId } = payload;
    const { [listId]: deletedList, ...restOfLists } = state;
    return restOfLists;
  }

  static deleteCardFromList(state, payload) {
    const { listId, cardId: deleteCardId } = payload;
    return {
      ...state,
      [listId]: {
        ...state[listId],
        cards: state[listId].cards.filter(cardId => cardId !== deleteCardId)
      },
    };
  }

  static deleteAllCards(state, payload) {
    const { listId } = payload;
    return {
      ...state,
      [listId]: {
        ...state[listId],
        cards: []
      },
    };
  }


}

export default List;
