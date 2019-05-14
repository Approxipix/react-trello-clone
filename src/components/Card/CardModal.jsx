import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { deleteCard } from '../../redux/boardReducer/actions';
import TaskEdit from './CardEdit'

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 640px;
  max-width: 100%;
  max-height: calc(100% - 8rem);
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 1rem;
`;

const Header = styled.div`

`;

const Title = styled.h4`

`;

const Description = styled.p`

`;

const Close = styled.button`
 display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      background: transparent;
      border: none;
      outline: none;
`;

class CardModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    }
  }

  componentWillUnmount() {
    document.documentElement.classList.remove('scroll-disabled');
  }

  closeEdit = () => {
    this.setState({
      isEditing: false,
    })
  }

  render() {
    if (this.props.isOpened) {
      document.documentElement.classList.add('scroll-disabled');
    }
    if (!this.props.isOpened) return false;
    return (
      <Backdrop>
        <Close onClick={() => {
          document.documentElement.classList.remove('scroll-disabled');
          this.props.toggleModal(false)
        }}/>
        <Container onClick={(e) => e.preventDefault()}>
          <Header>
            <button onClick={() => this.setState({isEditing: true})}>edit</button>
            {this.state.isEditing && (
              <TaskEdit
                closeEdit={this.closeEdit}
                boardIndex={this.props.boardIndex}
                listIndex={this.props.listIndex}
                taskId={this.props.taskId}
              />
            )}
            <Title>
              {this.props.task.title}
            </Title>
          </Header>
          <Description>
            {this.props.task.content}
          </Description>
          <button>
            close
          </button>
        </Container>
      </Backdrop>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      // deleteCard: deleteCard,
    }, dispatch)
  };
}


export default connect(null, mapDispatchToProps)(CardModal);
