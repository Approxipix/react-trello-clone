import React, { Component } from 'react';
import { connect } from "react-redux";
import { Draggable } from 'react-beautiful-dnd';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  padding: .5rem;
  border-radius: .2rem;
  background-color: #fff;
  box-shadow: 0 1px 0 rgba(9,30,66,.25);  
  transition: background-color .2s ease-in;
  &:hover {
    background-color: #f4f5f7;
  }  
  margin-bottom: .5rem;
`;

const Title = styled.h3`
  font-size: .875rem;
  color: #40424b;
  font-weight: normal;
`;

const CardLabelList = styled.div`
  display: flex;
  margin-bottom: .3rem;
`;

const CardLabelListItem = styled.div`
  height: .5rem;
  width: 2.5rem;
  border-radius: 1rem;
  margin-right: .2rem;
  background-color: ${props => props.value};
`;

class CardLabels extends Component {
  render() {
    const { cardLabels } = this.props;
    if (cardLabels.length === 0) return null;
    return  (
      <CardLabelList>
        {cardLabels.map(((label, index) => (
          <CardLabelListItem key={index} value={label.color}/>
        )))}
      </CardLabelList>
    )
  }
}

class Card extends Component {
  render() {
    const { currentBoardID, card, index, isDraggingOver} = this.props;
    return (
      <Draggable
        index={index}
        draggableId={`${card._cardId}`}
      >
        {(provided, snapshot) => (
          <>
            <Container
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
            >
              <NavLink to={`/b/${currentBoardID}/c/${card._cardId}`}>
                <CardLabels cardLabels={card.cardLabels} />
                <Title>{card.title}</Title>
              </NavLink>
            </Container>
            {isDraggingOver && provided.placeholder}
          </>
        )}
      </Draggable>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    currentBoardID: state.rootReducer.currentBoardID,
    card: state.cardReducer[ownProps.cardId],
  }
}

export default connect(mapStateToProps)(Card);
