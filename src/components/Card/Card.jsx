import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Draggable } from 'react-beautiful-dnd';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Label from "../Label/Label";
import styled from 'styled-components';

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
  .label-list {
    margin-bottom: .3rem;
  }
  li {
    height: .5rem;
    width: 2.5rem;
    border-radius: 1rem;
    margin-right: .2rem;
  }
`;

const BadgeList = styled.div`
  display: flex;
 
`;
BadgeList.displayName = 'BadgeList';

const BadgeItem = styled.div`
  margin: .3rem 1rem 0 0;
  padding: .2rem;
  color: ${props => props.done ? '#fff' : '#6b778c'};
  font-size: .75rem;
  border-radius: .2rem;
  background-color: ${props => props.done && '#61bd4f'}
`;

export const CardBadges = (props) => {
  const { card, checkLists } = props;
  let allCheckListItems = 0, doneCheckListItems = 0;
  card.checkLists.forEach(checklist => {
    allCheckListItems += checkLists[checklist].items.length;
    doneCheckListItems += checkLists[checklist].items.filter(item => !!item.status).length
  });
  return (
    <BadgeList>
      {!!card.description && (
        <BadgeItem>
          <FontAwesomeIcon icon="align-left"/>
        </BadgeItem>
      )}
      {!!allCheckListItems && (
        <BadgeItem done={allCheckListItems === doneCheckListItems}>
          <FontAwesomeIcon icon="check-square"/> {doneCheckListItems}/{allCheckListItems}
        </BadgeItem>
      )}
    </BadgeList>
  )
};

const Card = (props) => {
  const {
    index,
    card,
    checkLists,
    currentBoardID,
    isDraggingOver,
  } = props;
  if (!card) return null;
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
                <LabelList>
                  <Label cardLabels={card.cardLabels} />
                </LabelList>
                <Title>
                  {card.title}
                </Title>
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
};

Card.defaultProps = {
  card: null,
  checkLists: []
};

Card.propTypes = {
  currentBoardID: PropTypes.string.isRequired,
  cardId: PropTypes.string.isRequired,
  index: PropTypes.number,
  isDraggingOver: PropTypes.bool,
  card: PropTypes.shape({
    _cardId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    checkLists: PropTypes.arrayOf(PropTypes.string).isRequired,
    cardLabels: PropTypes.array.isRequired,
  }).isRequired,
  checkLists: PropTypes.objectOf(
    PropTypes.shape({
      _checkListId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          status: PropTypes.bool.isRequired,
          description: PropTypes.string,
        })
      )
    })
  ),
};

function mapStateToProps(state, ownProps) {
  return {
    currentBoardID: state.rootReducer.currentBoardID,
    card: state.cardReducer[ownProps.cardId],
    checkLists: state.checkListReducer
  }
}

export default connect(mapStateToProps)(Card);
