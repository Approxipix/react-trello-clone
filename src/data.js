import uuid from "uuid";

const boards = [
  {
    _boardId: uuid.v4(),
    title: 'Board - 1',
    color: '#2E7EAF',
    lists: [
      {
        _listId: uuid.v4(),
        title: 'Board - 1 List - 1',
        cards: [
          {
            _cardId: uuid.v4(),
            title: 'Board - 1 List - 1 Card - 1',
            description: '',
            cardLabels: [],
            checkLists: [],
          },
          {
            _cardId: uuid.v4(),
            title: 'Board - 1 List - 1 Card - 2',
            description: '',
            cardLabels: [],
            checkLists: [],
          },
          {
            _cardId: uuid.v4(),
            title: 'Board - 1 List - 1 Card - 3',
            description: '',
            cardLabels: [],
            checkLists: [],
          },
        ],
      },
      {
        _listId: uuid.v4(),
        title: 'Board - 1 List - 2',
        cards: [
          {
            _cardId: uuid.v4(),
            title: 'Board - 1 List - 2 Card - 1',
            description: '',
            cardLabels: [],
            checkLists: [],
          },
          {
            _cardId: uuid.v4(),
            title: 'Board - 1 List - 2 Card - 2',
            description: '',
            cardLabels: [],
            checkLists: [],
          },
        ],
      }
    ],
  },
  {
    _boardId: 'Board2',
    title: 'Board - 2',
    color: '#2E7EAF',
    lists: [
      {
        _listId: 'Board2List1',
        title: 'Board - 2 List - 1',
        cards: [
          {
            _cardId: 'Board2List1Card1',
            title: 'Board - 2 List - 1 Card - 1',
            description: '',
            cardLabels: [],
            checkLists: [],
          },
          {
            _cardId: 'Board2List1Card2',
            title: 'Board - 2 List - 1 Card - 2',
            description: '',
            cardLabels: [],
            checkLists: [],
          },
          {
            _cardId: 'Board2List1Card3',
            title: 'Board - 2 List - 1 Card - 3',
            description: '',
            cardLabels: [],
            checkLists: [],
          },
        ],
      },
    ],
  }
];

export default boards;
