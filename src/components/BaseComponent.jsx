import styled, { keyframes } from "styled-components";

export const Input = styled.input`
  width: 100%;
  margin-bottom: .5rem;
  padding: .6rem;
  font-size: 1rem;
  color: #40424b;
  line-height: 1rem;
  background-color: ${props => props.color};
  border: 1px solid #bdc3c7;
  border-radius: .2rem;
  box-shadow: none;
  outline: none;
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

export const CloseBackdrop = styled.button`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background: transparent;
  border: none;
  outline: none;
`;

export const TextArea = styled.textarea`
  width: 100%;
  margin-bottom: .5rem;
  padding: .6rem;
  border: 1px solid #bdc3c7;
  border-radius: 3px;
  box-shadow: none;
  font-size: .8rem;
  color: #40424b;
  line-height: 1rem;
  resize: none;
  outline: none;
`;

export const SubmitButton = styled.button`
  margin-right: .3rem;
  padding: .5rem;
  color: #40424b;
  border: 1px solid #bdc3c7;
  border-radius: .2rem;
  box-shadow: none;
  cursor: pointer;
`;

export const CancelButton = styled.button`
  margin-left: .3rem;
  padding: 0;
  font-size: inherit;
  color: #3498db;
  cursor: pointer;
`;

const wave = keyframes`
  50% {
    transform: scale(0.9);
  }
`;

export const CheckBox = styled.div`
 margin-right: .5rem;
  user-select: none;
  cursor: pointer;
  -webkit-tap-highlight-color:transparent;
  span {
    display: inline-block;
    vertical-align: middle;
    transform: translate3d(0, 0, 0);

    &:first-child {
      position: relative;
      width: 1.125rem;
      height: 1.125rem;
      border-radius: .2rem;
      transform: scale(1);
      vertical-align: middle;
      border: 1px solid ${props => props.status ? 'blue' : '#eee'};
      transition: ${props => props.status ? 'all 0.2s ease' : 'none'};
      animation: ${wave} 0.4s ease;
      background: ${props => props.status ? 'lightblue' : '#ccc'};
  
      
      svg {
        position: absolute;
        top: 3px;
        left: 2px;
        fill: none;
        stroke: #fff;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 1rem;
        transition: ${props => props.status ? 'all 0.3s ease' : 'none'};
        transition-delay: 0.1s;
        transform: translate3d(0, 0, 0);
        
        stroke-dashoffset: ${props => props.status ? '0' : '1rem'};
      }
    }

    &:last-child {
      padding-left: 8px;
    }
  }
  &:hover span:first-child {
    border-color: blue;
  }
`;

