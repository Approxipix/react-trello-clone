import React, { Component } from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import logo from '../images/logo.png'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  background-color: #296D94;
`;

const Nav = styled.nav`

`;

const NavList = styled.ul`
  display: flex;
`;

const NavItem = styled.li`
  display: flex;
  align-items: center;
  margin-right: .5rem
  padding: .3rem .5rem
  color: rgba(255, 255, 255, 0.8);
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.2);
  transition: color .2s ease-in-out;
  &:hover {
    color: #fff;
   }
  }
`;

const NavIcon = styled.i`
  margin-right: .3rem;
  font-size: 1.2rem;
`;

const NavTitle = styled.div`
  font-size: 1rem;
  line-height: 1.5;
`;

const Logo = styled.img`
  width: 6.5rem;
  height: 4rem;
`;

const Actions = styled.div`
`;

class Header extends Component {
  render() {
    return (
      <Wrapper>
        <Nav>
          <NavList>
            <NavLink to="/boards">
              <NavItem>
                <NavIcon>
                  <FontAwesomeIcon icon="columns" />
                </NavIcon>
                <NavTitle>
                  Boards
                </NavTitle>
              </NavItem>
            </NavLink>
          </NavList>
        </Nav>
        <Logo src={logo} />
        <Actions />
      </Wrapper>
    )
  }
}

export default Header;
