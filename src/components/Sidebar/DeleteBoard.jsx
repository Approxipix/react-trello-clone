import React, { Component } from 'react';
import { connect } from 'react-redux';
import { history } from "../../redux/store";
import { bindActionCreators } from 'redux';
import { deleteBoard } from '../../redux/boardReducer/actions';
import { Text, SubmitButton } from '../BaseComponent';
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
`;

class DeleteBoard extends Component {
  deleteBoard = () => {
    this.props.actions.deleteBoard({
      boardId: this.props.boardId
    });
    history.push('/boards')
  };

  render() {
    return (
      <Container>
        <Text>
          All actions will be removed from the activity feed and you won’t be able to re-open the board.
          There is no undo.
        </Text>
        <SubmitButton
          color={'danger'}
          onClick={() => this.deleteBoard()}
        >
          Delete board
        </SubmitButton>
      </Container>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      deleteBoard: deleteBoard,
    }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(DeleteBoard);
