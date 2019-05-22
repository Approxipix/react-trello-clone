import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components'
import { bindActionCreators } from 'redux';
import { editListTitle } from '../../../redux/listReducer/actions';
import { Input, TextArea, } from '../../BaseComponent';
import ClickOutside from "../../ClickOutside";

const Form = styled.form`
  width: 90%;
`;

class ListTitleEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.listTitle || '',
    };
  }

  handleChange = ( value) => {
    this.setState({
      title: value,
    });
  };

  handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      this.props.toggleEditTitle()
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title } = this.state;
    const { listId } = this.props;
    if (!title)  return;
    this.props.actions.editListTitle({
      listTitle: title,
      listId: listId
    });
    this.props.toggleEditTitle()
  };

  render = () => {
    const { title } = this.state;
    return (
      <ClickOutside toggleOpened={this.props.toggleEditTitle}>
        <Form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            margin="0"
            padding=".3rem .5rem"
            weight="600"
            value={title}
            placeholder="Enter list title..."
            onKeyDown={this.handleKeyDown}
            onChange={(e) => this.handleChange(e.target.value)}
            onBlur={this.handleSubmit}
            spellCheck={false}
            autoFocus
          />
        </Form>
      </ClickOutside>
    );
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      editListTitle: editListTitle,
    }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(ListTitleEdit);
