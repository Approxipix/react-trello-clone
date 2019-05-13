import React, { Component, PureComponent } from 'react';
import Column from '../components/List/Column'
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ColumnAdder from '../components/List/ColumnAdder';
import ColorPicker from '../components/ColorPicker';
import BoardEdit from '../components/Board/BoardEdit';
import { moveList, moveTask, deleteBoard, setCurrentBoardIndex } from "../redux/boardReducer/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { history } from '../redux/store';

const BoardWrapper = styled.div`
  height: 100%;
  padding-top: 1rem;
  background-color: ${props => props.color};
  transition: background-color .2s ease-in;
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  
  max-width: 100vw;
    overflow: auto;
    padding: 0 1rem 1rem;
`;

const BoardHeader = styled.div`
  margin-bottom: 1rem;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  &:not(:last-child) {
    border-right: 1px solid red;
  }
`;

const Button = styled.button`
  margin: 0.5rem;
  padding: .5rem;
  cursor: pointer;
  color: #fff;
  border-radius: .2rem;
  transition: background .2s ease-in-out;
  white-space: nowrap;
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.h1`
  margin: 0;
  padding: .3rem .5rem;
  color: #fff;
  font-size: 1.3rem;
  font-weight: 600;
`;

const VerticalLine = styled.div`
  background-color: #d6d6d6;
  width: 1px;
  height: 1.3rem;
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
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    }
  }

  componentDidMount() {
    this.props.actions.setCurrentBoardIndex(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.actions.setCurrentBoardIndex(null)
  }

  closeEdit = () => {
    this.setState({
      isEditing: false,
    })
  }

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
        if (board._id === +this.props.match.params.id) {
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
        if (board._id === +this.props.match.params.id) {
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
    const { isEditing } = this.state;
    const { board } = this.props;
    let boardIndex = this.props.match.params.id;
    if (!board) return null;
    return (
      <BoardWrapper color={board.color}>
        <BoardHeader>
          {!isEditing ? (
            <Title onClick={() => {
              this.setState({
                isEditing: true,
              })
            }}>
              {board.title}
            </Title>
          ) : (
            <BoardEdit boardIndex={boardIndex} closeEdit={this.closeEdit}/>
          )}
          <Actions>
            <ColorPicker boardIndex={boardIndex}/>
            <VerticalLine />
            <Button onClick={() => {
              this.props.actions.deleteBoard({ _id: board._id });
              history.push("/boards")
            }}>
              <FontAwesomeIcon icon="trash" />
              &nbsp;Delete board
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
  const { rootReducer } = state;
  return {
    board: rootReducer.boards[rootReducer.currentBoardIndex],
    boards: rootReducer.boards,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      moveList: moveList,
      moveTask: moveTask,
      setCurrentBoardIndex: setCurrentBoardIndex,
      deleteBoard: deleteBoard,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
