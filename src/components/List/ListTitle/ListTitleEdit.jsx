import React, { Component } from "react";
import { connect } from "react-redux";
import styled from 'styled-components'
import { bindActionCreators } from 'redux';
import { editListTitle } from '../../../redux/listReducer/actions';
import { Input, } from '../../BaseComponent';
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

  handleSubmit = (e) => {
    e.preventDefault();
    const { title } = this.state;
    const { listId } = this.props;
    if (!title)  return;
    this.props.actions.editListTitle({
      listTitle: title,
      listId: listId
    });
    this.props.toggleEditing()
  };

  render = () => {
    const { title } = this.state;
    return (
      <ClickOutside toggleOpened={this.props.toggleEditing}>
        <Form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            padding=".3rem .5rem"
            weight="600"
            value={title}
            placeholder="Enter list title..."
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
