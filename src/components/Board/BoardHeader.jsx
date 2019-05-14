import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { deleteBoard } from "../../redux/boardReducer/actions";
import { history } from "../../redux/store";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BoardTitleEdit from "./BoardTitleEdit";
import ColorPicker from "../ColorPicker";

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
      isEditing: false,
    }
  }

  deleteBoard = () => {
    const { board, actions } = this.props;
    actions.deleteBoard({ _boardId: board._boardId });
    history.push('/boards')
  };

  toggleEditing = () => {
    this.setState({
      isEditing: !this.state.isEditing,
    })
  };

  render() {
    const { isEditing } = this.state;
    const { board } = this.props;
    return (
      <Header>
        {!isEditing ? (
          <Title onClick={() => this.toggleEditing()}>
            {board.title}
          </Title>
        ) : (
          <BoardTitleEdit toggleEditing={this.toggleEditing}/>
        )}
        <Actions>
          <ColorPicker />
          <VerticalLine />
          <Button onClick={() => this.deleteBoard()}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;Delete board
          </Button>
        </Actions>
      </Header>
    )
  }
}

function mapStateToProps(state) {
  const { rootReducer } = state;
  return {
    board: rootReducer.boards[rootReducer.currentBoardIndex],
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      deleteBoard: deleteBoard,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardHeader);

