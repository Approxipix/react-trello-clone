import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteCheckList } from '../../redux/boardReducer/actions';
import styled from 'styled-components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CheckListItem from './CheckListItem'
import CheckListProgress from './CheckListProgress'
import AddCheckListItem from './AddCheckListItem'
import EditCheckListTitle from './EditCheckListTitle'

const Container = styled.div`
  position: relative;
`;

const Title = styled.h4`
  margin-bottom: .5rem;
  padding: .3rem .5rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

const Button = styled.button``;

class CheckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: false,
      isEditing: false,
    }
  }

  delete = () => {
    this.props.actions.deleteCheckList({
      cardIndex: this.props.cardIndex,
      listIndex: this.props.listIndex,
      checkBoxIndex: this.props.checkBoxIndex,
    })
  }

  hide = () => {
    this.setState({
      hide: !this.state.hide
    })
  }

  toggleEditing = () => {
    this.setState({
      isEditing: !this.state.isEditing
    })
  };

  render() {
    const { items, checkList, listIndex,  cardIndex, checkBoxIndex, doneItems} = this.props;
    return (
      <Container>
        {!this.state.isEditing ? (
          <Title onClick={() => this.toggleEditing()}>
            {checkList.title}
          </Title>
        ) : (
          <EditCheckListTitle toggleEditing={this.toggleEditing} checkBoxIndex={checkBoxIndex} cardIndex={cardIndex} listIndex={listIndex}/>
        )}
        <Button onClick={() => this.delete()}>
          delete
        </Button>

        {!!doneItems && (
          <Button onClick={() => this.hide()}>
            {!this.state.hide ? (
              'Hide completed'
            ) : (
              `Show chhecked ${doneItems}`
            )}
          </Button>
        )}
        <CheckListProgress checkBoxIndex={checkBoxIndex} cardIndex={cardIndex} listIndex={listIndex}/>
        {!!items && items.map((item, index) => (
         <CheckListItem hide={this.state.hide} key={index} item={item} checkBoxItemIndex={index} checkBoxIndex={checkBoxIndex} cardIndex={cardIndex} listIndex={listIndex}/>
        ))}
        <AddCheckListItem checkListIndex={checkBoxIndex} cardIndex={cardIndex} listIndex={listIndex}/>
      </Container>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { rootReducer } = state;
  const board = rootReducer.boards[rootReducer.currentBoardIndex];
  const list = board.lists[ownProps.listIndex];
  const card = list.cards[ownProps.cardIndex];
  const items = card.checkLists[ownProps.checkBoxIndex].items;
  const checkList = card.checkLists[ownProps.checkBoxIndex];
  const doneItems = items.filter(item => !!item.status).length;
  return {
    board: board,
    list: list,
    card: card,
    items: items,
    checkList: checkList,
    doneItems: doneItems
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      deleteCheckList: deleteCheckList,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckList);
