import React, { Component } from 'react';
import CheckListTitleEdit from './CheckListTitleEdit'
import styled from 'styled-components'

const Title = styled.h3`
  padding: .3rem .5rem;
  font-size: 1.2rem;
  font-weight: 600;
`;

class CheckListTitle extends Component {
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
    const { checkListId, checkListTitle} = this.props;
    const { editTitle } = this.state;
    return (
      !editTitle ? (
          <Title onClick={() => this.toggleEditTitle()}>
            {checkListTitle}
          </Title>
        ) : (
          <CheckListTitleEdit
            toggleEditing={this.toggleEditTitle}
            checkListTitle={checkListTitle}
            checkListId={checkListId}
          />
        )
    );
  }
}

export default CheckListTitle;
