import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components'
import { bindActionCreators } from 'redux';
import { addCheckListItem } from '../../redux/rootReducer/actions';
import { Input, TextArea, SubmitButton, CancelButton } from '../BaseComponent';
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
  margin-top: .5rem;
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

class AddCheckListItem extends Component {
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
    this.props.actions.addCheckListItem({
      checkListId: this.props.checkListId,
      checkListTitle: title,
    });
    this.toggleOpened()
  };

  render = () => {
    const { isOpened, title } = this.state;
    return isOpened ? (
      <ClickOutside toggleOpened={this.toggleOpened}>
        <Wrapper>
          <Form id="card-add-form">
            <Input
              autoFocus
              type="text"
              placeholder="Enter a card title..."
              value={title}
              onChange={(e) => this.handleChange('title', e.target.value)}
              spellCheck={false}
            />
            <Actions>
              <SubmitButton onClick={(e) => this.handleSubmit(e)} disabled={!title}>
                Save
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
        + Add a item
      </AddButton>
    );
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      addCheckListItem: addCheckListItem,
    }, dispatch)
  };
}


export default connect(null, mapDispatchToProps)(AddCheckListItem);
