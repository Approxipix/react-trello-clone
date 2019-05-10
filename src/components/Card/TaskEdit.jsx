import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components'
import { bindActionCreators } from 'redux';
import { editTask } from '../../redux/rootReducer/actions';

const Wrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: .5rem;
  padding: .5rem;
  border: 1px solid #bdc3c7;
  border-radius: 3px;
  font-weight: bold;
  box-shadow: none;
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

class TaskEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
    };
  }

  componentDidMount() {
    this.setState({
      title: this.props.task.title,
      content: this.props.task.content,
    });
    document.addEventListener('click', this.outerClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.outerClick);
  }

  outerClick = (e) => {
    let { target } = e;
    if (target.id === 'card-edit-form') {
      return;
    }
    if (!!target.closest && (target.closest('#card-edit-form'))) {
      return;
    }
    this.props.closeEdit();
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
      taskId: this.props.taskId
    };
    this.props.actions.editTask(data);
    this.props.closeEdit()
  };

  render = () => {
    const { title, content } = this.state;
    return (
      <Wrapper>
        <form onSubmit={this.handleSubmit} id="card-edit-form">
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
              Edit card
            </CreateButton>
            or
            <CancelButton
              onClick={() => this.props.closeEdit()}
            >
              cancel
            </CancelButton>
          </Actions>
        </form>
      </Wrapper>
    );
  };
}

function mapStateToProps(state, ownProps) {
  return {
    task: state.rootReducer.boards[ownProps.boardIndex].list[ownProps.listIndex].task[ownProps.taskId],
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      editTask: editTask,
    }, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskEdit);
