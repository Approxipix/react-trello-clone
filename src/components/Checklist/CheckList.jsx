import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteCheckList } from '../../redux/checkListReducer/actions/actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CheckListProgress from './CheckListProgress';
import CheckListItemAdd from './CheckListItem/CheckListItemAdd';
import CheckListTitle from './CheckListTitle/CheckListTitle';
import CheckListItem from './CheckListItem/CheckListItem';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: .5rem;
  align-items: flex-start;
  position: relative;
  margin-bottom: .5rem;
  padding-left: calc(2rem - .5rem);
`;

const Icon = styled.div`
  position: absolute;
  left: 0;
  top: .45rem;
  font-size: 1rem;
`;

const CheckListContainer = styled.div`
  margin-bottom: .5rem;
`;
CheckListContainer.displayName = 'CheckListContainer';

const Actions = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Button = styled.button`
  padding: .5rem 1rem;
  color: #172b4d;
  background-color: rgba(9, 30, 66, .08);
  border-radius: 3px;
  transition: background-color .2s ease-in;
  &:hover {
    background-color: rgba(9,30,66,.13);
  }
  &:not(:first-child) {
    margin-left: .5rem;
  }
`;
Button.displayName = 'Button';

class CheckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideCompletedItems: false,
    }
  }

  deleteCheckList = () => {
    this.props.actions.deleteCheckList({
      cardId: this.props.cardId,
      checkListId: this.props.checkList._checkListId,
    })
  };

  toggleHideCompletedItems = () => {
    this.setState({
      hideCompletedItems: !this.state.hideCompletedItems
    })
  };

  render() {
    const { checkList } = this.props;
    const { hideCompletedItems } = this.state;

    if (!checkList) return null;

    const doneItems = checkList.items.filter(items => !!items.status).length;
    return (
      <Container>
        <Header>
          <Icon>
            <FontAwesomeIcon icon="check-square" />
          </Icon>
          <CheckListTitle
            checkListTitle={checkList.title}
            checkListId={checkList._checkListId}
          />
          <Button onClick={() => this.deleteCheckList()}>
            Delete
          </Button>
        </Header>
        <CheckListProgress items={checkList.items} />
        <CheckListContainer>
          {checkList.items.map((item, index) => (
            <CheckListItem
              key={index}
              index={index}
              status={item.status}
              hideCompletedItems={hideCompletedItems}
              description={item.description}
              checkListId={checkList._checkListId}
            />
          ))}
        </CheckListContainer>
        <Actions>
          <CheckListItemAdd checkListId={checkList._checkListId}/>
          {!!doneItems && (
            <Button onClick={() => this.toggleHideCompletedItems()}>
              {!hideCompletedItems
                ? 'Hide completed items'
                : `Show checked items (${doneItems})`
              }
            </Button>
          )}
        </Actions>
      </Container>
    );
  }
}

CheckList.defaultProps = {
  checkLists: null,
};

CheckList.propTypes = {
  cardId: PropTypes.string.isRequired,
  checkListId: PropTypes.string.isRequired,
  checkList: PropTypes.shape({
    _checkListId: PropTypes.string.isRequired,
    title: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        status: PropTypes.bool.isRequired,
        description: PropTypes.string,
      })
    ).isRequired
  })
};

function mapStateToProps(state, ownProps) {
  return {
    checkList: state.checkListReducer[ownProps.checkListId],
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
