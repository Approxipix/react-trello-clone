import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { moveList, moveListToAnotherBoard } from '../../redux/boardReducer/actions/actions';
import { SubmitButton } from '../BaseComponent';
import Select from '../Select/Select';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 1rem;
`;

class ListMove extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newBoardId: props.boardId || null,
      newListPosition: 1,
    }
  }

  moveList =() => {
    const { boards, boardId, listId } = this.props;
    const { newBoardId, newListPosition } = this.state;
    const currentListPosition = boards[boardId].lists.indexOf(listId);
    if (newBoardId === boardId && currentListPosition === newListPosition) {
      this.props.toggleOpened();
      return null;
    }
    if (boardId === newBoardId) {
      this.props.actions.moveList({
        boardId: boardId,
        sourceIndex: boards[boardId].lists.indexOf(listId),
        destinationIndex: newListPosition - 1,
      })
    } else {
      this.props.actions.moveListToAnotherBoard({
        boardId: boardId,
        newBoardId: newBoardId,
        listId: listId,
        newListPosition: newListPosition - 1,
      })
    }
  };

  setNewBoardId = (id) => {
    const { boards } = this.props;
    const { newListPosition } = this.state;
    const listLength = boards[id].lists.length;
    if (listLength < newListPosition) {
      this.setState({
        newListPosition: listLength || 1,
      })
    }
    this.setState({
      newBoardId: id,
    });
  };

  boardIdSelector = () => {
    const { newBoardId } = this.state;
    const { boards, boardId } = this.props;
    const boardsOptions = Object.keys(boards).map((id) => (
      {
        title: boardId === id
          ? `${boards[id].title} (current)`
          : boards[id].title,
        value: id,
      }
    ));
    return (
      <Select
        label="Board"
        placeholder="Select board"
        value={boards[newBoardId] ? boards[newBoardId].title : ''}
        options={boardsOptions}
        onChange={(id) => this.setNewBoardId(id)}
      />
    );
  };

  listPositionSelector = () => {
    const { newBoardId, newListPosition } = this.state;
    const { boards, boardId, listId } = this.props;
    const currentListPosition = boards[boardId].lists.indexOf(listId);
    let listLength = boards[newBoardId].lists.length;
    if (boardId !== newBoardId) listLength = listLength + 1;
    let positionOptions = [...Array(listLength).keys()];
    positionOptions = positionOptions.map(position => (
      {
        title: currentListPosition === position && boardId === newBoardId
          ? `${++position} (current)`
          : `${++position}`,
        value: position,
      }
    ));
    return (
      <Select
        label="Position"
        placeholder="Select position"
        value={newListPosition.toString()}
        options={positionOptions}
        onChange={(position) => this.setState({
          newListPosition: position,
        })}
      />
    )
  };

  render() {
    return (
      <>
        <Container>
          {this.boardIdSelector()}
          {this.listPositionSelector()}
        </Container>
        <SubmitButton onClick={() => this.moveList()}>
          Move
        </SubmitButton>
      </>
    );
  }
}

ListMove.defaultProps = {
  boards: null,
};

ListMove.propTypes = {
  boardId: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
  boards: PropTypes.objectOf(
    PropTypes.shape({
      _boardId: PropTypes.string,
      title: PropTypes.string.isRequired,
      color: PropTypes.string,
      lists: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};

function mapStateToProps(state) {
  return {
    boards: state.boardReducer,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      moveList: moveList,
      moveListToAnotherBoard: moveListToAnotherBoard,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListMove);
