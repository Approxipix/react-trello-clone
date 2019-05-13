import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editBoardColor } from '../redux/boardReducer/actions';
import styled from 'styled-components'
import ClickOutside from './ClickOutside'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index";

const Container = styled.div`
  position: relative;
`;

const Button = styled.button`
  margin: 0.5rem;
  padding: .5rem;
  color: #fff;
  border-radius: .2rem;
  transition: background .2s ease-in-out;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

const Menu = styled.ul`
  position: absolute;
  top: 90%;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: .3rem;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.3) 2px 2px 8px;
  z-index: 10;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 2rem;
  background-color: ${props => props.value};
  color: #fff;
  cursor: pointer;
  &:not(:last-child) {
    margin-bottom: .3rem;
  }
  &:hover {
    box-shadow: inset 0px 0px 0px 40px rgba(0, 0, 0, .3)
  }
`;

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      colors: ['#2E7EAF', '#00603d', '#D29034', "#89609D"]
    }
  }

  toggleOpened = () => {
    this.setState({
      isOpened: !this.state.isOpened
    })
  };

  render() {
    const { board } = this.props;
    const { colors, isOpened } = this.state;
    return (
      <Container>
        <Button onClick={() => this.toggleOpened()}>
          &nbsp;Color &nbsp;&#9662;
        </Button>
        {!!isOpened && (
          <ClickOutside toggleOpened={this.toggleOpened}>
            <Menu className="color-picker-menu">
              {colors.map(color => (
                <MenuItem
                  value={color}
                  key={color}
                  onClick={() => {
                    this.props.actions.editBoardColor({ color: color });
                    this.setState({isOpened: false})
                  }}
                >
                  {board.color === color && (
                    <FontAwesomeIcon icon="check" />
                  )}
                </MenuItem>
              ))}
            </Menu>
          </ClickOutside>
        )}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { rootReducer } = state;
  return {
    board: rootReducer.boards[rootReducer.currentBoardIndex],
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      editBoardColor: editBoardColor,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker);
