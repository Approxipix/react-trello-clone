import React, { Component } from 'react';
import PropTypes from "prop-types";
import CheckListTitleEdit from './CheckListTitleEdit';
import styled from 'styled-components';

const Title = styled.h3`
  padding: .3rem .5rem;
  font-size: 1.2rem;
  font-weight: 600;
`;
Title.displayName = 'Title';

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
            toggleEditTitle={this.toggleEditTitle}
            checkListTitle={checkListTitle}
            checkListId={checkListId}
          />
        )
    );
  }
}

CheckListTitle.defaultProps = {
  checkListTitle: '',
};

CheckListTitle.propTypes = {
  checkListId: PropTypes.string.isRequired,
  checkListTitle: PropTypes.string.isRequired,
};

export default CheckListTitle;
