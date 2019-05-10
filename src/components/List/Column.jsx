import React, { Component, PureComponent } from 'react';
import Task from '../Card/Task'
import styled from 'styled-components'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TaskAdder from '../Card/TaskAdder';
import ColumnActions from './ColumnActions';
import ColumnEdit from './ColumnEdit';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 15rem;
  margin: 0 .5rem;
  border: 1px solid lightgrey;
  border-radius: .2rem;
  background-color: #e3e3e3;
`;

const Title = styled.h3`
  cursor: default;
`;

const TaskList = styled.div`
  position: relative;
  padding: 0 .5rem 2.5rem .5rem;
  background-color: ${props => (props.isDraggingOver ? '#c1c1c1' : '#e3e3e3')}
  flex-grow: 1;
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
    return (
      <>
        {!!this.props.task && this.props.task.map((task, index) =>
          <Task key={task.taskId} task={task} boardIndex={this.props.boardIndex} listIndex={this.props.listIndex} index={index}/>
        )}
        <TaskAdder
          boardIndex={this.props.boardIndex}
          listIndex={this.props.listIndex}
        />
      </>
    )
  }
}

class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
    }
  }

  closeTooltip = () => {
    this.setState({
      isOpened: false,
      isEditing: false,

    })
  }

  closeEdit = () => {
    this.setState({
      isEditing: false,
    })
  }

  render() {
    return (
      <Draggable draggableId={`${this.props.column.listId}`} index={this.props.index}>
        {(provided) => (
          <Container {...provided.draggableProps} ref={provided.innerRef}>
            <Header isEditing={this.state.isEditing} {...provided.dragHandleProps}>
              {!this.state.isEditing ? (
                <Title onClick={() => {
                  this.setState({
                    isEditing: true,
                  })
                }}>
                  {this.props.column.title}
                </Title>
              ) : (
                <ColumnEdit closeEdit={this.closeEdit} boardIndex={this.props.boardIndex}
                            listIndex={this.props.listIndex}/>
              )}
              <Actions onClick={() => this.setState({isOpened: true})}>
                <FontAwesomeIcon icon="ellipsis-h" />
              </Actions>
            </Header>
            {this.state.isOpened && (
              <ColumnActions closeTooltip={this.closeTooltip} boardIndex={this.props.boardIndex} columnID={this.props.column.listId}/>
            )}
            <Droppable
              type={'task'}
              droppableId={`${this.props.column.listId}`}
            >
              {(provided, snapshot) => (
                <TaskList {...provided.droppableProps} ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
                  <InnerList
                    boardIndex={this.props.boardIndex}
                    listIndex={this.props.listIndex}

                    task={this.props.column.task}
                  />
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    )
  }
}

export default Column;
