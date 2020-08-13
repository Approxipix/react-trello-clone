import React, { Component } from 'react';
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index";
import ListActions from './ListActions/ListActions';
import ListTitle from './ListTitle/ListTitle';
import styled from 'styled-components';

const Header = styled.div`
  padding: .5rem .7rem 0rem .5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Icon = styled.div`
  cursor: pointer;
`;
Icon.displayName = 'Icon';


class ListHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
    }
  }

  toggleOpened = () => {
    this.setState({ isOpened: !this.state.isOpened })
  };

  render() {
    const { dragHandleProps, listId, listTitle, boardId } = this.props;
    const { isOpened } = this.state;

    return (
      <>
        <Header>
          <ListTitle dragHandleProps={dragHandleProps} listId={listId} listTitle={listTitle} />
          <Icon onClick={() => this.toggleOpened()}>
            <FontAwesomeIcon icon="ellipsis-h" />
          </Icon>
        </Header>
        {isOpened && (
          <ListActions toggleOpened={this.toggleOpened} boardId={boardId} listId={listId} />
        )}
      </>
    )
  }
}

ListHeader.defaultProps = {
  listTitle: '',
};

ListHeader.propTypes = {
  boardId: PropTypes.string,
  listId: PropTypes.string,
  listTitle: PropTypes.string.isRequired,
};

export default ListHeader;
