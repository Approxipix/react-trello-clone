import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components'
import { bindActionCreators } from 'redux';
import { addList } from '../../redux/rootReducer/actions';
import { Input, SubmitButton, CancelButton } from '../BaseComponent';
import ClickOutside from "../ClickOutside";

const Wrapper = styled.div`
  width: 16rem;
  margin: 0 .5rem;
  padding: .6rem;
  background-color: #e3e3e3;
  border-radius: .2rem
`;

const Title = styled.h4`
  margin-bottom: .5rem;
`;

const Form = styled.form``;


const Actions = styled.div`
  display: flex;
  align-items: center;
  font-size: .9rem;
`;

const AddButton = styled.button`
  width: 16rem;
  margin: 0 .5rem;
  padding: .75rem;
  border-radius: .2rem;
  background: rgba(0, 0, 0, 0.1);
  color: #c3c3c3;
  font-size: 1rem; 
  text-align: left;
  transition: background-color .1s;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

class BoardAdder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      title: '',
    };
  }

  handleChange = event => {
    this.setState({
      title: event.target.value
    });
  };

  handleKeyDown = event => {
    if (event.keyCode === 27) {
      this.setState({
        isOpened: false
      });
    }
  };

  toggleOpened = () => {
    this.setState({
      isOpened: !this.state.isOpened
    })
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title } = this.state;
    if (!title) return;
    this.props.actions.addList({
      boardId: this.props.boardId,
      listId: this.props.listId,
      listTitle: title
    });
    this.toggleOpened();
  };

  render = () => {
    const { isOpened, title } = this.state;
    return isOpened ? (
      <ClickOutside toggleOpened={this.toggleOpened}>
        <Wrapper>
          <Title>
            New Column
          </Title>
          <Form id="column-add-form" onSubmit={this.handleSubmit}>
            <Input
              autoFocus
              type="text"
              placeholder="Enter a list title..."
              value={title}
              onKeyDown={this.handleKeyDown}
              onChange={this.handleChange}
              spellCheck={false}
            />
            <Actions>
              <SubmitButton type="submit" disabled={title === ""}>
                Add list
              </SubmitButton>
              or
              <CancelButton onClick={() => this.toggleOpened()}>
                cancel
              </CancelButton>
            </Actions>
          </Form>
        </Wrapper>
      </ClickOutside>
    ) : (
      <AddButton onClick={() => this.toggleOpened()}>
        + Add another list
      </AddButton>
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


export default connect(null, mapDispatchToProps)(BoardAdder);
