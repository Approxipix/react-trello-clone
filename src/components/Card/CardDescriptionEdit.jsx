import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editCardDesc } from '../../redux/rootReducer/actions';
import styled from 'styled-components'
import ClickOutside from '../ClickOutside';

const Form = styled.form`
  width: 90%;
`;

const Input = styled.input`
  width: 100%;
  padding: .3rem .5rem;
  font-size: 1.5rem;
  color: #40424b;
  font-weight: 600;
  border: none;
  box-shadow: none;
`;

class CardDescriptionEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.cardDescription || '',
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
    const { cardId } = this.props;
    this.props.actions.editCardDesc({
      cardDescription: description,
      cardId: cardId,
    });
    this.props.toggleIsDescEditing()
  };

  render() {
    const { description } = this.state;
    return (
      <ClickOutside toggleOpened={this.props.toggleIsDescEditing}>
        <Form onSubmit={this.handleSubmit} id="card-edit-title-form">
          <Input
            autoFocus
            type="text"
            placeholder="Edit card description"
            value={description}
            onChange={(e) => this.handleChange('description', e.target.value)}
            spellCheck={false}
          />
        </Form>
      </ClickOutside>
    );
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      editCardDesc: editCardDesc,
    }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(CardDescriptionEdit);
