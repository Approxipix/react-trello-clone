import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: ${props => 
    props.isDragging 
      ? 'lightgreen' 
      : 'white'};  
  &:hover {
    background-color: #ededed;
  }      
`;

const Title = styled.h4`
  padding-bottom: .5rem;
  margin-bottom: .5rem;
  border-bottom: 1px solid #e3e3e3
`;

const Content = styled.p`
  color: #4c4c4c;
  font-size: .75rem;
`;

class Task extends Component {
  render() {
    return (
      <Draggable draggableId={`${this.props.task.taskId}`}
                 index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <Title>
              {this.props.task.title}
            </Title>
            <Content>
              {this.props.task.content}
            </Content>
          </Container>
        )}
      </Draggable>
    )
  }
}

export default Task;
