import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateCheckListItem, deleteCheckListItem } from '../../redux/rootReducer/actions';
import styled from 'styled-components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CheckBox } from '../BaseComponent';

const Item = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 10px;
  line-height: 36px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const Desc = styled.label`
  display: flex;
  align-items: center;
  width: 100%;
  padding-right: 40px;
  cursor: pointer;
`;

const Text = styled.div`
  font-size: 16px;
  cursor: pointer;
  text-decoration: ${props => props.status ? 'line-through' : 'none'}
  color: ${props => props.status ? '#ccc' : 'initial'}
  font-style: ${props => props.status ? 'italic' : 'normal'}
`;

const Check = styled.input`
  display: none;
`;


const Button = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  padding: 7px;
  color: #afafaf;
  line-height: 0;
  border: 0;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in;
  
  &:hover {
    color: #ccc;
  }
`;


class CheckListItem extends Component {

  handleDelete = () => {
    this.props.actions.deleteCheckListItem({
      cardIndex: this.props.cardIndex,
      checkBoxItemIndex: this.props.checkBoxItemIndex,
      listIndex: this.props.listIndex,
      checkBoxIndex: this.props.checkBoxIndex,
    })
  };

  handleStatus = () => {
    this.props.actions.updateCheckListItem({
      cardIndex: this.props.cardIndex,
      checkBoxItemIndex: this.props.checkBoxItemIndex,
      listIndex: this.props.listIndex,
      checkBoxIndex: this.props.checkBoxIndex,
      status: !this.props.status,
    })
  };

  render() {
    const { status, description } = this.props;
    if (this.props.hide && status) return null;
    return (
      <Item>
        <Desc onClick={(e) => e.stopPropagation() }>
          <CheckBox status={status}>
            <span>
              <svg width="12px" height="10px" viewBox="0 0 12 10">
                <polyline points="1.5 6 4.5 9 10.5 1" />
              </svg>
            </span>
          </CheckBox>
          <Check
            type="checkbox"
            onChange={() => this.handleStatus()}
            checked={status}
          />
          <Text status={status}>{description}</Text>
        </Desc>
        <Button type="button"
                onClick={() => this.handleDelete()}
        >
          delete
        </Button>
      </Item>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { rootReducer } = state;
  const board = rootReducer.boards[rootReducer.currentBoardIndex];
  const list = board.lists[ownProps.listIndex];
  const card = list.cards[ownProps.cardIndex];
  const items = card.checkLists[ownProps.checkBoxIndex].items[ownProps.checkBoxItemIndex];
  const status = card.checkLists[ownProps.checkBoxIndex].items[ownProps.checkBoxItemIndex].status;
  const description = card.checkLists[ownProps.checkBoxIndex].items[ownProps.checkBoxItemIndex].description;

  return {
    items: items,
    status: status,
    description: description
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckListItem);
