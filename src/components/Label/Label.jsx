import React, { Component } from 'react';
import styled from 'styled-components';

const LabelList = styled.ul`
  display: flex;
`;

const LabelItem = styled.li`
  width: 2rem;
  height: 2rem;
  margin-right: .5rem;
  background-color: ${props => props.value};
  border-radius: .2rem;
`;

class Label extends Component {
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

export default Label;
