import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addBoard } from '../../redux/boardReducer/actions';
import styled from 'styled-components'
import { Input, SubmitButton, CancelButton } from '../BaseComponent';
import ClickOutside from '../ClickOutside'

const AddButton = styled.button`
  font-size: 1rem; 
  color: #444;
  font-weight: 600;
  background-color: #ddd;
  border-radius: .4rem
  transition: background-color .1s;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  padding: .6rem;
  background-color: #ddd;
  border-radius: .4rem
`;

const Title = styled.h2`
  margin-bottom: .5rem;
  font-size: 1rem;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
`;

class BoardAdder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      title: '',
    };
  }

  handleChange = (e) => {
    this.setState({
      title: e.target.value
    });
  };

  handleKeyDown = (e) => {
    if (e.keyCode === 27) {
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

  handleSubmit = (e) => {
    e.preventDefault();
    const { title } = this.state;
    if (!title) return;
    this.props.actions.addBoard({ title: title });
    this.setState({
      isOpened: false,
      title: ''
    });
  };

  render = () => {
    const { isOpened, title } = this.state;
    return isOpened ? (
      <ClickOutside toggleOpened={this.toggleOpened}>
        <Wrapper>
          <Title>
            New Board
          </Title>
          <form onSubmit={this.handleSubmit} id="board-add-form">
            <Input
              autoFocus
              type="text"
              placeholder="Add board title"
              value={title}
              onKeyDown={this.handleKeyDown}
              onChange={this.handleChange}
              spellCheck={false}
            />
            <Actions>
              <SubmitButton
                type="submit"
                disabled={title === ""}
              >
                Create board
              </SubmitButton>
              or
              <CancelButton
                onClick={() => this.toggleOpened()}
              >
                cancel
              </CancelButton>
            </Actions>
          </form>
        </Wrapper>
      </ClickOutside>
    ) : (
      <AddButton
        onClick={() => this.toggleOpened()}
      >
        Create new board...
      </AddButton>
    );
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      addBoard: addBoard,
    }, dispatch)
  };
}


export default connect(null, mapDispatchToProps)(BoardAdder);
