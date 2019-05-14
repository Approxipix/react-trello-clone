import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components'
import { bindActionCreators } from 'redux';
import { editListTitle } from '../../redux/boardReducer/actions';
import ClickOutside from "../ClickOutside";

const Form = styled.form`
  width: 90%;
`;

const Input = styled.input`
  padding: .6rem .5rem .5rem;
  width: 100%;
  border: none;
  font-weight: bold;
  box-shadow: none;
  font-size: 1rem;
  color: #40424b;
`;

class ListEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.list.title || '',
      content: '',
    };
  }

  handleChange = (key, value) => {
    this.setState({
      ...this.state,
      [key]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title } = this.state;
    const { actions, listIndex } = this.props;
    if (!title)  return;
    actions.editListTitle({
      listTitle: title,
      listIndex: listIndex
    });
    this.props.toggleEditing()
  };

  render = () => {
    const { title } = this.state;
    return (
      <ClickOutside toggleOpened={this.props.toggleEditing}>
        <Form id="list-edit-form" onSubmit={this.handleSubmit}>
          <Input
            autoFocus
            type="text"
            placeholder="Enter list title..."
            value={title}
            onChange={(e) => this.handleChange('title', e.target.value)}
            spellCheck={false}
          />
        </Form>
      </ClickOutside>
    );
  };
}

function mapStateToProps(state, ownProps) {
  const { rootReducer } = state;
  const board = rootReducer.boards[rootReducer.currentBoardIndex];
  return {
    board: board,
    list: board.lists[ownProps.listIndex]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      editListTitle: editListTitle,
    }, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ListEdit);
