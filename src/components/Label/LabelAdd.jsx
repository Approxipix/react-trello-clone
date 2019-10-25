import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { addLabelToCard } from "../../redux/cardReducer/actions/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';
import Label from "./Label";

const LabelList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0 .5rem;
`;

const LabelItem = styled.li`
  position: relative;
  height: 2.25rem;
  width: 100%;
  margin-bottom: .3rem;
  background-color: ${props => props.value};
  cursor: pointer;
  border-radius: .2rem;
  &:before {
    content: '';
    position: absolute;
    top: 0; 
    bottom: 0; 
    left: 0;
    width: .6rem;
    border-radius: .2rem 0 0 .2rem;
    background-color: ${props => props.value};
    box-shadow: inset 2rem 0 rgba(0, 0, 0, .2);
    transition: transform .2s ease-in-out;
    z-index: -1;
  }
  &:hover {
    &:before {
      transform: translateX(-90%);
    }
  }
`;

const LabelIcon = styled.div`
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 1rem;
  transform: translate(-50%, -50%);
`;

class LabelAdd extends Component {
  addLabel = (label) => {
    this.props.actions.addLabelToCard({
      cardId: this.props.cardId,
      cardLabel: label
    })
  };

  render() {
    const { cardLabels, labels } = this.props;
    if (!labels) return null;
    return (
      <LabelList>
        {labels.map((label, index) => (
          <LabelItem
            key={index}
            value={label.color}
            onClick={() => this.addLabel(label)}
          >
            {cardLabels && cardLabels.some(cardLabel => cardLabel._labelId === label._labelId) && (
              <LabelIcon>
                <FontAwesomeIcon icon="check" />
              </LabelIcon>
            )}
          </LabelItem>
        ))}
      </LabelList>
    )
  };
}

LabelAdd.propTypes = {
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      _labelId: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired
    })
  ),
  cardLabels: PropTypes.arrayOf(
    PropTypes.shape({
      _labelId: PropTypes.number.isRequired,
      color: PropTypes.string
    })
  ),
};

function mapStateToProps(state) {
  return {
    labels: state.rootReducer.labels,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      addLabelToCard: addLabelToCard,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LabelAdd);
