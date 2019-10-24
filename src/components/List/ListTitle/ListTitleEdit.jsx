import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { editListTitle } from '../../../redux/listReducer/actions/actions';
import ClickOutside from "../../ClickOutside/ClickOutside";
import { Input } from '../../BaseComponent';
import styled from 'styled-components';

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

  handleChange = (event) => {
    this.setState({
      title: event.target.value,
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
            onChange={(e) => this.handleChange(e)}
            onBlur={this.handleSubmit}
            spellCheck={false}
            autoFocus
          />
        </Form>
      </ClickOutside>
    );
  };
}

ListTitleEdit.defaultProps = {
  listId: '',
  listTitle: '',
  toggleEditTitle: () => {},
};

ListTitleEdit.propTypes = {
  listId: PropTypes.string.isRequired,
  listTitle: PropTypes.string.isRequired,
  toggleEditTitle: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      editListTitle: editListTitle,
    }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(ListTitleEdit);
