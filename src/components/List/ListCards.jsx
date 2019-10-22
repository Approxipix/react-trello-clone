import React, { Component } from 'react';
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd';
import Card from '../Card/Card'

const CardLIst = styled.div`
  min-height: 2rem;
  position: relative;
  padding: .5rem;
  flex-grow: 1;
  overflow: auto;
`;

const InnerList = (props) => {
  const { cardsId, isDraggingOver } = props;
  return cardsId.map((cardId, index) =>
    <Card
      isDraggingOver={isDraggingOver}
      key={index}
      index={index}
      cardId={cardId}
    />
  )
};

class ListCards extends Component {
  componentDidUpdate = prevProps => {
    const { cardsId } = this.props;
    if (
      cardsId[cardsId.length - 2] ===
      prevProps.cardsId[prevProps.cardsId.length - 1]
    ) {
      this.scrollToBottom();
    }
  };

  scrollToBottom = () => {
    this.listEnd.scrollIntoView();
  };

  render() {
    const { listId, cardsId } = this.props;
    return (
      <Droppable
        type={'task'}
        droppableId={`${listId}`}
      >
        {(provided, { isDraggingOver }) => (
          <CardLIst
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={isDraggingOver}
          >
            <InnerList
              isDraggingOver={isDraggingOver}
              cardsId={cardsId}
            />
            {provided.placeholder}
            <div ref={el => this.listEnd = el}/>
          </CardLIst>
        )}
      </Droppable>
    )
  }
}

export default ListCards;
