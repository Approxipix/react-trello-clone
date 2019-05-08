import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { deleteTask } from '../redux/rootReducer/actions';

const Title = styled.h4`
  padding-bottom: .5rem;
  margin-bottom: .5rem;
  border-bottom: 1px solid #e3e3e3
`;

const Content = styled.p`
  color: #4c4c4c;
  font-size: .75rem;
`;

const Button = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(1.5rem);
  padding: .5rem;
  font-size: 1rem;
  color: #dd2d7d;
  cursor: pointer;
  transition: transform .2s ease-in;
  &:hover {
    color: #b7165e;
  }
`;

const Container = styled.div`
  position: relative;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  overflow: hidden;
  background-color: ${props =>
  props.isDragging
    ? 'lightgreen'
    : 'white'};  
  &:hover {
    background-color: #ededed;
  }   
  &:hover ${Button} {
    transform: translateX(0);
  }   
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
            <Button onClick={() => {
              this.props.actions.deleteTask({
                listId: this.props.listIndex,
                index: this.props.boardIndex,
                task: this.props.task.taskId,
              })
            }}>
              <FontAwesomeIcon icon="times" />
            </Button>
          </Container>
        )}
      </Draggable>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      deleteTask: deleteTask,
    }, dispatch)
  };
}


export default connect(null, mapDispatchToProps)(Task);
