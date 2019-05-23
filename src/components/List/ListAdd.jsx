import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components'
import { bindActionCreators } from 'redux';
import { addList } from '../../redux/listReducer/actions';
import { Actions, Input, SubmitButton, CancelButton } from '../BaseComponent';
import ClickOutside from "../ClickOutside";
import uuid from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wrapper = styled.div`
  flex-shrink:0;
  width: 16rem;
  margin: 0 .5rem;
`;

const Form = styled.form`
  padding: .6rem;
  background-color: #e3e3e3;
  border-radius: .2rem
`;

const AddButton = styled.button`
  width: 100%;
  padding: .6rem;
  font-size: 1rem; 
  color: #fff;
  text-align: left;
  border-radius: .2rem;
  background-color: rgba(0, 0, 0, .12);
  transition: background-color .2s ease-in;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

class ListAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      title: '',
    };
  }

  toggleOpened = () => {
    this.setState({
      isOpened: !this.state.isOpened,
      title: '',
    })
  };

  handleChange = (e) => {
    this.setState({
      title: e.target.value
    });
  };

  handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      this.toggleOpened();
    }
  };


  handleSubmit = (e) => {
    e.preventDefault();
    const { title } = this.state;
    if (!title) return;
    this.props.actions.addList({
      boardId: this.props.boardId,
      listId: this.props.listId,
      listTitle: title,
      newListId: uuid.v4(),
    });
    this.setState({
      title: ''
    }, () => this.input.focus())
  };

  render = () => {
    const { isOpened, title } = this.state;
    return isOpened ? (
      <ClickOutside toggleOpened={this.toggleOpened}>
        <Wrapper>
          <Form onSubmit={this.handleSubmit}>
            <Input
              type="text"
              value={title}
              placeholder="Enter a list title..."
              ref={(e) => { this.input = e }}
              onKeyDown={this.handleKeyDown}
              onChange={this.handleChange}
              spellCheck={false}
              autoFocus
            />
            <Actions>
              <SubmitButton type="submit" disabled={title === ""}>
                Add list
              </SubmitButton>
              <CancelButton onClick={() => this.toggleOpened()}>
                <FontAwesomeIcon icon="times" />
              </CancelButton>
            </Actions>
          </Form>
        </Wrapper>
      </ClickOutside>
    ) : (
      <Wrapper>
        <AddButton onClick={() => this.toggleOpened()}>
          + Add another list
        </AddButton>
      </Wrapper>
    );
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      addList: addList,
    }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(ListAdd);
