import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteAllCards } from '../../redux/listReducer/actions/actions';
import { SubmitButton, Text } from '../BaseComponent';

class ListDeleteAllCards extends Component {
   deleteAllCards =() => {
    this.props.actions.deleteAllCards({
      listId: this.props.listId
    });
    this.props.toggleOpened();
  };

  render() {
    return (
      <>
        <Text>
          This will remove all the cards in this list from the board.
        </Text>
        <SubmitButton color='danger' onClick={() => this.deleteAllCards()}>
          Delete all
        </SubmitButton>
      </>
    );
  }
}

ListDeleteAllCards.defaultProps = {
  toggleOpened: () => {},
};

ListDeleteAllCards.propTypes = {
  listId: PropTypes.string.isRequired,
  toggleOpened: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      deleteAllCards: deleteAllCards,
    }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(ListDeleteAllCards);
