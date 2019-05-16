import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { deleteBoard } from "../../redux/rootReducer/actions";
import { history } from "../../redux/store";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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

class BoardDeleter extends Component {
  deleteBoard = () => {
    this.props.actions.deleteBoard({
      boardId: this.props.boardId
    });
    history.push('/boards')
  };

  render() {
    return (
      <Button onClick={() => this.deleteBoard()}>
        <FontAwesomeIcon icon="trash" />
        &nbsp;Delete board
      </Button>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      deleteBoard: deleteBoard,
    }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(BoardDeleter);

