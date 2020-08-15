import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import BoardTitleEdit from "./BoardTitleEdit";
import styled from "styled-components";

const Title = styled.h1`
  max-width: calc(100vw - 9rem);
  margin: 0;
  padding: .5rem;
  font-size: 1.3rem;
  color: #fff;
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
Title.displayName = 'Title';

class BoardTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editTitle: false,
    }
  }

  toggleEditTitle = () => {
    this.setState({
      editTitle: !this.state.editTitle,
    })
  };

  render() {
    const { boards, currentBoardID } = this.props;
    const { editTitle } = this.state;

    const board = boards[currentBoardID];
    if (!board) return null;

    return (
      !editTitle ? (
        <Title onClick={() => this.toggleEditTitle()}>
          {board.title}
        </Title>
      ) : (
        <BoardTitleEdit
          boardId={board._boardId}
          boardTitle={board.title}
          toggleEditTitle={this.toggleEditTitle}
        />
      )
    )
  }
}

BoardTitle.propTypes = {
  currentBoardID: PropTypes.string.isRequired,
  boards: PropTypes.objectOf(
    PropTypes.shape({
      _boardId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      color: PropTypes.string,
      lists: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};

function mapStateToProps(state) {
  return {
    boards: state.boardReducer,
    currentBoardID: state.rootReducer.currentBoardID,
  }
}

export default connect(mapStateToProps)(BoardTitle);
