import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addBoard } from '../../redux/boardReducer/actions';
import styled from 'styled-components'
import { Backdrop, Input, SubmitButton, CancelButton, CloseBackdrop } from '../BaseComponent';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddButton = styled.button`
  font-size: 1rem; 
  color: #444;
  font-weight: 600;
  background-color: #ddd;
  border-radius: .4rem
  transition: background-color .1s;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
  }
`;

const Container = styled.div`
  position: absolute;
  display: flex;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
`;

const Form = styled.div`
  margin-right: 1rem;
  
`;

const InputWrappe = styled.div`
  padding: 1rem;
  border-radius: .2rem;
  background-color: ${props => props.color};
  margin-bottom: 1rem;
`;



const ColorPicker = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 1rem;
`;
const ColorPickerItem = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${props => props.color};
  border-radius: .2rem;
`;

class BoardAdder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      boardTitle: '',
      boardColor: props.colors[0] || '',
    };
  }

  handleChange = (e) => {
    this.setState({
      boardTitle: e.target.value
    });
  };

  handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      this.setState({
        isOpened: false
      });
    }
  };

  toggleOpened = () => {
    this.setState({
      isOpened: !this.state.isOpened,
      boardTitle: '',
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { boardTitle } = this.state;
    if (!boardTitle) return;
    this.props.actions.addBoard({
      boardTitle: boardTitle,
      boardColor: this.state.boardColor
    });
    this.setState({
      boardTitle: '',
    });
    this.textInput.focus();
  };

  render = () => {
    const { isOpened, boardTitle } = this.state;
    return isOpened ? (
      <Backdrop>
        <CloseBackdrop onClick={() => this.toggleOpened()} />
        <Container>
          <Form id="board-add-form" onSubmit={this.handleSubmit}>
            <InputWrappe color={this.state.boardColor}>
              <Input
                color={'rgba(225, 225, 225, .5)'}
                autoFocus
                ref={(input) => { this.textInput = input; }}
                type="text"
                placeholder="Add board title"
                value={boardTitle}
                onKeyDown={this.handleKeyDown}
                onChange={this.handleChange}
                spellCheck={false}
              />
            </InputWrappe>
            <Actions>
              <SubmitButton onClick={(e) => this.handleSubmit(e)} disabled={boardTitle === ""}>
                Create board
              </SubmitButton>
              <CancelButton onClick={() => this.toggleOpened()}>
                <FontAwesomeIcon icon="times" />
              </CancelButton>
            </Actions>
          </Form>
          <ColorPicker>
            {this.props.colors.map((item, index) => (
              <ColorPickerItem color={item} key={index} onClick={() => this.setState({boardColor: item})}>
                {this.state.boardColor === item && (
                  <FontAwesomeIcon icon="check" />
                )}
              </ColorPickerItem>
            ))}
          </ColorPicker>
        </Container>
      </Backdrop>
    ) : (
      <AddButton onClick={() => this.toggleOpened()}>
        Create new board...
      </AddButton>
    );
  };
}

function mapStateToProps(state, ownProps) {
  return {
    colors: state.rootReducer.colors,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      addBoard: addBoard,
    }, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(BoardAdder);
