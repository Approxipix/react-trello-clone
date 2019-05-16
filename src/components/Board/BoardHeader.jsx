import React, { Component } from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
import BoardTitleEdit from "./BoardTitleEdit";
import ColorPicker from "../ColorPicker";
import BoardDeleter from "./BoardDeleter";

const Header = styled.div`
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

const Title = styled.h1`
  margin: 0;
  padding: .3rem .5rem;
  font-size: 1.3rem;
  color: #fff;
  font-weight: 600;
`;

const VerticalLine = styled.div`
  width: 1px;
  height: 1.3rem;
  background-color: #d6d6d6;
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
      <Header>
        {!editTitle ? (
          <Title onClick={() => this.toggleEditTitle()}>
            {board.title}
          </Title>
        ) : (
          <BoardTitleEdit
            boardId={board._boardId}
            boardTitle={board.title}
            toggleEditTitle={this.toggleEditTitle}
          />
        )}
        <Actions>
          <ColorPicker
            boardId={board._boardId}
            boardColor={board.color}
          />
          <VerticalLine />
          <BoardDeleter
            boardId={board._boardId}
          />
        </Actions>
      </Header>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    board: state.rootReducer.boards[ownProps.boardId],
  }
}


export default connect(mapStateToProps)(BoardHeader);

