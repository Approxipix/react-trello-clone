import React, { Component } from 'react';
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd';
import Card from '../Card/Card'

const CardLIst = styled.div`
  min-height: 4rem;
  position: relative;
  padding: .5rem .5rem 0;
  flex-grow: 1;
  overflow: auto;
`;

class InnerList extends Component {
  render() {
    const { cardsId, listId } = this.props;
    return (
      cardsId.map((cardId, index) =>
        <Card
          isDraggingOver={this.props.isDraggingOver}
          key={index}
          index={index}
          listId={listId}
          cardId={cardId}
        />
      )
    )
  }
}

class ListCards extends Component {
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
              listId={listId}
              cardsId={cardsId}
            />
            {provided.placeholder}
          </CardLIst>
        )}
      </Droppable>
    )
  }
}

export default ListCards;
