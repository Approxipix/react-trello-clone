import uuid from "uuid";

const data = {
  currentBoardIndex: null,
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
            },
            {
              _cardId: uuid.v4(),
              title: 'A Test 2',
              description: 'A2',
            },
            {
              _cardId: uuid.v4(),
              title: 'A Test 2',
              description: 'A2',
            },
            {
              _cardId: uuid.v4(),
              title: 'A Test 2',
              description: 'A2',
            },
            {
              _cardId: uuid.v4(),
              title: 'A Test 2',
              description: 'A2',
            },
            {
              _cardId: uuid.v4(),
              title: 'A Test 2',
              description: 'A2',
            },
            {
              _cardId: uuid.v4(),
              title: 'A Test 2',
              description: 'A2',
            },

            {
              _cardId: uuid.v4(),
              title: 'A Test 2',
              description: 'A2',
            },
            {
              _cardId: uuid.v4(),
              title: 'A Test 2',
              description: 'A2',
            },
            {
              _cardId: uuid.v4(),
              title: 'A Test 2',
              description: 'A2',
            },
            {
              _cardId: uuid.v4(),
              title: 'A Test 2',
              description: 'A2',
            },
            {
              _cardId: uuid.v4(),
              title: 'A Test 2',
              description: 'A2',
            },
            {
              _cardId: uuid.v4(),
              title: 'A Test 2',
              description: 'A2',
            },
            {
              _cardId: uuid.v4(),
              title: 'A Test 3',
              description: 'A3',
            }
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
            },
            {
              cardId: uuid.v4(),
              title: 'C Test 2',
              description: 'C2',
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
            },
            {
              _cardId: uuid.v4(),
              title: 'B Test 1',
              description: 'B1',
            },
          ],
        },
      ],
    },
  ],
};

export default data;
