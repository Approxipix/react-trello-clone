import React, { Component } from 'react';
import PropTypes from "prop-types";
import ListTitleEdit from './ListTitleEdit';
import styled from 'styled-components';

const Title = styled.h2`
  width: 100%;
  padding: .3rem .5rem;
  font-size: 1rem;
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
Title.displayName = 'Title';


class ListTitle extends Component {
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
    const { dragHandleProps, listId, listTitle } = this.props;
    const { editTitle } = this.state;

    return (
      !editTitle ? (
        <Title {...dragHandleProps} onClick={() => this.toggleEditTitle()}>
          {listTitle}
        </Title>
      ) : (
        <ListTitleEdit toggleEditTitle={this.toggleEditTitle} listId={listId} listTitle={listTitle} />
      )
    )
  }
}

ListTitle.defaultProps = {
  listId: '',
  listTitle: '',
};

ListTitle.propTypes = {
  listId: PropTypes.string.isRequired,
  listTitle: PropTypes.string.isRequired,
};

export default ListTitle;
