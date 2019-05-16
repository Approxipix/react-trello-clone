import React, { Component } from 'react';
import styled from 'styled-components';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 100;
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 640px;
  max-width: 100%;
  max-height: calc(100% - 8rem);
  padding: 1rem;
  border-radius: .2rem;
  background-color: #fff;
  transform: translate(-50%, -50%);
`;

class CardModal extends Component {
  render() {
    return (
      <Backdrop>
        <Container>
          12123
        </Container>
      </Backdrop>
    )
  }
}


export default CardModal;
