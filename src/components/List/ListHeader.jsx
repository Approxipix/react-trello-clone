import React, { Component, PureComponent } from 'react';
import styled from 'styled-components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index";
import ListActions from './ListActions';
import ListEdit from './ListEdit';

const Title = styled.h3`
  width: 100%;
  cursor: default;
`;

const Header = styled.div`
  margin-bottom: .5rem;
  padding: ${props => props.isEditing ? '0 .5rem 0 0' : '.5rem'};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Actions = styled.div`
  cursor: pointer;
`;


class ListHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      isEditing: false,
    }
  }

  toggleEditing = () => {
    this.setState({
      isEditing: !this.state.isEditing
    })
  };

  toggleOpened = () => {
    this.setState({
      isOpened: !this.state.isOpened
    })
  };

  render() {
    const { dragHandleProps, listId, listTitle, boardId } = this.props;
    const { isOpened, isEditing } = this.state;
    return (
      <>
        <Header
          isEditing={isEditing}
        >
          {!isEditing ? (
            <Title
              {...dragHandleProps}
              onClick={() => this.toggleEditing()}>
              {listTitle}
            </Title>
          ) : (
            <ListEdit
              toggleEditing={this.toggleEditing}
              listId={listId}
              listTitle={listTitle}
            />
          )}
          <Actions onClick={() => this.toggleOpened()}>
            <FontAwesomeIcon icon="ellipsis-h" />
          </Actions>
        </Header>
        {isOpened && (
          <ListActions
            toggleOpened={this.toggleOpened}
            boardId={boardId}
            listId={listId}
          />
        )}
      </>
    )
  }
}

function mapStateToProps(state, ownProps) {
  // const { rootReducer } = state;
  // const board = rootReducer.boards[ownProps.boardId];
  // const list = !!board && board.lists[ownProps.listIndex];
  // return {
  //   list: list,
  // }
}

export default ListHeader;
