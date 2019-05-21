import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { deleteList } from '../../redux/listReducer/actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index";
import styled from 'styled-components'
import ClickOutside from "../ClickOutside";

const Wrapper = styled.div`
  position: absolute;
  top: 10%;
  left: 60%;
  width: 10rem;
  background-color: #F4F5F7;
  border-radius: .2rem;
  box-shadow: rgba(0, 0, 0, 0.3) .125rem .125rem .5rem;
  z-index: 10;
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  border-bottom: 1px solid rgba(9,30,66,.13);
`;

const Close = styled.button`
  position: absolute;
  top: .5rem;
  right: 0;
  color: #6b778c;
  transition: color .1s ease-in;
  cursor: pointer;
  &:hover {
    color: #42526e;
  }
`;

const Title = styled.h3`
  padding: .75rem .5rem;
  font-size: .9rem;
  color: #6b778c;
  font-weight: normal;
`;


const Action = styled.div`
  padding: .5rem 0;
`;

const Button = styled.button`
  width: 100%;
  padding: .5rem;
  font-size: .875rem;
  color: #40424b;
  font-weight: 600;
  text-align: left; 
  transition: all .2s ease-in;
  cursor: pointer;
  &:hover {
    color: #fff;
    background-color: #2E7EAF;
  }
`;

class ListActions extends Component {
  deleteList = () => {
    const { listId, boardId } = this.props;
    this.props.actions.deleteList({
      boardId: boardId,
      listId: listId,
    });
    this.props.toggleOpened();
  };

  render = () => {
    return (
      <ClickOutside toggleOpened={this.props.toggleOpened}>
        <Wrapper>
          <Header>
            <Title>
              List actions
            </Title>
            <Close onClick={() => this.props.toggleOpened()}>
              <FontAwesomeIcon icon="times" />
            </Close>
          </Header>
          <Action>
            <Button onClick={() => this.deleteList()}>
              Delete List
            </Button>
          </Action>
        </Wrapper>
      </ClickOutside>
    )
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      deleteList: deleteList,
    }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(ListActions);
