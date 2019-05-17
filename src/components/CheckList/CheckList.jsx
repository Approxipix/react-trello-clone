import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteCheckList } from '../../redux/rootReducer/actions';
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
      cardId: this.props.cardId,
      checkListId: this.props.checkList._checkListId,
    })
  };

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
    const { checkList, cardId} = this.props;
    const doneItems = checkList.items.filter(items => !!items.status).length;
    return (
      <Container>
        {!this.state.isEditing ? (
          <Title onClick={() => this.toggleEditing()}>
            {checkList.title}
          </Title>
        ) : (
          <EditCheckListTitle
            checkListTitle={checkList.title}
            toggleEditing={this.toggleEditing}
            checkListId={checkList._checkListId}/>
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

        <CheckListProgress items={checkList.items}/>

        {checkList.items.map((item, index) => (
         <CheckListItem
           hide={this.state.hide}
           key={index}
           status={item.status}
           desc={item.description}
           index={index}
           checkListId={checkList._checkListId}
         />
        ))}
        <AddCheckListItem checkListId={checkList._checkListId} />
      </Container>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    checkList: state.checkListReducer[ownProps.chekListId],
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
