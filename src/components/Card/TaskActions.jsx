import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components'
import { bindActionCreators } from 'redux';
import { deleteTask } from '../../redux/rootReducer/actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index";

const Wrapper = styled.div`
  position: absolute;
  top: 10%;
  left: 60%;
  padding-top: .5rem;
  background-color: #fff;
  border-radius: .2rem;
  box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 8px;
  width: 10rem;
  z-index: 10;
`;

const Action = styled.div`

`;

const Button = styled.button`
  width: 100%;
  padding: .5rem;
  text-align: left; 
  color: #444;
  font-weight: 600;
  transition: background-color .1s;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
  }
`;

const Close = styled.button`
  cursor: pointer;
`;

const Title = styled.h4`

`;

const Header = styled.div`
  width: 100%;
  padding: 0 .5rem;
  margin-bottom: .5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;


class TaskActions extends Component {
  componentDidMount() {
    document.addEventListener('click', this.outerClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.outerClick);
  }

  outerClick = (e) => {
    let { target } = e;
    if (target.id === 'column-actions') {
      return;
    }
    if (!!target.closest && (target.closest('#column-actions'))) {
      return;
    }
    this.props.closeTooltip();
  };

  render = () => {
    return (
      <Wrapper id="column-actions">
        <Header>
          <Title>
            Lane actions
          </Title>
          <Close onClick={() => this.props.closeTooltip()}>
            <FontAwesomeIcon icon="times" />
          </Close>
        </Header>
        <Action>
          <Button onClick={() => {
            this.props.closeTooltip();
            this.props.isEdited();
          }}>
            Edit
          </Button>
          <Button onClick={() => {
            this.props.actions.deleteTask({
              listId: this.props.listIndex,
              index: this.props.boardIndex,
              task: this.props.taskId,
            })
          }}>
            Delete
          </Button>
        </Action>
      </Wrapper>
    )
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      deleteTask: deleteTask,
    }, dispatch)
  };
}


export default connect(null, mapDispatchToProps)(TaskActions);
