import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editBoardTitle } from '../../redux/boardReducer/actions';
import styled from 'styled-components'
import ClickOutside from '../ClickOutside';

const Form = styled.form`
  width: 25rem;
`;

const Input = styled.input`
  width: 100%;
  padding: .3rem .5rem;
  font-size: 1.3rem;
  color: #40424b;
  font-weight: 600;
  border: none;
  box-shadow: none;
`;

class BoardTitleEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.boardTitle || '',
    };
  }

  handleChange = (key, value) => {
    this.setState({
      ...this.state,
      [key]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title } = this.state;
    if (!title)  return;
    this.props.actions.editBoardTitle({
      boardId: this.props.boardId,
      boardTitle: title
    });
    this.props.toggleEditTitle()
  };

  render() {
    const { title } = this.state;
    return (
      <ClickOutside toggleOpened={this.props.toggleEditTitle}>
        <Form onSubmit={this.handleSubmit} id="board-edit-form">
          <Input
            autoFocus
            type="text"
            placeholder="Edit board title"
            value={title}
            onChange={(e) => this.handleChange('title', e.target.value)}
            spellCheck={false}
          />
        </Form>
      </ClickOutside>
    );
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      editBoardTitle: editBoardTitle,
    }, dispatch)
  };
}


export default connect(null, mapDispatchToProps)(BoardTitleEdit);
