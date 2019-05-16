import React, { Component } from 'react';
import styled from 'styled-components';
import CardDescriptionEdit from './CardDescriptionEdit';

const Desc = styled.h4`
  margin-bottom: .5rem;
  padding: .3rem .5rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

const AddDescription = styled.div``;

class CardDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDescEditing: false,
    }
  }

  toggleIsDescEditing = () => {
    this.setState({
      isDescEditing: !this.state.isDescEditing
    })
  };

  render() {
    const { cardId, cardDescription } = this.props;
    const { isDescEditing } = this.state;

    if (isDescEditing) {
      return (
        <CardDescriptionEdit
          cardId={cardId}
          cardDescription={cardDescription}
          toggleIsDescEditing={this.toggleIsDescEditing}
        />
      )
    }
    if (!cardDescription) {
      return (
        <AddDescription onClick={() => this.toggleIsDescEditing()}>
          Add a more detailed description…
        </AddDescription>
      )
    }
    return (
      <Desc onClick={() => this.toggleIsDescEditing()}>
        {cardDescription}
      </Desc>
    )
  }
}


export default CardDescription;
