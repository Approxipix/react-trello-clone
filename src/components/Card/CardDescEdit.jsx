import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editCardDescription } from '../../redux/boardReducer/actions';
import styled from 'styled-components'
import { TextArea, SubmitButton, CancelButton } from '../BaseComponent';
import ClickOutside from '../ClickOutside';

const Form = styled.form`
  width: 90%;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
`;

class CardDescEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.card.description || '',
    };
  }

  handleChange = (key, value) => {
    this.setState({
      ...this.state,
      [key]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { description } = this.state;
    const { cardIndex, listIndex } = this.props;
    if (!description)  return;
    this.props.actions.editCardDescription({
      cardDescription: description,
      cardIndex: cardIndex,
      listIndex: listIndex,
    });
    this.props.toggleIsDescEditing()
  };

  render() {
    const { description } = this.state;
    return (
      <ClickOutside toggleOpened={this.props.toggleIsDescEditing}>
        <Form id="card-edit-desc-form">
          <TextArea
            autoFocus
            type="text"
            rows={5}
            placeholder="Edit card description"
            value={description}
            onChange={(e) => this.handleChange('description', e.target.value)}
            spellCheck={false}
          />
          <Actions>
            <SubmitButton onClick={(e) => this.handleSubmit(e)}  disabled={!description}>
              Save
            </SubmitButton>
            or
            <CancelButton onClick={() => this.props.toggleIsDescEditing()}>
              cancel
            </CancelButton>
          </Actions>
        </Form>
      </ClickOutside>
    );
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      editCardDescription: editCardDescription,
    }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(CardDescEdit);
