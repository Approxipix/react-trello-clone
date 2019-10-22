import React, { Component } from 'react';
import CardTitleEdit from './CardTitleEdit';
import styled from 'styled-components';
import PropTypes from "prop-types";

const Title = styled.h2`
  margin-bottom: .5rem;
  padding: .3rem .5rem;
  font-size: 1.4rem;
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
Title.displayName = 'Title';

class CardTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editTitle: false,
    }
  }

  toggleEditTitle = () => {
    this.setState({
      editTitle: !this.state.editTitle
    })
  };

  render() {
    const { cardId, cardTitle } = this.props;
    const { editTitle } = this.state;
    return (
      !editTitle ? (
        <Title onClick={() => this.toggleEditTitle()}>
          {cardTitle}
        </Title>
      ) : (
        <CardTitleEdit
          cardId={cardId}
          cardTitle={cardTitle}
          toggleEditTitle={this.toggleEditTitle}
        />
      )
    )
  }
}

CardTitle.defaultProps = {
  cardId: '',
  cardTitle: '',
};

CardTitle.propTypes = {
  cardId: PropTypes.string.isRequired,
  cardTitle: PropTypes.string.isRequired,
};

export default CardTitle;
