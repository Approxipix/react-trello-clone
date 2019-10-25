import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentBoardID } from "../redux/rootReducer/actions/actions";
import { moveList } from "../redux/boardReducer/actions/actions";
import { moveCard } from "../redux/listReducer/actions/actions";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Redirect } from "react-router";
import BoardHeader from '../components/Board/BoardHeader';
import Sidebar from '../components/Sidebar/Sidebar';
import ListAdd from '../components/List/ListAdd';
import List from '../components/List/List'
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  padding-top: .5rem;
  background-color: ${props => props.color};
  transition: background-color .2s ease-in;
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

export const InnerList = (props) => {
  const { boardId, listsId, } = props;
  return (
    listsId.map((listId, index) => (
      <List
        key={index}
        index={index}
        boardId={boardId}
        listId={listId}
      />
    ))
  )
};

class Board extends Component {
  componentDidMount() {
    const boardId = this.props.match.params.boardId;
    this.props.actions.setCurrentBoardID(boardId);
  }

  componentWillUnmount() {
    this.props.actions.setCurrentBoardID(null)
  }

  handleDragEnd = (result) => {
    const { destination, source, type } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    if (type === 'column') {
      this.props.actions.moveList({
        boardId: this.props.board._boardId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      });
    }

    if (type === 'task') {
      this.props.actions.moveCard({
        sourceIndex: source.index,
        sourceListIndex: source.droppableId,
        destinationIndex: destination.index,
        destinationListIndex: destination.droppableId,
      });
    }
  };

  render() {
    const { board, currentBoardId } = this.props;
    if (!currentBoardId) return null;
    if (!board) return <Redirect to='/'/>;
    return (
      <Wrapper color={board.color}>
        <BoardHeader boardId={board._boardId}/>
        <DragDropContext onDragEnd={this.handleDragEnd}>
          <Droppable
            type='column'
            droppableId={board._boardId}
            direction='horizontal'
          >
            {(provided) => (
              <Container
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <InnerList boardId={board._boardId} listsId={board.lists}/>
                {provided.placeholder}
                <ListAdd boardId={board._boardId}/>
              </Container>
            )}
          </Droppable>
        </DragDropContext>
        <Sidebar />
      </Wrapper>
    )
  }
}

Board.propTypes = {
  isSidebarOpened: PropTypes.bool,
  currentBoardId: PropTypes.string,
  board: PropTypes.shape({
    _boardId: PropTypes.string,
    title: PropTypes.string,
    color: PropTypes.string,
    lists: PropTypes.arrayOf(PropTypes.string),
  }),
};

function mapStateToProps(state) {
  return {
    isSidebarOpened: state.rootReducer.isSidebarOpened,
    currentBoardId: state.rootReducer.currentBoardID,
    board: state.boardReducer[state.rootReducer.currentBoardID],
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setCurrentBoardID: setCurrentBoardID,
      moveList: moveList,
      moveCard: moveCard,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
