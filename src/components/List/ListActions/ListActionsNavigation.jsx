import React, { Component } from 'react';
import ListActionsNavigationList from "./ListActionsNavigationList";
import styled from 'styled-components'

const List = styled.ul`
`;

const Item = styled.li`
  cursor: pointer;
`;

const Link = styled.a`
  display: block;
  padding: .3rem .75rem;
  font-weight: 700;
  transition: all .2s ease-in;
  &:hover {
    color: #fff;
    background-color: #2E7EAF;
  }
`;
Link.displayName = 'Link';

class ListActionsNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: ListActionsNavigationList,
    }
  }

  changeView = (e, item) => {
    e.preventDefault();
    this.props.changeView(item.component, item.title)
  };

  render() {
    const { navigation } = this.state;
    return (
      <List>
        {navigation.map((item, index) => (
          <Item key={index} >
            <Link onClick={(e) => this.changeView(e, item)}>
              {item.title}
            </Link>
          </Item>
        ))}
      </List>
    );
  }
}

export default ListActionsNavigation;
