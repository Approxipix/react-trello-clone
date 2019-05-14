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
              content: 'A2',
            },
            {
              _cardId: uuid.v4(),
              title: 'A Test 2',
              content: 'A2',
            },
            {
              _cardId: uuid.v4(),
              title: 'A Test 2',
              content: 'A2',
            },
            {
              _cardId: uuid.v4(),
              title: 'A Test 2',
              content: 'A2',
            },
            {
              _cardId: uuid.v4(),
              title: 'A Test 2',
              content: 'A2',
            },
            {
              _cardId: uuid.v4(),
              title: 'A Test 2',
              content: 'A2',
            },
            {
              _cardId: uuid.v4(),
              title: 'A Test 2',
              content: 'A2',
            },

            {
              _cardId: uuid.v4(),
              title: 'A Test 2',
              content: 'A2',
            },
            {
              _cardId: uuid.v4(),
              title: 'A Test 2',
              content: 'A2',
            },
            {
              _cardId: uuid.v4(),
              title: 'A Test 2',
              content: 'A2',
            },
            {
              _cardId: uuid.v4(),
              title: 'A Test 2',
              content: 'A2',
            },
            {
              _cardId: uuid.v4(),
              title: 'A Test 2',
              content: 'A2',
            },
            {
              _cardId: uuid.v4(),
              title: 'A Test 2',
              content: 'A2',
            },
            {
              _cardId: uuid.v4(),
              title: 'A Test 3',
              content: 'A3',
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
              content: 'B1',
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
              content: 'C1',
            },
            {
              cardId: uuid.v4(),
              title: 'C Test 2',
              content: 'C2',
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
              content: 'A1',
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
              content: 'B1',
            },
            {
              _cardId: uuid.v4(),
              title: 'B Test 1',
              content: 'B1',
            },
          ],
        },
      ],
    },
  ],
};

export default data;
