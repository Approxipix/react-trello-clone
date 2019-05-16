import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components'
import { bindActionCreators } from 'redux';
import { addCard } from '../../redux/rootReducer/actions';
import { Input, SubmitButton, CancelButton } from '../BaseComponent';
import ClickOutside from "../ClickOutside";

const Wrapper = styled.div`
  position: relative;
  padding: .75rem .5rem;
  background-color: #ddd;
  border-radius: .4rem
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
`;

const Form = styled.form``;

const AddButton = styled.button`
  text-align: left;
  width: 100%;
  padding: .75rem;
  font-size: 1rem; 
  color: #444;
  font-weight: 600;
  transition: background-color .1s;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
  }
`;

class CardAdder extends Component {
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
    this.props.actions.addCard({
      listId: this.props.listId,
      cardTitle: title,
    });
    this.toggleOpened()
  };

  render = () => {
    const { isOpened, title } = this.state;
    return isOpened ? (
      <ClickOutside toggleOpened={this.toggleOpened}>
        <Wrapper>
          <Form id="card-add-form" onSubmit={this.handleSubmit}>
            <Input
              autoFocus
              type="text"
              placeholder="Enter a card title..."
              value={title}
              onChange={(e) => this.handleChange('title', e.target.value)}
              spellCheck={false}
            />
            <Actions>
              <SubmitButton type="submit" disabled={!title}>
                Create card
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
        + Add a card
      </AddButton>
    );
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      addCard: addCard,
    }, dispatch)
  };
}


export default connect(null, mapDispatchToProps)(CardAdder);
