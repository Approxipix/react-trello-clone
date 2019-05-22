import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { addCard } from '../../redux/cardReducer/actions';
import { TextArea, Actions, SubmitButton, CancelButton } from '../BaseComponent';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClickOutside from "../ClickOutside";
import styled from 'styled-components'
import uuid from "uuid";

const Wrapper = styled.div`
  padding: 0 .5rem .5rem;
`;

const AddButton = styled.button`
  text-align: left;
  width: 100%;
  padding: .5rem .75rem;
  font-size: .875rem; 
  color: #6b778c;
  transition: all .2s ease-in;
  cursor: pointer;
  &:hover {
    color: #172b4d;
    background-color: rgba(9,30,66,.13);
  }
`;

class CardAdder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      title: '',
      rows: 3,
      minRows: 2,
      maxRows: 8,
    };
  }

  toggleOpened = () => {
    this.setState({
      isOpened: !this.state.isOpened,
      title: '',
      rows: 3,
    })
  };

  handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      this.toggleOpened();
    }
  };

  handleChange = (e) => {
    const { minRows, maxRows } = this.state;
    const textareaLineHeight = 16;
    const previousRows = e.target.rows;
    e.target.rows = minRows; // reset number of rows in textarea
    e.target.style.overflow = 'hidden'; //overflow because scrollbar affects e.target.scrollHeight
    const currentRows = ~~(e.target.scrollHeight / textareaLineHeight);
    if (currentRows === previousRows) {
      e.target.rows = currentRows;
    }
    if (currentRows >= maxRows) {
      e.target.rows = maxRows;
      e.target.style.overflow = 'auto';
      e.target.scrollTop = e.target.scrollHeight;
    }

    this.setState({
      title: e.target.value,
      rows: currentRows < maxRows ? currentRows : maxRows,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title } = this.state;
    if (!title)  return;
    this.props.actions.addCard({
      listId: this.props.listId,
      cardTitle: title,
      newCardId: uuid.v4(),
    });
    this.setState({
      title: '',
      rows: 3,
    }, () => this.textarea.focus())
  };

  render = () => {
    const { isOpened, title, rows } = this.state;
    return isOpened ? (
      <ClickOutside action={'mousedown'} toggleOpened={this.toggleOpened}>
        <Wrapper>
          <form onSubmit={this.handleSubmit}>
            <TextArea
              type="text"
              value={title}
              size=".875rem;"
              padding=".5rem"
              rows={rows}
              placeholder="Enter a card title..."
              ref={(e) => { this.textarea = e }}
              onKeyDown={this.handleKeyDown}
              onChange={(e) => this.handleChange(e)}
              spellCheck={false}
              autoFocus
            />
            <Actions>
              <SubmitButton type="submit" disabled={!title}>
                Create card
              </SubmitButton>
              <CancelButton onClick={() => this.toggleOpened()}>
                <FontAwesomeIcon icon="times" />
              </CancelButton>
            </Actions>
          </form>
        </Wrapper>
      </ClickOutside>
    ) : (
      <AddButton onClick={() => this.toggleOpened()}>
        + Add another card
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
