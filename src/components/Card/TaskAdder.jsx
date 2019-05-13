import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components'
import { bindActionCreators } from 'redux';
import { addTask } from '../../redux/boardReducer/actions';

const Wrapper = styled.div`
  position: relative;
  transform: translateY(1rem);
  background-color: #ddd;
  border-radius: .4rem
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: .5rem;
  padding: .5rem;
  border: 1px solid #bdc3c7;
  border-radius: 3px;
  box-shadow: none;
  font-weight: bold;
  font-size: .875rem;
  color: #40424b;
  line-height: 1rem;
  outline: none;
`;

const TextArea = styled.textarea`
  width: 100%;
  margin-bottom: .5rem;
  padding: .5rem;
  border: 1px solid #bdc3c7;
  border-radius: 3px;
  box-shadow: none;
  font-size: .75rem;
  color: #40424b;
  line-height: 1rem;
  resize: none;
  outline: none;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  font-size: .9rem;
`;

const CreateButton = styled.button`
  border: 1px solid #bdc3c7;
  padding: .5rem;
  margin-right: .3rem;
  border-radius: 3px;
  box-shadow: none;
  color: #40424b;
  cursor: pointer;
`;

const CancelButton = styled.button`
  margin-left: .3rem;
  padding: 0;
  font-size: inherit;
  color: #3498db;
  cursor: pointer;
`;

const AddButton = styled.button`
  position: absolute;
  left: 0;
  text-align: left;
  width: 100%;
  bottom: 0;
  padding: .6rem .75rem;
  font-size: 1rem; 
  color: #444;
  font-weight: 600;
  transition: background-color .1s;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
  }
`;

class TaskAdder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      title: '',
      content: '',
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.outerClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.outerClick);
  }

  outerClick = (e) => {
    let { target } = e;
    if (target.id === 'card-add-btn' || target.id === 'card-add-form') {
      return;
    }
    if (!!target.closest && (target.closest('#card-add-form'))) {
      return;
    }
    this.setState({ isOpened: false });
  };

  handleChange = (key, value) => {
    this.setState({
      ...this.state,
      [key]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title, content } = this.state;
    if (!title || !content)  return;
    const data = {
      boardIndex: this.props.boardIndex,
      listIndex: this.props.listIndex,
      taskTitle: title,
      taskContent: content,
    };
    this.props.actions.addTask(data);
    this.setState({
      isOpened: false,
      title: '',
      content: '',
    });
  };

  toggleOpened = () => {
    this.setState({
      isOpened: !this.state.isOpened,
      title: '',
      content: '',
    })
  };

  render = () => {
    const { isOpened, title, content } = this.state;
    return isOpened ? (
      <Wrapper>
        <form onSubmit={this.handleSubmit} id="card-add-form">
          <Input
            autoFocus
            type="text"
            placeholder="Board name"
            value={title}
            onChange={(e) => this.handleChange('title', e.target.value)}
            spellCheck={false}
          />
          <TextArea
            type="text"
            placeholder="Content"
            value={content}
            rows="4"
            onChange={(e) => this.handleChange('content', e.target.value)}
            spellCheck={false}
          />
          <Actions>
            <CreateButton
              type="submit"
              disabled={!title || !content}
            >
              Create card
            </CreateButton>
            or
            <CancelButton
              onClick={() => this.toggleOpened()}
            >
              cancel
            </CancelButton>
          </Actions>
        </form>
      </Wrapper>
    ) : (
      <AddButton
        id={'card-add-btn'}
        onClick={() => this.toggleOpened()}
      >
        Add a new card...
      </AddButton>
    );
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      addTask: addTask,
    }, dispatch)
  };
}


export default connect(null, mapDispatchToProps)(TaskAdder);
