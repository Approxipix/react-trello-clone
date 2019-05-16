import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';

const Title = styled.h4`
    padding: .5rem;
    color: #40424b;
`;

const Button = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  visibility: hidden;
  padding: .5rem;
  font-size: .75rem;
  color: #444;
  cursor: pointer;
  transition: transform .2s ease-in;
`;

const Container = styled.div`
  position: relative;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: white;  
  &:hover {
    background-color: #ededed;
  }   
  &:hover ${Button} {
    visibility: visible;
  }   
   margin-bottom: .5rem;
`;

const CardLabelList = styled.div`
  display: flex;
  padding: .5rem;
`;

const CardLabelListItem = styled.div`
  height: .5rem;
  width: 1rem;
  border-radius: 1rem;
  margin-right: .2rem;
  background-color: ${props => props.value};
`;

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
                <Title>{card.title}</Title>
                {!!card.description && 'desc'}
                {!!card.cardLabels && (
                  <CardLabelList>
                    {card.cardLabels.map(((label, index) => (
                      <CardLabelListItem key={index} value={label.color}/>
                    )))}
                  </CardLabelList>
                )}
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
    card: state.rootReducer.cards[ownProps.cardId],
  }
}


export default connect(mapStateToProps)(Card);
