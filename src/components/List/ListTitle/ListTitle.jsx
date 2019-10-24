import React, { Component } from 'react';
import ListTitleEdit from './ListTitleEdit';
import styled from 'styled-components'

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


class ListHeader extends Component {
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
        <Title
          {...dragHandleProps}
          onClick={() => this.toggleEditTitle()}
        >
          {listTitle}
        </Title>
      ) : (
        <ListTitleEdit
          toggleEditTitle={this.toggleEditTitle}
          listId={listId}
          listTitle={listTitle}
        />
      )
    )
  }
}

export default ListHeader;
