import React, { Component, PureComponent } from 'react';
import Card from '../Card/Card'
import styled from 'styled-components'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import CardAdder from '../Card/CardAdder';
import ListActions from './ListActions';
import ListEdit from './ListEdit';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 15rem;
  margin: 0 .5rem;
  border: 1px solid lightgrey;
  border-radius: .2rem;
  background-color: #dfe1e6;
  
  flex-shrink: 0;
  max-height: 83vh;
  padding-bottom: 3rem;
`;

const Title = styled.h3`
  cursor: default;
`;

const CardLIst = styled.div`
  position: relative;
  padding: 0 .5rem;
  background-color: ${props => (props.isDraggingOver ? '#c1c1c1' : '#dfe1e6')}
  flex-grow: 1;
  
  overflow: auto;
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

class InnerList extends Component {
  render() {
    const { cards, listIndex } = this.props;
    if (!cards) return null;
    return (
      <>
        {cards.map((card, index) =>
          <Card key={index} listIndex={listIndex} cardIndex={index}/>
        )}
      </>
    )
  }
}

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
    return (
      <Draggable
        index={listIndex}
        draggableId={`${list._listId}`}
      >
        {(provided) => (
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
            <Droppable
              type={'task'}
              droppableId={`${listIndex}`}
            >
              {(provided, snapshot) => (
                <CardLIst
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <InnerList
                    listIndex={listIndex}
                    cards={list.cards}
                  />
                  {provided.placeholder}
                </CardLIst>
              )}
            </Droppable>
            <CardAdder listIndex={listIndex} />
          </Container>
        )}
      </Draggable>
    )
  }
}

export default List;
