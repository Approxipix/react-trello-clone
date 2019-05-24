import styled, { keyframes } from "styled-components";

export const Text = styled.p`
  margin-bottom: .5rem;
  font-size: 1rem;
  color: #40424b;
`;

export const Label = styled.label`
  font-size: .75rem;
  line-height: 1.3rem;
  color: #6b778c;
  font-weight: 600;
`;

export const Input = styled.input`
  max-width: 100%;
  width: ${props => props.width ? props.width : '100%'};
  margin: ${props => props.margin ? props.margin : '0 0 .5rem 0'};
  padding: ${props => props.padding ? props.padding : '.5rem'};
  font-family: 'Roboto', sans-serif;
  font-size: ${props => props.size ? props.size : '1rem'};
  color: #40424b;
  font-weight: ${props => props.weight ? props.weight : 'normal'};
  line-height: 1rem;
  letter-spacing: .5px;
  background-color: #fff;
  border: 0;
  border-radius: .2rem;
  box-shadow: 0 1px 0 rgba(9,30,66,.25);
`;

export const TextArea = styled.textarea`
  max-width: 100%;
  width: ${props => props.width ? props.width : '100%'};
  margin: ${props => props.margin ? props.margin : '0 0 .5rem 0'};
  padding: ${props => props.padding ? props.padding : '.5rem'};
  font-family: 'Roboto', sans-serif;
  font-size: ${props => props.size ? props.size : '1rem'};
  color: #40424b;
  line-height: 1rem;
  letter-spacing: .5px;
  background-color: #fff;
  border: 0;
  border-radius: .2rem;
  box-shadow: 0 1px 0 rgba(9,30,66,.25);
  resize: none;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
`;

export const SubmitButton = styled.button`
  margin-right: .5rem;
  padding: .5rem .75rem;
  color: #fff;
  font-weight: 700;
  font-size: .875rem;
  border: 0;
  background-color: ${props => 
    props.color === 'danger' 
      ? '#cf513d' 
      : '#5aac44'
  };
  box-shadow: 0 1px 0 0 ${props =>
    props.color === 'danger'
      ? '#6e2f1a'
      : '#3f6f21'
  };
  border-radius: .2rem;
  cursor: pointer;
  transition: background-color .2s ease-in;
  &:hover {
    background-color: ${props =>
      props.color === 'danger'
        ? '#b04632'
        : '#519839'
    };
  }
`;

export const CancelButton = styled.button`
  padding: .5rem;
  font-size: 1rem;
  color: #6b778c;
  cursor: pointer;
  transition: color .1s ease-in;
  &:hover {
    color: #42526e;
  }
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
      box-shadow: ${props => props.status ? 'none' : 'inset 0 0 0 2px #dfe1e6'};
      transition: ${props => props.status ? 'all 0.2s ease' : 'none'};
      background: ${props => props.status ? 'rgba(9, 30, 66, .04)' : '#fafbfc'};
      animation: ${wave} 0.4s ease;
  
      svg {
        position: absolute;
        top: 4px;
        left: 4px;
        fill: none;
        stroke: #42526e;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 1rem;
        transition: all 0.3s ease;
        transition-delay: 0.1s;
        transform: translate3d(0, 0, 0);
       
        stroke-dashoffset: ${props => props.status ? '0' : '1rem'};
      }
    }
  }
`;

