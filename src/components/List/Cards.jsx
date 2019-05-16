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
    const { cards, listIndex } = this.props;
    if (!cards) return null;
    return (
      <>
        {cards.map((card, index) =>
          <Card
            isDraggingOver={this.props.isDraggingOver}
            key={index}
            listIndex={listIndex}
            cardIndex={index}
          />
        )}
      </>
    )
  }
}

class Cards extends Component {
  render() {
    const { listIndex, cards } = this.props;
    return (
      <Droppable
        type={'task'}
        droppableId={`${listIndex}`}
      >
        {(provided, { isDraggingOver }) => (
          <CardLIst
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={isDraggingOver}
          >
            <InnerList
              isDraggingOver={isDraggingOver}
              listIndex={listIndex}
              cards={cards}
            />
            {provided.placeholder}
            {/*<div*/}
            {/*  style={{ float: "left", clear: "both" }}*/}
            {/*  ref={el => {*/}
            {/*    this.listEnd = el;*/}
            {/*  }}*/}
            {/*/>*/}
          </CardLIst>
        )}
      </Droppable>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { rootReducer } = state;
  const board = rootReducer.boards[rootReducer.currentBoardIndex];
  const list = !!board && board.lists[ownProps.listIndex];
  const cards = !!list && list.cards;
  return {
    list: list,
    cards: cards,
  }
}

export default connect(mapStateToProps)(Cards);
