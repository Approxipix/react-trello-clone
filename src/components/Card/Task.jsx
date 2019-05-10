import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { deleteTask } from '../../redux/rootReducer/actions';
import TaskActions from "./TaskActions";
import TaskEdit from "./TaskEdit";

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
  visibility: hidden;
  padding: .5rem;
  font-size: .75rem;
  color: #444;
  cursor: pointer;
  transition: transform .2s ease-in;
`;

const Container = styled.div`
  position: relative;
  padding: ${props => !props.isEditing && '.5rem'};
  margin-bottom: .5rem;
  border: ${props => !props.isEditing ? '1px solid lightgrey' : 'none'};
  border-radius: 2px;

  background-color: ${props =>
  !props.isEditing
    ? 'white'
    : 'transparent'};  
  &:hover {
    background-color: #ededed;
  }   
  &:hover ${Button} {
    visibility: visible;
  }   
`;


class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      isEditing: false,
    }
  }

  closeTooltip = () => {
    this.setState({
      isOpened: false,
    })
  }

  closeEdit = () => {
    this.setState({
      isEditing: false,
    })
  }

  isEdited = () => {
    this.setState({
      isEditing: true,
    })
  }

  render() {
    const { isEditing } = this.state;
    return (
      <Draggable draggableId={`${this.props.task.taskId}`}
                 index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            isEditing={isEditing}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {!isEditing ? (
              <>
                <Title>
                  {this.props.task.title}
                </Title>
                <Content>
                  {this.props.task.content}
                </Content>
              </>
            ) : (
              <TaskEdit
                closeEdit={this.closeEdit}
                boardIndex={this.props.boardIndex}
                listIndex={this.props.listIndex}
                taskId={this.props.index}
              />
            )}
            {!isEditing && (
              <Button onClick={() => {
                this.setState({
                  isOpened: true,
                })
              }}>
                <FontAwesomeIcon icon="ellipsis-h" />
              </Button>
            )}
            {this.state.isOpened && (
              <TaskActions
                isEdited={this.isEdited}
                closeTooltip={this.closeTooltip}
                boardIndex={this.props.boardIndex}
                listIndex={this.props.listIndex}
                taskId={this.props.task.taskId}
              />
            )}
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
