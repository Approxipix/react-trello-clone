import uuid from "uuid";

const boards = [
  {
    _boardId: uuid.v4(),
    title: 'Started board',
    color: '#CD5A91',
    lists: [],
  },
  {
    _boardId: uuid.v4(),
    title: 'Test Board',
    color: '#2E7EAF',
    lists: [
      {
        _listId: uuid.v4(),
        title: 'Planned Tasks',
        cards: [
          {
            _cardId: uuid.v4(),
            title: "Drag card to the 'Completed' List to show it's done",
            description: '',
            cardLabels: [],
            checkLists: [],
          },
          {
            _cardId: uuid.v4(),
            title: "[CLICK TO OPEN]",
            description: "Click Edit ↑ to edit a card's description. To change a card's title just click it!",
            cardLabels: [],
            checkLists: [],
          },
          {
            _cardId: uuid.v4(),
            title: "[Check List]",
            description: "Use the buttons on the right to add checklists. →",
            cardLabels: [],
            checkLists: [
              {
                _checkListId: uuid.v4(),
                title: 'This is a checklist with stuff you can add to cards.',
                items: [
                  { status: true, description: 'Add another checklist and some items using the Checklist button above.', },
                  { status: false, description: 'Add another Label.', },
                ]
              }
            ],
          },
          {
            _cardId: uuid.v4(),
            title: "[Labels]",
            description: "Use the buttons on the right to add checklists. →",
            cardLabels: [
              { _labelId: 0, color: '#61BC4F', },
              { _labelId: 3, color: '#EB5A46', },
              { _labelId: 4, color: '#C376E0', },
            ],
            checkLists: [],
          },
        ],
      },
      {
        _listId: uuid.v4(),
        title: 'Work In Progress',
        cards: [],
      },
      {
        _listId: uuid.v4(),
        title: 'Completed',
        cards: [
          {
            _cardId: uuid.v4(),
            title: "Click 'Show Menu' ↑ to edit a board details.",
            description: "",
            cardLabels: [
              { _labelId: 3, color: '#EB5A46', },
            ],
            checkLists: [],
          },
        ],
      }
    ],
  },
];

export default boards;
