import React, { Component } from 'react';
import styled from 'styled-components'

const Progres = styled.div`
  position: relative;
  height: 10px;
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;
const ProgresBar = styled.div`
  position: absolute;
  display: block;
  width: 0;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: lightblue;
  width: ${props => props.width}%;
  transition: width 0.2s ease-in-out;
`;

class CheckListProgress extends Component {
  render() {
    const { items } = this.props;
    const allIrems = items.length;
    const doneItems = items.filter(item => !!item.status).length;
    let width = 0;
    if (!!allIrems) {
      width = (doneItems * 100) / allIrems;
    }
    return (
      <>
        <Progres>
          <ProgresBar width={width}/>
        </Progres>
        {width.toFixed()} %
      </>
    );
  }
}


export default CheckListProgress;
