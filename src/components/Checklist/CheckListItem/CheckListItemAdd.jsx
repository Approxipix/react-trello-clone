import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components'
import { bindActionCreators } from 'redux';
import { addCheckListItem } from '../../../redux/checkListReducer/actions/actions';
import { Actions, Input, SubmitButton, CancelButton } from '../../BaseComponent';
import ClickOutside from "../../ClickOutside/ClickOutside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wrapper = styled.div`
  padding-left: 2rem;
`;

const AddButton = styled.button`
  padding: .5rem 1rem;
  font-size: .875rem;
  color: #172b4d;
  background-color: rgba(9, 30, 66, .08);
  border-radius: 3px;
  transition: background-color .2s ease-in;
  &:hover {
    background-color: rgba(9,30,66,.13);
  }
`;

class CheckListItemAdd extends Component {
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

  handleChange = (value) => {
    this.setState({
      title: value,
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
          <form >
            <Input
              type="text"
              size=".875rem"
              padding=".5rem"
              placeholder="Enter a card title..."
              value={title}
              onKeyDown={this.handleKeyDown}
              onChange={(e) => this.handleChange(e.target.value)}
              spellCheck={false}
              autoFocus
            />
            <Actions>
              <SubmitButton disabled={!title} onClick={(e) => this.handleSubmit(e)}>
                Save
              </SubmitButton>
              <CancelButton onClick={() => this.toggleOpened()}>
                <FontAwesomeIcon icon="times" />
              </CancelButton>
            </Actions>
          </form>
        </Wrapper>
      </ClickOutside>
    ) : (
      <Wrapper>
        <AddButton onClick={() => this.toggleOpened()}>
          Add a item
        </AddButton>
      </Wrapper>
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

export default connect(null, mapDispatchToProps)(CheckListItemAdd);
