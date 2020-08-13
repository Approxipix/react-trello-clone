import React from 'react';
import './Loader';
import styled, { css, keyframes } from "styled-components";

function createCSS() {
  let styles = '';
  for (let i = 0; i <= 12; i += 1) {
    styles += `
      &:nth-child(${i}) {
        transform: rotate(${i * 30}deg);
        animation-delay: ${-1.1 + (0.1 * i)}s;
      }
    `
  }

  return css`${styles}`;
}

const opacity = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Spinner = styled.div`
  display: inline-block;
  position: relative;
  width: 4rem;
  height: 4rem;

  div {
    transform-origin: 2rem 2rem;
    animation: ${opacity} 1.2s linear infinite;
    &:after {
      content: "";
      display: block;
      position: absolute;
      top: .4rem;
      left: 1.75rem;
      width: .25rem;
      height: .875rem;
      border-radius: 20%;
      background: #172b4d;
    }
    ${createCSS()}
  }
`;

const Loader = () => (
  <Wrapper>
    <Spinner>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
      <div/>
    </Spinner>
  </Wrapper>
);

export default Loader;
