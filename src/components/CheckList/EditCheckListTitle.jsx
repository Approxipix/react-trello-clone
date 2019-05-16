import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components'
import { bindActionCreators } from 'redux';
import { editCheckListTitle } from '../../redux/boardReducer/actions';
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

class EditCheckListTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.checkList.title || '',
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
    const { actions } = this.props;
    if (!title)  return;
    actions.editCheckListTitle({
      cardIndex: this.props.cardIndex,
      listIndex: this.props.listIndex,
      checkBoxIndex: this.props.checkBoxIndex,
      title: title,
    });
    this.props.toggleEditing()
  };

  render = () => {
    const { title } = this.state;
    return (
      <ClickOutside toggleOpened={this.props.toggleEditing}>
        <Form onSubmit={this.handleSubmit}>
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
  const list = board.lists[ownProps.listIndex];
  const card = list.cards[ownProps.cardIndex];
  const checkList = card.checkLists[ownProps.checkBoxIndex];
  return {

    checkList: checkList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      editCheckListTitle: editCheckListTitle,
    }, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(EditCheckListTitle);
