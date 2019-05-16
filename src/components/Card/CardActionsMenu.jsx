import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { addLabelToCard } from '../../redux/rootReducer/actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LabelTooltip from '../Tooltip/LabelTooltip';
import CheckListTooltip from '../Tooltip/CheckListTooltip';

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;
  padding-left: 1.8rem;
`;

const ButtonWrapper = styled.div`
  position: relative;
  &:not(:last-child) {
    margin-bottom: .5rem;
  }
`;


const Title = styled.h4`
  margin-bottom: .5rem;
  font-size: .75rem;
  text-transform: uppercase;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: .5rem .75rem;
  font-size: .875rem;
  font-weight: 600;
  border-radius: .2rem;
  text-align: left;
  background-color: #ebecf0;
  box-shadow: 0 1px 0 0 rgba(9,30,66,.13);
  cursor: pointer;
`;

const ButtonIcon = styled.div`
  margin-right: .5rem;
`;

class CardActionsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLabelTooltipOpened: false,
      isCheckListTooltipOpened: false,
    }
  }

  toggleLabelTooltip = () => {
    this.setState({
      isLabelTooltipOpened: !this.state.isLabelTooltipOpened
    })
  };

  toggleCheckListTooltip = () => {
    this.setState({
      isCheckListTooltipOpened: !this.state.isCheckListTooltipOpened
    })
  };

  handelAddLabel = (label) => {
    this.props.actions.addLabelToCard({
      cardId: this.props.card._cardId,
      cardLabel: label
    })
  };

  render() {
    const { isLabelTooltipOpened, isCheckListTooltipOpened } = this.state;
    const { card } = this.props;
    return (
      <Wrapper>
        <Title>
          Add to cards
        </Title>
        <Actions>
          <ButtonWrapper>
            <Button onClick={() => this.toggleLabelTooltip()}>
              <ButtonIcon>
                <FontAwesomeIcon icon="tag" />
              </ButtonIcon>
              Label
            </Button>
            {isLabelTooltipOpened && (
              <LabelTooltip
                cardId={card._cardId}
                cardLabels={card.cardLabels}
                handelAddLabel={this.handelAddLabel}
                toggleLabelTooltip={this.toggleLabelTooltip}
              />
            )}
          </ButtonWrapper>
          {/*<ButtonWrapper>*/}
          {/*  <Button onClick={() => this.toggleCheckListTooltip()}>*/}
          {/*    <ButtonIcon>*/}
          {/*      <FontAwesomeIcon icon="check-square" />*/}
          {/*    </ButtonIcon>*/}
          {/*    CheckList*/}
          {/*  </Button>*/}
          {/*  {isCheckListTooltipOpened && (*/}
          {/*    <CheckListTooltip*/}
          {/*      cardIndex={this.props.cardIndex}*/}
          {/*      listIndex={this.props.listIndex}*/}
          {/*      toggleCheckListTooltip={this.toggleCheckListTooltip}*/}
          {/*    />*/}
          {/*  )}*/}
          {/*</ButtonWrapper>*/}
        </Actions>
      </Wrapper>
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      addLabelToCard: addLabelToCard,
    }, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CardActionsMenu);
