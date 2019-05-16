import React, { Component } from "react";
import styled from 'styled-components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClickOutside from "../ClickOutside";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { CancelButton, Input, SubmitButton } from "../BaseComponent";
import { addCheckList } from "../../redux/rootReducer/actions";

const Wrapper = styled.div`
  position: absolute;
  padding: .5rem 1rem;
  width: 15rem;
  top: calc(100% + 1rem);
  left: 50%;
  background-color: #fff;
  border-radius: .2rem;
  box-shadow: 0 8px 16px -4px rgba(9,30,66,.25), 0 0 0 1px rgba(9,30,66,.08);
  transform: translateX(-50%);
`;

const Header = styled.div`
  position: relative;
  color: #6b778c;
  padding: 0 2rem;
  text-align: center;
  border-bottom: 1px solid rgba(9,30,66,.13);
`;
const Title = styled.h3``;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`;

const Actions = styled.div``;

class CheckListTooltip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      this.props.toggleCheckListTooltip()
    }
  };

  handleChange = event => {
    this.setState({
      title: event.target.value
    });
  };


  handleSubmit = (e) => {
    e.preventDefault();
    const { title } = this.state;
    if (!title)  return;
    this.props.actions.addCheckList({
      checkListTitle: title,
      cardIndex: this.props.cardIndex,
      listIndex: this.props.listIndex,
    });
    this.props.toggleCheckListTooltip()
  };

  render() {
    const { title } = this.state;
    return (
      <ClickOutside toggleOpened={this.props.toggleCheckListTooltip}>
        <Wrapper className="tooltip-wrapper">
          <Header>
            <Title>
              CheckList
            </Title>
            <CloseButton>
              <FontAwesomeIcon icon="times" />
            </CloseButton>
          </Header>
          <form id="checklist-add-form" >
            <Input
              autoFocus
              type="text"
              placeholder="Add checklist title"
              value={title}
              onKeyDown={this.handleKeyDown}
              onChange={this.handleChange}
              spellCheck={false}
            />
            <Actions>
              <SubmitButton onClick={(e) => this.handleSubmit(e)} disabled={title === ""}>
                Save
              </SubmitButton>
              or
              <CancelButton onClick={() => this.props.toggleCheckListTooltip()}>
                cancel
              </CancelButton>
            </Actions>
          </form>
        </Wrapper>
      </ClickOutside>
    )
  };
}

function mapStateToProps(state, ownProps) {
  const { rootReducer } = state;
  const board = rootReducer.boards[rootReducer.currentBoardIndex];
  const list = board.lists[ownProps.listIndex];
  const card = list.cards[ownProps.cardIndex];
  const label = card.cardLabels;
  return {
    labels: state.rootReducer.labels,
    cardLabels: label
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      addCheckList: addCheckList,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckListTooltip);
