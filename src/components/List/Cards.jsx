import React, { Component, PureComponent } from 'react';
import { connect } from "react-redux/es/alternate-renderers";
import styled from 'styled-components'
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Card from '../Card/Card'

const CardLIst = styled.div`
  min-height: 5rem;
  
  
  position: relative;
  padding: 0 .5rem;
  background-color: ${props => (props.isDraggingOver ? '#c1c1c1' : '#dfe1e6')}
  flex-grow: 1;
  
  overflow: auto;
`;

class InnerList extends Component {
  render() {
    const { cardsId, listId } = this.props;
    return (
      <>
        {cardsId.map((cardId, index) =>
          <Card
            isDraggingOver={this.props.isDraggingOver}

            key={index}
            index={index}
            listId={listId}
            cardId={cardId}
          />
        )}
      </>
    )
  }
}

class Cards extends Component {
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


export default Cards;
