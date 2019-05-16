import uuid from "uuid";

class Card {
  static addCard(state, payload) {
    const { cardTitle, listId } = payload;
    const newCardId = uuid.v4();
    return {
      ...state,
      lists: {
        ...state.lists,
        [listId]: {
          ...state.lists[listId],
          cards: state.lists[listId].cards.concat(newCardId)
        },
      },
      cards: {
        ...state.cards,
        [newCardId]: {
          _cardId: newCardId,
          title: cardTitle,
          description: '',
          cardLabels: [],
          checkLists: [],
        }
      }
    }
  }

  static addLabelToCard(state, payload) {
    const { cardId, cardLabel} = payload;
    const isLabelExist = state.cards[cardId].cardLabels.some(label => {
      return label._labelId === cardLabel._labelId
    });
    let newCardLabel = [...state.cards[cardId].cardLabels];
    if (isLabelExist) {
      newCardLabel = newCardLabel.filter(label => label._labelId !== cardLabel._labelId);
    } else {
      newCardLabel = newCardLabel.concat(cardLabel);
    }
    return {
      ...state,
      cards: {
        ...state.cards,
        [cardId]: {
          ...state.cards[cardId],
          cardLabels: newCardLabel,
        }
      }
    }
  }

  static editCardTitle(state, payload) {
    const { cardTitle, cardId } = payload;
    return {
      ...state,
      cards: {
        ...state.cards,
        [cardId]: {
          ...state.cards[cardId],
          title: cardTitle
        }
      }
    };
  }

  static editCardDesc(state, payload) {
    const { cardDescription, cardId } = payload;
    return {
      ...state,
      cards: {
        ...state.cards,
        [cardId]: {
          ...state.cards[cardId],
          description: cardDescription
        }
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
      const newCards = Array.from(state.lists[sourceListIndex].cards);
      const [removedCard] = newCards.splice(sourceIndex, 1);
      newCards.splice(destinationIndex, 0, removedCard);
      return {
        ...state,
        lists: {
          ...state.lists,
          [sourceListIndex]: { ...state.lists[sourceListIndex], cards: newCards }
        }
      };
    }
    // Move card from one list to another
    const sourceCards = Array.from(state.lists[sourceListIndex].cards);
    const [removedCard] = sourceCards.splice(sourceIndex, 1);
    const destinationCards = Array.from(state.lists[destinationListIndex].cards);
    destinationCards.splice(destinationIndex, 0, removedCard);
    return {
      ...state,
      lists: {
        ...state.lists,
        [sourceListIndex]: { ...state.lists[sourceListIndex], cards: sourceCards },
        [destinationListIndex]: { ...state.lists[destinationListIndex], cards: destinationCards }
      }
    };
  }

  static deleteCard(state, payload) {
    const { boards, currentBoardIndex } = state;
    const { _cardId, listIndex } = payload;
    const currentBoard = boards[currentBoardIndex];
    currentBoard.lists[listIndex].cards = currentBoard.lists[listIndex].cards.filter(card =>{
      return  card._cardId !== _cardId;
    });
    return {
      ...state,
      boards: Object.assign([], boards, { [currentBoardIndex]: currentBoard })
    };
  }
}

export default Card;
