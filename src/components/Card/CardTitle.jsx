import React, { Component } from 'react';
import styled from 'styled-components';
import CardTitleEdit from './CardTitleEdit';

const Title = styled.h4`
  margin-bottom: .5rem;
  padding: .3rem .5rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

class CardTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTitleEditing: false,
    }
  }

  toggleIsTitleEditing = () => {
    this.setState({
      isTitleEditing: !this.state.isTitleEditing
    })
  };

  render() {
    const { cardId, cardTitle } = this.props;
    const { isTitleEditing } = this.state;

    if (isTitleEditing) {
      return (
        <CardTitleEdit
          cardId={cardId}
          cardTitle={cardTitle}
          toggleIsTitleEditing={this.toggleIsTitleEditing}
        />
      )
    }
    return (
      <Title onClick={() => this.toggleIsTitleEditing()}>
        {cardTitle}
      </Title>
    )
  }
}


export default CardTitle;
