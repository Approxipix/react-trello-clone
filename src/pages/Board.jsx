import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { moveList, moveCard, setCurrentBoardIndex } from "../redux/boardReducer/actions";
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import BoardHeader from '../components/Board/BoardHeader'
import ListAdder from '../components/List/ListAdder';
import List from '../components/List/List'

const BoardWrapper = styled.div`
  height: 100%;
  padding-top: 1rem;
  background-color: ${props => props.color};
  transition: background-color .2s ease-in-out;
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  height: 92%;
  max-width: 100vw;
  padding: 0 1rem 1rem;
  overflow: auto;
`;

class InnerList extends Component {
  render() {
    const { lists } = this.props;
    if (!lists) return null;
    return (
      <>
        {lists.map((list, index) => (
          <List
            key={index}
            listIndex={index}
          />
        ))}
      </>
    )
  }
}

class Board extends Component {
  componentDidMount() {
    const { actions, match } = this.props;
    actions.setCurrentBoardIndex(match.params.id)
  }

  componentWillUnmount() {
    const { actions } = this.props;
    actions.setCurrentBoardIndex(null)
  }

  handleDragEnd = (result) => {
    const { actions } = this.props;
    const { destination, source, type } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    if (type === 'column') {
      actions.moveList({
        sourceIndex: source.index,
        destinationIndex: destination.index,
      });
    }

    if (type === 'task') {
      actions.moveCard({
        sourceIndex: source.index,
        sourceListIndex: source.droppableId,
        destinationIndex: destination.index,
        destinationListIndex: destination.droppableId,
      });
    }
  };

  render() {
    const { board, boardColor, lists } = this.props;
    if (!board) return null;
    return (
      <BoardWrapper color={boardColor}>
        <BoardHeader />
        <DragDropContext onDragEnd={this.handleDragEnd}>
          <Droppable
            type='column'
            droppableId='all-columns'
            direction='horizontal'
          >
            {(provided) => (
              <Container
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <InnerList lists={lists} />
                {provided.placeholder}
                <ListAdder />
              </Container>
            )}
          </Droppable>
        </DragDropContext>
      </BoardWrapper>
    )
  }
}

function mapStateToProps(state) {
  const { rootReducer } = state;
  const board = rootReducer.boards[rootReducer.currentBoardIndex];
  const lists = !!board && board.lists;
  return {
    board: board,
    lists: lists,
    boardColor: !!board ? board.color : '#2E7EAF'
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setCurrentBoardIndex: setCurrentBoardIndex,
      moveList: moveList,
      moveCard: moveCard,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
