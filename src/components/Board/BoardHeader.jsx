import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleSidebar } from '../../redux/rootReducer/actions/actions';
import BoardTitle from './BoardTitle/BoardTitle';
import styled from "styled-components";

const Header = styled.div`
  margin-bottom: 1rem;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.button`
  margin: 0.5rem;
  padding: .5rem .75rem;
  font-size: 1rem;
  color: #fff;
  white-space: nowrap;
  border-radius: .2rem;
  transition: background-color .2s ease-in;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
Button.displayName = 'Button';

const BoardHeader = (props) => {
  const { toggleSidebar } = props.actions;

  return (
    <Header>
      <BoardTitle />
      <Button onClick={() => toggleSidebar()}>
        Show menu
      </Button>
    </Header>
  )
};

BoardHeader.defaultProps = {
  toggleSidebar: () => {},
};

BoardHeader.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      toggleSidebar: toggleSidebar,
    }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(BoardHeader);
