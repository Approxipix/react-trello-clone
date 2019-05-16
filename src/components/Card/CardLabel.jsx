import React, { Component } from 'react';
import styled from 'styled-components';

const LabelList = styled.ul`
  display: flex;
`;

const LabelItem = styled.li`
  height: 2rem;
  width: 2rem;
  margin-right: .5rem;
  background-color: ${props => props.value};
  cursor: pointer;
  border-radius: .2rem;
`;


class CardLabel extends Component {
  render() {
    const { cardLabels } = this.props;
    return (
      <LabelList>
        {cardLabels.map((label, index) => (
          <LabelItem key={index} value={label.color}/>
        ))}
      </LabelList>
    )
  }
}



export default CardLabel;
