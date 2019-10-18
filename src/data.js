const boards = [
  {
    _boardId: 'b1',
    title: 'Started board',
    color: '#CD5A91',
    lists: [],
  },
  {
    _boardId: 'b2',
    title: 'Test Board',
    color: '#2E7EAF',
    lists: [
      {
        _listId: 'b2l1',
        title: 'Planned Tasks',
        cards: [
          {
            _cardId: 'b2l1c1',
            title: "Drag card to the 'Completed' List to show it's done",
            description: '',
            cardLabels: [],
            checkLists: [],
          },
          {
            _cardId: 'b2l1c2',
            title: "[CLICK TO OPEN]",
            description: "Click Edit ↑ to edit a card's description. To change a card's title just click it!",
            cardLabels: [],
            checkLists: [],
          },
          {
            _cardId: 'b2l1c3',
            title: "[Check List]",
            description: "Use the buttons on the right to add checklists. →",
            cardLabels: [],
            checkLists: [
              {
                _checkListId: 'b2l1c3ch1',
                title: 'This is a checklist with stuff you can add to cards.',
                items: [
                  { status: true, description: 'Add another checklist and some items using the Checklist button above.' },
                  { status: false, description: 'Add another Label.' },
                ]
              }
            ],
          },
          {
            _cardId: 'b2l1c4',
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
        _listId: 'b2l2',
        title: 'Work In Progress',
        cards: [],
      },
      {
        _listId: 'b2l3',
        title: 'Completed',
        cards: [
          {
            _cardId: 'b2l3c1',
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
