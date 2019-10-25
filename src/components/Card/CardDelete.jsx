import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteCard } from '../../redux/cardReducer/actions/actions';
import { Text, SubmitButton } from '../BaseComponent';
import { history } from "../../redux/store";

class CardDelete extends Component {
  deleteCard = () => {
    const { listId, cardId, currentBoardID } = this.props;
    this.props.actions.deleteCard({
      listId: listId,
      cardId: cardId,
    });
    history.push(`/b/${currentBoardID}`)
  };

  render() {
    return (
      <>
        <Text>
          All actions will be removed from the activity feed and you won’t be able to re-open the card.
          There is no undo.
        </Text>
        <SubmitButton color='danger' onClick={() => this.deleteCard()}>
          Delete card
        </SubmitButton>
      </>
    );
  }
}

CardDelete.propTypes = {
  currentBoardID: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
  cardId: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    currentBoardID: state.rootReducer.currentBoardID,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      deleteCard: deleteCard,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDelete);
