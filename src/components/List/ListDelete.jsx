import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteList } from '../../redux/listReducer/actions/actions';
import { Text, SubmitButton } from '../BaseComponent';

class ListDelete extends Component {
  deleteList = () => {
    const { listId, boardId } = this.props;
    this.props.actions.deleteList({
      boardId: boardId,
      listId: listId,
    });
  };

  render() {
    return (
      <>
        <Text>
          All actions will be removed from the activity feed and you won’t be able to re-open the list.
          There is no undo.
        </Text>
        <SubmitButton color='danger' onClick={() => this.deleteList()}>
          Delete list
        </SubmitButton>
      </>
    );
  }
}

ListDelete.defaultProps = {
  boardId: '',
  listId: '',
};

ListDelete.propTypes = {
  boardId: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      deleteList: deleteList,
    }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(ListDelete);
