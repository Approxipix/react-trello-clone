import React, { Component } from 'react';
import { connect } from "react-redux/es/alternate-renderers";
import { Draggable } from 'react-beautiful-dnd';
import ListHeader from './ListHeader'
import CardAdder from '../Card/CardAdder';
import ListCards from './ListCards'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  max-height: 83vh;
  width: 16rem;
  margin: 0 .5rem;
  background-color: #dfe1e6;
  border-radius: .2rem;
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
              <ListCards listId={list._listId} cardsId={list.cards} />
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
    list: state.listReducer[ownProps.listId],
  }
}

export default connect(mapStateToProps)(List);
