import React, { Component } from 'react';
import styled from 'styled-components';
import CardDescriptionEdit from './CardDescriptionEdit';

const Description = styled.p`
  font-size: .875rem;
  word-break: break-word;
  white-space: pre-line;
  cursor: pointer;
`;

const AddDescription = styled.a`
  display: flex;
  padding: .5rem .75rem;
  width: 100%;
  min-height: 4rem;
  font-size: .875rem;
  text-align: left;
  background-color: rgba(9, 30, 66, .08);
  border-radius: 3px;
  transition: background-color .2s ease-in;
  cursor: pointer;
  &:hover {
    background-color: rgba(9,30,66,.13);
  }
`;

const Button = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: .5rem 1rem;
  background-color: rgba(9, 30, 66, .08);
  border-radius: 3px;
  transition: background-color .2s ease-in;
  &:hover {
    background-color: rgba(9,30,66,.13);
  }
`;

class CardDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editDescription: false,
    }
  }

  toggleEditDescription = () => {
    this.setState({
      editDescription: !this.state.editDescription
    })
  };

  render() {
    const { cardId, cardDescription } = this.props;
    const { editDescription } = this.state;
    if (!cardDescription && !editDescription) {
      return (
        <AddDescription onClick={() => this.toggleEditDescription()}>
          Add a more detailed description...
        </AddDescription>
      )
    }
    return (
      !editDescription ? (
        <Description>
          {cardDescription}
          <Button onClick={() => this.toggleEditDescription()}>
            Edit
          </Button>
        </Description>
      ) : (
        <CardDescriptionEdit
          cardId={cardId}
          cardDescription={cardDescription}
          toggleEditDescription={this.toggleEditDescription}
        />
      )
    )
  }
}

export default CardDescription;
