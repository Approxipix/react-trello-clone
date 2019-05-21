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

class ListHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    }
  }

  toggleEditing = () => {
    this.setState({
      isEditing: !this.state.isEditing
    })
  };

  render() {
    const { dragHandleProps, listId, listTitle } = this.props;
    const { isEditing } = this.state;
    return (
      !isEditing ? (
        <Title
          {...dragHandleProps}
          onClick={() => this.toggleEditing()}
        >
          {listTitle}
        </Title>
      ) : (
        <ListTitleEdit
          toggleEditing={this.toggleEditing}
          listId={listId}
          listTitle={listTitle}
        />
      )
    )
  }
}

export default ListHeader;
