import uuid from "uuid";

const data = {
  currentBoardIndex: null,
  labels: [
    {
      _labelId: 0,
      color: '#61BC4F',
    },
    {
      _labelId: 1,
      color: '#F2D600',
    },
    {
      _labelId: 2,
      color: '#FF9F1A',
    },
    {
      _labelId: 3,
      color: '#EB5A46',
    },
    {
      _labelId: 4,
      color: '#C376E0',
    },
    {
      _labelId: 5,
      color: '#0078BF',
    }
  ],
  boards: [
    {
      _boardId: uuid.v4(),
      title: 'ToDo',
      color: '#2E7EAF',
      lists: [
        {
          _listId: uuid.v4(),
          title: 'A',
          cards: [
            {
              _cardId: uuid.v4(),
              title: 'A Test 2',
              description: 'A2',
              cardLabels: [],
            },
            {
              _cardId: uuid.v4(),
              title: 'A Test 2',
              description: 'A2',
              cardLabels: [],
            },
            {
              _cardId: uuid.v4(),
              title: 'A Test 2',
              description: 'A2',
              cardLabels: [],
            },
            {
              _cardId: uuid.v4(),
              title: 'A Test 2',
              description: 'A2',
              cardLabels: [],
            },
          ]
        },
        {
          _listId: uuid.v4(),
          title: 'B',
          cards: [
            {
              _cardId: uuid.v4(),
              title: 'B Test 1',
              description: 'B1',
              cardLabels: [],
            },
          ],
        },
        {
          _listId: uuid.v4(),
          title: 'C',
          cards: [
            {
              _cardId: uuid.v4(),
              title: 'C Test 1',
              description: 'C1',
              cardLabels: [],
            },
            {
              cardId: uuid.v4(),
              title: 'C Test 2',
              description: 'C2',
              cardLabels: [],
            },
          ],
        },
      ],
    },
    {
      _boardId: uuid.v4(),
      title: 'Test Board',
      color: '#00603d',
      lists: [
        {
          _listId: uuid.v4(),
          title: 'A',
          cards: [
            {
              _cardId: uuid.v4(),
              title: 'A Test 1',
              description: 'A1',
              cardLabels: [],
            },
          ],
        },
        {
          _listId: uuid.v4(),
          title: 'B',
          cards: [
            {
              _cardId: uuid.v4(),
              title: 'B Test 1',
              description: 'B1',
              cardLabels: [],
            },
            {
              _cardId: uuid.v4(),
              title: 'B Test 1',
              description: 'B1',
              cardLabels: [],
            },
          ],
        },
      ],
    },
  ],
};

export default data;
