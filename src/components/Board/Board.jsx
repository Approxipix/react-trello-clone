import React, { Component, PureComponent } from 'react';
import Column from '../List/Column'
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ColumnAdder from '../List/ColumnAdder';
import { moveList, moveTask, deleteBoard } from "../../redux/rootReducer/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index";
import { history } from '../../redux/store';

const BoardWrapper = styled.div`
  height: 100%;
  padding: 1rem 1.5rem;
  background-color: #2E7EAF;
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
`;

const BoardHeader = styled.div`
  margin-bottom: 1rem;
  padding: 0 .5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Actions = styled.div`

`;

const Button = styled.button`
  padding: .5rem;
  cursor: pointer;
  color: #fff;
  border-radius: .2rem;
  transition: background .2s ease-in-out;
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.h1`
  margin: 0;
  color: #fff;
  font-size: 1.3rem;
  font-weight: 600;
`;


class InnerList extends Component {
  render() {
    return (
      <>
        {this.props.list.map((list, index) => (
          <Column
            boardIndex={this.props.boardIndex}
            listIndex={index}

            key={list.listId}
            column={list}
            index={index}
          />
        ))}
        <ColumnAdder boardIndex={this.props.boardIndex}/>
      </>
    )
  }
}

class Board extends Component {
  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    if (type === 'column') {
      let boardIndex;
      this.props.boards.forEach((board, index) => {
        if (board.boardId === +this.props.match.params.id) {
          boardIndex = index;
        }
      });
      this.props.actions.moveList({
        sourceIndex: source.index,
        destinationIndex: destination.index,
        index: boardIndex,
      });
    }

    if (type === 'task') {
      let boardIndex;
      this.props.boards.forEach((board, index) => {
        if (board.boardId === +this.props.match.params.id) {
          boardIndex = index;
        }
      });
      this.props.actions.moveTask({
        sourceeIndex: source.index,
        sourceListIndex: source.droppableId,
        destinationnIndex: destination.index,
        destinationListIndex: destination.droppableId,
        indeex: boardIndex,
      });
    }
  };

  render() {
    const { boards } = this.props;
    let boardIndex;
    const board = boards.find((board, index) => {
      boardIndex = index;
      return board.boardId === +this.props.match.params.id
    });
    return (
      <BoardWrapper>
        <BoardHeader>
          <Title>
            {board.title}
          </Title>
          <Actions>
            <Button onClick={() => {
              this.props.actions.deleteBoard(+this.props.match.params.id);
              history.push("/boards")
            }}>
              <FontAwesomeIcon icon="trash" />
              Delete board
            </Button>
          </Actions>
        </BoardHeader>
        <DragDropContext
          onDragEnd={this.onDragEnd}
        >
          <Droppable
            droppableId='all-columns'
            direction='horizontal'
            type='column'
          >
            {(provided) => (
              <Container
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <InnerList
                  boardIndex={boardIndex}
                  list={board.list}
                />
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
        </DragDropContext>
      </BoardWrapper>
    )
  }
}

function mapStateToProps(state) {
  return {
    boards: state.rootReducer.boards,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      moveList: moveList,
      moveTask: moveTask,
      deleteBoard: deleteBoard,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
