import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editCardDesc } from '../../../redux/cardReducer/actions';
import { Actions, CancelButton, SubmitButton, TextArea } from '../../BaseComponent';
import ClickOutside from '../../ClickOutside';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const textareaLineHeight = 16;

class CardDescriptionEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.cardDescription || '',
      rows: 2,
      minRows: 2,
    };
  }

  componentDidMount() {
    this.setState({
      rows: ~~(this.textarea.scrollHeight / textareaLineHeight)
    })
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      this.props.toggleEditDescription()
    }
  };

  handleChange = (e) => {
    const { minRows } = this.state;
    const previousRows = e.target.rows;
    e.target.rows = minRows; // reset number of rows in textarea
    e.target.style.overflow = 'hidden'; //overflow because scrollbar affects e.target.scrollHeight
    const currentRows = ~~(e.target.scrollHeight / textareaLineHeight);
    if (currentRows === previousRows) {
      e.target.rows = currentRows;
    }
    this.setState({
      description: e.target.value,
      rows: currentRows,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { description } = this.state;
    const { cardId } = this.props;
    this.props.actions.editCardDesc({
      cardDescription: description,
      cardId: cardId,
    });
    this.props.toggleEditDescription()
  };

  render() {
    const { description, rows } = this.state;
    return (
      <ClickOutside toggleOpened={this.props.toggleEditDescription}>
        <form>
          <TextArea
            type="text"
            size=".875rem;"
            padding=".5rem"
            value={description}
            rows={rows}
            placeholder="Edit card description"
            ref={(e) => { this.textarea = e }}
            onKeyDown={this.handleKeyDown}
            onChange={(e) => this.handleChange(e)}
            onBlur={() => this.props.toggleEditDescription()}
            autoFocus
            spellCheck={false}
          />
          <Actions>
            <SubmitButton onMouseDown={(e) => this.handleSubmit(e)}>
              Save
            </SubmitButton>
            <CancelButton onClick={() => this.props.toggleEditDescription()}>
              <FontAwesomeIcon icon="times"/>
            </CancelButton>
          </Actions>
        </form>
      </ClickOutside>
    );
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      editCardDesc: editCardDesc,
    }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(CardDescriptionEdit);
