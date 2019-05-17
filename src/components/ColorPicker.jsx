import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editBoardColor } from '../redux/boardReducer/actions';
import styled from 'styled-components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index";
import ClickOutside from './ClickOutside'

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
    }
  }

  editBoardColor = (color) => {
    this.props.actions.editBoardColor({
      boardId: this.props.boardId,
      boardColor: color
    });
    this.setState({isOpened: false})
  };

  toggleOpened = () => {
    this.setState({
      isOpened: !this.state.isOpened
    })
  };

  render() {
    const { boardColor, colors } = this.props;
    const { isOpened } = this.state;
    return (
      <Container>
        <Button onClick={() => this.toggleOpened()}>
          &nbsp;Color &nbsp;&#9662;
        </Button>
        {!!isOpened && (
          <ClickOutside toggleOpened={this.toggleOpened}>
            <Menu>
              {colors.map((color, index) => (
                <MenuItem
                  key={index}
                  value={color}
                  onClick={() => this.editBoardColor(color)}
                >
                  {boardColor === color && (
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
  return {
    colors: state.rootReducer.colors,
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
