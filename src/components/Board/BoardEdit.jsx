import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components'
import { bindActionCreators } from 'redux';
import { editBoard } from '../../redux/boardReducer/actions';

const Form = styled.form`
  width: 90%;
`;

const Input = styled.input`
  padding: .3rem .5rem;
  width: 100%;
  border: none;
  font-size: 1.3rem;
  font-weight: 600;
  box-shadow: none;
  color: #40424b;
`;

class BoardEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  componentDidMount() {
    this.setState({
      title: this.props.board.title,
    });
    document.addEventListener('click', this.outerClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.outerClick);
  }

  outerClick = (e) => {
    let { target } = e;
    if (target.id === 'board-edit-form') {
      return;
    }
    if (!!target.closest && (target.closest('#board-edit-form'))) {
      return;
    }
    this.props.closeEdit();
  };

  handleChange = (key, value) => {
    this.setState({
      ...this.state,
      [key]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title } = this.state;
    if (!title)  return;
    const data = {
      boardIndex: this.props.boardIndex,
      boardTitle: title,
    };
    this.props.actions.editBoard(data);
    this.props.closeEdit()
  };

  render = () => {
    const { title } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} id="board-edit-form">
        <Input
          autoFocus
          type="text"
          placeholder="Board name"
          value={title}
          onChange={(e) => this.handleChange('title', e.target.value)}
          spellCheck={false}
        />
      </Form>
    );
  };
}

function mapStateToProps(state, ownProps) {
  return {
    board: state.rootReducer.boards[ownProps.boardIndex],
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      editBoard: editBoard,
    }, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(BoardEdit);
