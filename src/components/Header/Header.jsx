import React from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import HeaderNavigationList from './HeaderNavigationList';
import logo from '../../images/logo.svg'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  align-items: center;
  padding: 0 1.5rem;
  background-color: ${props => props.color};
  box-shadow: inset 0px 0px 0px 40px rgba(0, 0, 0, .3);
  transition: background-color .2s ease-in;
`;

const Nav = styled.nav``;

const NavList = styled.ul`
  display: flex;
`;

const NavItem = styled.li`
  display: flex;
  align-items: center;
  margin-right: .5rem
  padding: .2rem .5rem
  color: rgba(255, 255, 255, 0.8);
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.2);
  transition: all .2s ease-in;
  &:hover {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.25);
  }
`;

const NavIcon = styled.i`
  margin-right: .3rem;
  font-size: 1rem;
`;

const NavTitle = styled.h3`
  font-size: 1rem;
  line-height: 1.5;
`;

const Logo = styled.img`
  width: 10rem;
  margin: 0 auto;
`;

const Actions = styled.div``;

const Header = ({ boards, currentBoardID }) => {
  const currentPath = window.location.pathname;
  let headerBackground = "#2E7EAF";
  if (boards[currentBoardID]) {
    headerBackground = boards[currentBoardID].color
  }
  return (
    <Wrapper color={headerBackground}>
      <Nav>
        {HeaderNavigationList.map((item, index) => {
          if (currentPath === item.path) return null;
          return (
            <NavList key={index}>
              <NavLink to={item.path}>
                <NavItem>
                  <NavIcon>
                    <FontAwesomeIcon icon={item.faIcon} />
                  </NavIcon>
                  <NavTitle>
                    {item.title}
                  </NavTitle>
                </NavItem>
              </NavLink>
            </NavList>
          )
        })}
      </Nav>
      <Logo src={logo} />
      <Actions />
    </Wrapper>
  )
};

Header.defaultProps = {
  boards: [],
  currentBoardID: null,
};

Header.propTypes = {
  boards: PropTypes.objectOf(
    PropTypes.shape({
      _boardId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      lists: PropTypes.arrayOf(PropTypes.string).isRequired
    })
  ),
  currentBoardID: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    boards: state.boardReducer,
    currentBoardID: state.rootReducer.currentBoardID,
  }
}

export default connect(mapStateToProps)(Header);
