import React, { Component } from 'react';
import { connect } from "react-redux";
import { Draggable } from 'react-beautiful-dnd';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled.div`
  position: relative; 
  &:not(:last-child) {
    margin-bottom: .5rem;
  }  
`;

const CardWrapper = styled.div`
  padding: .5rem;
  border-radius: .2rem;
  background-color: #fff;
  box-shadow: 0 1px 0 rgba(9,30,66,.25);  
  transform: ${props => props.isDragging && 'rotate(3deg)'};
  transition: background-color .2s ease-in;
  &:hover {
    background-color: #f4f5f7;
  }  
`;

const Title = styled.h3`
  font-size: .875rem;
  color: #40424b;
  word-break: break-word;
`;

const LabelList = styled.div`
  display: flex;
  margin-bottom: .3rem;
`;

const LabelItem = styled.div`
  height: .5rem;
  width: 2.5rem;
  border-radius: 1rem;
  margin-right: .2rem;
  background-color: ${props => props.value};
`;

const BadgeList = styled.div`
  display: flex;
`;

const BadgeItem = styled.div`
  margin: .3rem 1rem 0 0;
  padding: .2rem;
  color: ${props => props.done ? '#fff' : '#6b778c'};
  font-size: .75rem;
  border-radius: .2rem;
  background-color: ${props => props.done && '#61bd4f'}
`;

class CardLabels extends Component {
  render() {
    const { cardLabels } = this.props;
    if (cardLabels.length === 0) return null;
    return  (
      <LabelList>
        {cardLabels.map(((label, index) => (
          <LabelItem key={index} value={label.color}/>
        )))}
      </LabelList>
    )
  }
}

class CardBadges extends Component {
  render() {
    const { card, checkLists } = this.props;
    let allCheckListItems = 0;
    let doneCheckListItems = 0;
    card.checkLists.forEach(checklist => {
      allCheckListItems = allCheckListItems + checkLists[checklist].items.length;
      doneCheckListItems = doneCheckListItems + checkLists[checklist].items.filter(item => !!item.status).length
    });
    return (
      <BadgeList>
        {!!card.description && (
          <BadgeItem>
            <FontAwesomeIcon icon="align-left" />
          </BadgeItem>
        )}
        {!!allCheckListItems && (
          <BadgeItem done={allCheckListItems === doneCheckListItems}>
            <FontAwesomeIcon icon="check-square" /> {doneCheckListItems}/{allCheckListItems}
          </BadgeItem>
        )}
      </BadgeList>
    )
  }
}

class Card extends Component {
  render() {
    const { currentBoardID, card, checkLists, index, isDraggingOver} = this.props;
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
              style={{
                ...provided.draggableProps.style,
                background: card.color
              }}
            >
              <CardWrapper isDragging={snapshot.isDragging}>
                <NavLink to={`/b/${currentBoardID}/c/${card._cardId}`}>
                  <CardLabels cardLabels={card.cardLabels} />
                  <Title>{card.title}</Title>
                  <CardBadges
                    card={card}
                    checkLists={checkLists}
                  />
                </NavLink>
              </CardWrapper>
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
    checkLists: state.checkListReducer
  }
}

export default connect(mapStateToProps)(Card);
