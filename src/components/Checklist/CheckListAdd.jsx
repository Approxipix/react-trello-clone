import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addCheckList } from "../../redux/checkListReducer/actions/actions";
import { Input, SubmitButton } from "../BaseComponent";

class CheckListAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  handleChange = (e) => {
    this.setState({
      title: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title } = this.state;
    if (!title)  return;
    this.props.actions.addCheckList({
      checkListTitle: title,
      cardId: this.props.cardId,
      checkListId: Date.now().toString()
    });
    this.props.toggleTooltip()
  };

  render() {
    const { title } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          autoFocus
          type="text"
          placeholder="Add checklist title"
          value={title}
          onChange={(e) => this.handleChange(e)}
          spellCheck={false}
        />
        <SubmitButton type="submit" disabled={title === ""}>
          Add
        </SubmitButton>
      </form>
    )
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      addCheckList: addCheckList,
    }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(CheckListAdd);
