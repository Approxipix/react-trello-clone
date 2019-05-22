import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SidebarNavigationList from './SidebarNavigationList'
import styled from 'styled-components'

const Title = styled.h3`
  font-weight: 600;
`;

const List = styled.ul`
`;

const Item = styled.li`
  margin-bottom: .5rem;
  padding: .3rem .5rem;
  border-radius: .2rem;
  transition: background-color .2s ease-in;
  cursor: pointer;
  &:hover {
    background-color: rgba(9,30,66,.13);
  }
`;

const Link = styled.a`
  display: flex;
  align-items: center;
  font-size: .875rem;
  font-weight: 700;
`;

const Icon = styled.i`
  margin-right: .75rem;
  color: #42526e;
`;

class SidebarNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      component: null,
      editTitle: false,
    }
  }

  changeView = (e, item) => {
    e.preventDefault();
    this.props.changeView(item.component, item.title)
  };

  render() {
    return (
      <List>
        {SidebarNavigationList.map((item, index) => (
          <Item key={index} >
            <Link onClick={(e) => this.changeView(e, item)}>
              <Icon>
                <FontAwesomeIcon icon={item.icon} />
              </Icon>
              <Title>
                {item.title}
              </Title>
            </Link>
          </Item>
        ))}
      </List>
    );
  }
}

export default SidebarNavigation;
