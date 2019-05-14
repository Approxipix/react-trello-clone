import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { deleteCard } from '../../redux/boardReducer/actions';

const Title = styled.h4`
  padding-bottom: .5rem;
  margin-bottom: .5rem;
  border-bottom: 1px solid #e3e3e3
`;

const Description = styled.p`
  color: #4c4c4c;
  font-size: .75rem;
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
  padding: ${props => !props.isEditing && '.5rem'};
  border: ${props => !props.isEditing ? '1px solid lightgrey' : 'none'};
  border-radius: 2px;

  background-color: ${props =>
  !props.isEditing
    ? 'white'
    : 'transparent'};  
  &:hover {
    background-color: #ededed;
  }   
  &:hover ${Button} {
    visibility: visible;
  }   
  &:not(:last-child) {
    margin-bottom: .5rem;
  }
`;


class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      isEditing: false,
    }
  }

  render() {
    const { isEditing } = this.state;
    const { card, cardIndex } = this.props;
    if (!card) return null;
    return (
      <Draggable
        index={cardIndex}
        draggableId={`${card._cardId}`}
      >
        {(provided, snapshot) => (
          <Container
            isEditing={isEditing}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <Title>{card.title}</Title>
            <Description>{card.description}</Description>
          </Container>
        )}
      </Draggable>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { rootReducer } = state;
  const board = rootReducer.boards[rootReducer.currentBoardIndex];
  const list = board.lists[ownProps.listIndex];
  const card = list.cards[ownProps.cardIndex];
  return {
    card: card,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      deleteCard: deleteCard,
    }, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Card);
