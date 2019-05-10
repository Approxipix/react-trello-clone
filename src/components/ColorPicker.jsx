import React, { Component, PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import styled from 'styled-components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index";
import { connect } from "react-redux";
import { editColor } from "../redux/rootReducer/actions";

const Container = styled.div`
  position: relative;
`;
const Button = styled.button`
  padding: .5rem;
  margin: 0.5rem;
  cursor: pointer;
  color: #fff;
  border-radius: .2rem;
  transition: background .2s ease-in-out;
  white-space: nowrap;
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;
const Menu = styled.ul`
  position: absolute;
  top: 90%;
  display: flex;
  width: 100%;
  padding: .3rem;
  background-color: #fff;
  flex-direction: column;
`;
const MenuItem = styled.li`
  background-color: ${props => props.value};
  height: 2rem;
  width: 100%;
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
      color: ['#2E7EAF', '#00603d', '#D29034', "#89609D"]
    }
  }

  // handleSelection = color => {
  //   const { dispatch, boardId, boardColor } = this.props;
  //   // Dispatch update only if selected color is not the same as current board color.
  //   if (color !== boardColor) {
  //     dispatch({ type: "CHANGE_BOARD_COLOR", payload: { boardId, color } });
  //   }
  // };

  render() {
    const { isOpened } = this.state;
    return (
      <Container>
        <Button onClick={() => this.setState({isOpened: true})}>
          &nbsp;Color &nbsp;&#9662;
        </Button>
        {!!isOpened && (
          <Menu className="color-picker-menu">
            {this.state.color.map(color => (
              <MenuItem
                value={color}
                key={color}
                onClick={() => {
                  this.props.actions.editColor({color: color, boardIndex:this.props.boardIndex});
                  this.setState({isOpened: false})
                }}
              >
                {/*{color === boardColor && <FaCheck />}*/}
              </MenuItem>
            ))}
          </Menu>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {

  return {

  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      editColor: editColor,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker);
