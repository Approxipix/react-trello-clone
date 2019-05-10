import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components'
import { bindActionCreators } from 'redux';
import { editColumn } from '../../redux/rootReducer/actions';

const Form = styled.form`
  width: 90%;
`;

const Input = styled.input`
  padding: .55rem .5rem .5rem;
  width: 100%;
  border: none;
  font-weight: bold;
  box-shadow: none;
  font-size: 1rem;
  color: #40424b;
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
      title: this.props.list.title,
    });
    document.addEventListener('click', this.outerClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.outerClick);
  }

  outerClick = (e) => {
    let { target } = e;
    if (target.id === 'list-edit-form') {
      return;
    }
    if (!!target.closest && (target.closest('#list-edit-form'))) {
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
    const { title } = this.state;
    if (!title)  return;
    const data = {
      boardIndex: this.props.boardIndex,
      listIndex: this.props.listIndex,
      listTitle: title,
    };
    this.props.actions.editColumn(data);
    this.props.closeEdit()
  };

  render = () => {
    const { title } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} id="list-edit-form">
        <Input
          autoFocus
          type="text"
          placeholder="Board name"
          value={title}
          onChange={(e) => this.handleChange('title', e.target.value)}
          spellCheck={false}
        />
      </Form>
    );
  };
}

function mapStateToProps(state, ownProps) {
  return {
    list: state.rootReducer.boards[ownProps.boardIndex].list[ownProps.listIndex],
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      editColumn: editColumn,
    }, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskEdit);
