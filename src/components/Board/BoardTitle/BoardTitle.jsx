import React, { Component } from 'react';
import { connect } from "react-redux";
import BoardTitleEdit from "./BoardTitleEdit";
import styled from "styled-components";

const Title = styled.h1`
  max-width: calc(100vw - 12rem);
  margin: 0;
  padding: .5rem;
  font-size: 1.3rem;
  color: #fff;
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

class BoardHeader extends Component {
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
    const { board } = this.props;
    const { editTitle } = this.state;
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

function mapStateToProps(state) {
  return {
    board: state.boardReducer[state.rootReducer.currentBoardID],
  }
}

export default connect(mapStateToProps)(BoardHeader);
