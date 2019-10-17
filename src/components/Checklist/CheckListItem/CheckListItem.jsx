import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateCheckListItem, deleteCheckListItem } from '../../../redux/checkListReducer/actions/actions';
import { CheckBox } from '../../BaseComponent';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components'

const HideCheckBox = styled.input`
  display: none;
`;

const Description = styled.div`
  font-size: .875rem;
  color: ${props => props.status ? '#6b778c' : 'initial'}
  font-style: ${props => props.status ? 'italic' : 'normal'}
  text-decoration: ${props => props.status ? 'line-through' : 'none'}
`;

const Button = styled.button`
  position: absolute;
  left: 100%;
  top: 50%;
  font-size: 1rem;
  color: #e44979;
  cursor: pointer;
  transition: all 0.2s ease-in;
  transform: translate(0, -50%);
`;

const Wrapper = styled.label`
  position: relative;
  display: flex;
  padding: .5rem;
  border-radius: .2rem;
  transition: background-color .2s ease-in;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    background-color: rgba(9, 30, 66, .08);
    ${Button} {
      transform: translate(-105%, -50%);
    }
  }
`;

class CheckListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: props.status || '',
      description: props.description || '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.description !== this.props.description) {
      this.setState({ desc: nextProps.description });
    }
    if (nextProps.status !== this.props.status) {
      this.setState({ status: nextProps.status });
    }
  }

  handleDelete = () => {
    this.props.actions.deleteCheckListItem({
      checkListId: this.props.checkListId,
      checkListItemIndex: this.props.index,
    })
  };

  handleStatus = () => {
    this.setState({
      status: !this.state.status
    }, () => {
      this.props.actions.updateCheckListItem({
        checkListId: this.props.checkListId,
        checkListItemIndex: this.props.index,
        status: this.state.status,
      })
    })
  };

  render() {
    const { hideCompletedItems } = this.props;
    const { description, status } = this.state;
    if (hideCompletedItems && status) return null;
    return (
      <Wrapper onClick={(e) => e.stopPropagation()}>
        <CheckBox status={status}>
          <span>
            <svg width="10px" height="8px" viewBox="0 0 12 10">
              <polyline points="1.5 6 4.5 9 10.5 1" />
            </svg>
          </span>
        </CheckBox>
        <HideCheckBox
          type="checkbox"
          onChange={() => this.handleStatus()}
          checked={status}
        />
        <Description status={status}>
          {description}
        </Description>
        <Button type="button" onClick={() => this.handleDelete()}>
          <FontAwesomeIcon icon="times"/>
        </Button>
      </Wrapper>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      updateCheckListItem: updateCheckListItem,
      deleteCheckListItem: deleteCheckListItem,
    }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(CheckListItem);
