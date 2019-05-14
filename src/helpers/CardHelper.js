import uuid from "uuid";

class Card {
  static addCard(state, payload) {
    const { boards, currentBoardIndex } = state;
    const { cardTitle, cardDescription, listIndex } = payload;
    const currentBoard = boards[currentBoardIndex];
    currentBoard.lists[listIndex].cards = [
      ...currentBoard.lists[listIndex].cards,
      {
        _cardId: uuid.v4(),
        title: cardTitle,
        description: cardDescription,
      }
    ];
    return {
      ...state,
      boards: Object.assign([], boards, { [currentBoardIndex]: currentBoard })
    };
  }

  static editCard(state, payload) {
    const { boards, currentBoardIndex } = state;
    const { cardTitle, cardDescription, cardIndex, listIndex } = payload;
    const currentBoard = boards[currentBoardIndex];
    currentBoard.lists[listIndex].cards[cardIndex].title = cardTitle;
    currentBoard.lists[listIndex].cards[cardIndex].description = cardDescription;
    return {
      ...state,
      boards: Object.assign([], boards, { [currentBoardIndex]: currentBoard })
    };
  }

  static moveCard(state, payload) {
    const { boards, currentBoardIndex } = state;
    const { sourceIndex, destinationIndex, sourceListIndex, destinationListIndex } = payload;
    const currentBoard = boards[currentBoardIndex];
    let sourceList = currentBoard.lists[sourceListIndex];
    let destinationList = currentBoard.lists[destinationListIndex];
    let sourceTask = sourceList.cards[sourceIndex];
    sourceList.cards.splice(sourceIndex, 1);
    destinationList.cards.splice(destinationIndex, 0, sourceTask);
    return {
      ...state,
      boards: Object.assign([], boards, { [currentBoardIndex]: currentBoard })
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
