import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editBoardColor } from '../../redux/boardReducer/actions/actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
`;

const List = styled.ul`
  position: absolute;
  top: 90%;
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  grid-gap: .75rem;
  width: 100%;
`;
List.displayName = 'List';

const Item = styled.li`
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5rem;
  background-color: ${props => props.value};
  border-radius: .5rem;
  color: #fff;
  cursor: pointer;
  &:hover {
    box-shadow: inset 0 0 0 10rem rgba(0, 0, 0, .1)
  }
`;
Button.displayName = 'Button';

class BoardBackgroundEdit extends Component {
  editBoardColor = (color) => {
    this.props.actions.editBoardColor({
      boardId: this.props.boardId,
      boardColor: color
    });
  };

  render() {
    const { boardColor, colors } = this.props;
    return (
      <Container>
        <List>
          {colors.map((color, index) => (
            <Item key={index}>
              <Button value={color} onClick={() => this.editBoardColor(color)}>
                {boardColor === color && <FontAwesomeIcon icon="check" />}
              </Button>
            </Item>
          ))}
        </List>
      </Container>
    );
  }
}

BoardBackgroundEdit.propTypes = {
  boardId: PropTypes.string.isRequired,
  boardColor: PropTypes.string.isRequired,
};

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

export default connect(mapStateToProps, mapDispatchToProps)(BoardBackgroundEdit);
