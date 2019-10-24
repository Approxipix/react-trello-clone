import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { editCheckListTitle } from '../../../redux/checkListReducer/actions/actions';
import ClickOutside from "../../ClickOutside/ClickOutside";
import { Input, } from '../../BaseComponent';

class CheckListTitleEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.checkListTitle || '',
    };
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      this.props.toggleEditTitle()
    }
  };

  handleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  };


  handleSubmit = (e) => {
    e.preventDefault();
    const { title } = this.state;
    const { actions } = this.props;
    if (!title)  return;
    actions.editCheckListTitle({
      checkListId: this.props.checkListId,
      checkListTitle: title,
    });
    this.props.toggleEditTitle()
  };

  render = () => {
    const { title } = this.state;
    return (
      <ClickOutside toggleOpened={this.props.toggleEditTitle}>
        <form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            padding=".3rem .5rem"
            margin="0"
            size="1.2rem"
            weight="600"
            value={title}
            placeholder="Enter list title..."
            onKeyDown={this.handleKeyDown}
            onChange={(e) => this.handleChange(e)}
            onBlur={this.handleSubmit}
            spellCheck={false}
            autoFocus
          />
        </form>
      </ClickOutside>
    );
  };
}

CheckListTitleEdit.defaultProps = {
  checkListId: '',
  toggleEditTitle: () => {},
};

CheckListTitleEdit.propTypes = {
  checkListId: PropTypes.string.isRequired,
  checkListTitle: PropTypes.string,
  toggleEditTitle: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      editCheckListTitle: editCheckListTitle,
    }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(CheckListTitleEdit);
