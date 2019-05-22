import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClickOutside from "../../ClickOutside";
import ListActionsNavigation from './ListActionsNavigation'
import ListDelete from '../ListDelete'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  top: 2rem;
  left: calc(100% - 2rem);
  width: 17rem;
  background-color: #F4F5F7;
  border-radius: .2rem;
  box-shadow: rgba(0, 0, 0, 0.3) .125rem .125rem .5rem;
  z-index: 10;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .4rem;
  border-bottom: 1px solid rgba(9,30,66,.13);
`;

const Title = styled.h3`
  font-size: 1em;
  color: #6b778c;
  font-weight: normal;
`;

const Button = styled.button`
  color: #6b778c;
  font-size: 1rem;
  transition: color .1s ease-in;
  &:hover {
    color: #42526e;
  }
`;

const Body = styled.div`
   padding: .5rem 0;
`;

const Container = styled.div`
  padding: 0 .5rem;
`;

class ListActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actionView: null,
      actionTitle: 'List Actions',
    }
  }

  changeView = (component, title) => {
    this.setState({
      actionView: component,
      actionTitle: title,
    });
  };

  actionView = () => {
    const { boardId, listId } = this.props;
    const { actionView } = this.state;
    switch (actionView) {
      case ('ListDelete'):
        return (
          <Container>
            <ListDelete boardId={boardId} listId={listId}/>
          </Container>
        );
      default:
        return <ListActionsNavigation changeView={this.changeView}/>;
    }
  };

  render = () => {
    const { actionView, actionTitle } = this.state;
    return (
      <ClickOutside action={'mousedown'} toggleOpened={this.props.toggleOpened}>
        <Wrapper>
          <Header>
            <Button
              onClick={() => this.changeView(null, 'List Actions')}
              disabled={!actionView}
            >
              {!!actionView && <FontAwesomeIcon icon="chevron-left"/>}
            </Button>
            <Title>
              {actionTitle}
            </Title>
            <Button onClick={() => this.props.toggleOpened}>
              <FontAwesomeIcon icon="times"/>
            </Button>
          </Header>
          <Body>
            {this.actionView()}
          </Body>
        </Wrapper>
      </ClickOutside>
    )
  };
}

export default ListActions;
