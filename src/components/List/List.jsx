import React, { Component, PureComponent } from 'react';
import { connect } from "react-redux/es/alternate-renderers";
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd';
import CardAdder from '../Card/CardAdder';
import Cards from './Cards'
import ListHeader from './ListHeader'

const Container = styled.div`
  position: relative;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  max-height: 83vh;
  width: 16rem;
  margin: 0 .5rem;
  border: 1px solid lightgrey;
  border-radius: .2rem;
  background-color: #dfe1e6;
`;

const Title = styled.h3`
  cursor: default;
`;

const CardsWrap = styled.div`
  margin: 3px;
`;



class List extends Component {
  render() {
    const {  list, boardId, index } = this.props;
    return (
      <Draggable
        index={index}
        draggableId={`${list._listId}`}
        disableInteractiveElementBlocking
      >
        {(provided) => (
          <>
            <Container
              {...provided.draggableProps}
              ref={provided.innerRef}
            >
              <ListHeader
                dragHandleProps={provided.dragHandleProps}
                boardId={boardId}
                listId={list._listId}
                listTitle={list.title}
              />

              <CardsWrap>
                <Cards
                  listId={list._listId}
                  cardsId={list.cards}
                />
              </CardsWrap>
              <CardAdder listId={list._listId} />
            </Container>
            {provided.placeholder}
          </>
        )}
      </Draggable>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    list: state.rootReducer.lists[ownProps.listId],
  }
}

export default connect(mapStateToProps)(List);
