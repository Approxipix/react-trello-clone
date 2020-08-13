import React from 'react';
import PropTypes from 'prop-types';
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

const Label = (props) => {
  const { cardLabels } = props;
  if (!cardLabels) return null;

  return (
    <LabelList className="label-list">
      {cardLabels.map((label, index) => (
        <LabelItem key={index} value={label.color} />
      ))}
    </LabelList>
  )
};

Label.defaultProps = {
  cardLabels: null
};

Label.propTypes = {
  cardLabels: PropTypes.arrayOf(
    PropTypes.shape({
      _labelId: PropTypes.number,
      color: PropTypes.string.isRequired
    })
  ),
};

export default Label;
