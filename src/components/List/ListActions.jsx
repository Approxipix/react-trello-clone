import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { deleteList } from '../../redux/listReducer/actions';
import styled from 'styled-components'
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
      <Wrapper>
        <Header>
          <Title>
            Lane actions
          </Title>
          <Close onClick={() => this.props.toggleOpened()}>
            <FontAwesomeIcon icon="times" />
          </Close>
        </Header>
        <Action>
          <Button onClick={() => this.deleteList()}>
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
      deleteList: deleteList,
    }, dispatch)
  };
}


export default connect(null, mapDispatchToProps)(ListActions);
