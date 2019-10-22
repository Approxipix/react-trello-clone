import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { addCard } from '../../redux/cardReducer/actions/actions';
import { TextArea, Actions, SubmitButton, CancelButton } from '../BaseComponent';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClickOutside from "../ClickOutside/ClickOutside";
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: .5rem;
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
AddButton.displayName = 'AddButton';

class CardAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      title: '',
    };
    this.textarea = React.createRef();
  }

  toggleOpened = () => {
    this.setState({
      isOpened: !this.state.isOpened,
      title: '',
    })
  };

  handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      this.toggleOpened();
    }
  };

  handleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title } = this.state;
    if (!title)  return;
    this.props.actions.addCard({
      listId: this.props.listId,
      cardTitle: title,
      newCardId: Date.now().toString(),
    });
    this.setState({ title: '' }, () => {
      if (!this.textarea.focus) return;
      this.textarea.focus()
    })
  };

  render = () => {
    const { isOpened, title } = this.state;
    return isOpened ? (
      <ClickOutside action={'mousedown'} toggleOpened={this.toggleOpened}>
        <Wrapper>
          <form onSubmit={this.handleSubmit}>
            <TextArea
              type="text"
              name="title"
              value={title}
              size=".875rem;"
              padding=".5rem"
              rows={3}
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
                <FontAwesomeIcon icon="times"/>
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

CardAdd.propTypes = {
  listId: PropTypes.string.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      addCard: addCard,
    }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(CardAdd);
