import React, { Component, PureComponent } from 'react';
import { connect } from "react-redux/es/alternate-renderers";
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index";
import ListActions from './ListActions';
import ListEdit from './ListEdit';
import CardAdder from '../Card/CardAdder';
import Cards from './Cards'

const Container = styled.div`
  position: relative;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  max-height: 83vh;
  width: 16rem;
  margin: 0 .5rem;
  border: 1px solid lightgrey;
  border-radius: .2rem;
  background-color: #dfe1e6;
`;

const Title = styled.h3`
  cursor: default;
`;

const CardsWrap = styled.div`
  margin: 3px;
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


class List extends Component {
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
    const { list, listIndex } = this.props;
    const { isOpened, isEditing } = this.state;
    if (!list) return null;
    return (
      <Draggable
        index={listIndex}
        draggableId={`${list._listId}`}
        disableInteractiveElementBlocking
      >
        {(provided) => (
          <>
            <Container
              {...provided.draggableProps}
              ref={provided.innerRef}
            >
              <Header
                {...provided.dragHandleProps}
                isEditing={isEditing}
              >
                {!isEditing ? (
                  <Title onClick={() => this.toggleEditing()}>
                    {list.title}
                  </Title>
                ) : (
                  <ListEdit
                    toggleEditing={this.toggleEditing}
                    listIndex={listIndex}
                  />
                )}
                <Actions onClick={() => this.toggleOpened()}>
                  <FontAwesomeIcon icon="ellipsis-h" />
                </Actions>
              </Header>
              {isOpened && (
                <ListActions
                  toggleOpened={this.toggleOpened}
                  listId={list._listId}
                />
              )}
              <CardsWrap>
                <Cards listIndex={listIndex}/>
              </CardsWrap>
              <CardAdder listIndex={listIndex} />
            </Container>
            {provided.placeholder}
          </>
        )}
      </Draggable>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { rootReducer } = state;
  const board = rootReducer.boards[rootReducer.currentBoardIndex];
  const list = !!board && board.lists[ownProps.listIndex];
  return {
    list: list,
  }
}

export default connect(mapStateToProps)(List);
