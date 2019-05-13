import uuid from "uuid";

const data = {
  currentBoardIndex: null,
  boards: [
    {
      _id: uuid.v4(),
      title: 'ToDo',
      color: '#2E7EAF',
      list: [
        {
          listId: uuid.v4(),
          title: 'A',
          task: [
            {
              taskId: uuid.v4(),
              title: 'A Test 1',
              content: 'dadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasddadasd asd asd asdasd',
            },
            {
              taskId: uuid.v4(),
              title: 'A Test 2',
              content: 'A2',
            },
            {
              taskId: uuid.v4(),
              title: 'A Test 3',
              content: 'A3',
            }
          ],
        },
        {
          listId: uuid.v4(),
          title: 'B',
          task: [
            {
              taskId: uuid.v4(),
              title: 'B Test 1',
              content: 'B1',
            },
          ],
        },
        {
          listId: uuid.v4(),
          title: 'C',
          task: [
            {
              taskId: uuid.v4(),
              title: 'C Test 1',
              content: 'C1',
            },
            {
              taskId: uuid.v4(),
              title: 'C Test 2',
              content: 'C2',
            },
          ],
        },
      ],
    },
    {
      _id: uuid.v4(),
      title: 'Test Board',
      color: '#00603d',
      list: [
        {
          listId: uuid.v4(),
          title: 'A',
          task: [
            {
              taskId: uuid.v4(),
              title: 'A Test 1',
              content: 'A1',
            },
          ],
        },
        {
          listId: uuid.v4(),
          title: 'B',
          task: [
            {
              taskId: uuid.v4(),
              title: 'B Test 1',
              content: 'B1',
            },
            {
              taskId: uuid.v4(),
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
