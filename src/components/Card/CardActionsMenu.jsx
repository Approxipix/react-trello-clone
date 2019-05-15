import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { addLabelToCard } from '../../redux/boardReducer/actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LabelTooltip from '../Tooltip/LabelTooltip';

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
    }
  }

  toggleLabelTooltip = () => {
    this.setState({
      isLabelTooltipOpened: !this.state.isLabelTooltipOpened
    })
  };

  handelAddLabel = (label) => {
    this.props.actions.addLabelToCard({
      cardIndex: this.props.cardIndex,
      listIndex: this.props.listIndex,
      cardLabel: label
    })
  };

  render() {
    const { isLabelTooltipOpened } = this.state;
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
                handelAddLabel={this.handelAddLabel}
                toggleLabelTooltip={this.toggleLabelTooltip}
              />
            )}
          </ButtonWrapper>
          <Button>
            <ButtonIcon>
              <FontAwesomeIcon icon="check-square" />
            </ButtonIcon>
            CheckList
          </Button>
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
