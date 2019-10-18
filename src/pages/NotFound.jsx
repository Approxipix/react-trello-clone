import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #2E7EAF;
`;
const Svg = styled.svg`
  width: 50rem;
  path { 
    transition: stroke-dashoffset 2s ease-in-out;
  }      
`;

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.svg = React.createRef();
  }

  componentDidMount() {
    this.lineDraw();
  }

  lineDraw(){
    const path = this.svg.current.firstChild;
    const length = path.getTotalLength();
    path.style.transition = path.style.WebkitTransition = 'none';
    path.style.strokeDasharray = length + ' ' + length;
    path.style.strokeDashoffset = length;
    path.getBoundingClientRect();
    path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 5s ease-in-out';
    path.style.strokeDashoffset = '0';
  }

  render() {
    return (
      <Wrapper>
        <Svg viewBox="0 0 600 300" ref={this.svg}>
          <path
            stroke="#fff"
            strokeWidth="2"
            fill="none"
            strokeDashoffset="0"
            d="M123.689,254.399V188.54H11.95v-21.089L119.249,13.903h35.149
              v149.478h33.67v25.159h-33.67v65.859H123.689z M123.689,163.381V83.092c0-12.58,0.37-25.16,1.11-37.74h-1.11
              c-7.4,14.06-13.32,24.42-19.98,35.52L44.88,162.641v0.74H123.689z
              M289.443,258.47c-46.989,0-79.179-44.029-79.918-123.578
              c0-81.029,35.149-125.059,83.988-125.059c50.319,0,79.549,45.14,79.549,121.729c0,81.769-30.709,126.908-83.249,126.908H289.443z
              M291.293,233.31c32.93,0,48.839-38.85,48.839-100.268c0-59.199-14.8-98.049-48.839-98.049c-29.6,0-48.84,37.74-48.84,98.049
              c-0.739,62.529,18.5,100.268,48.47,100.268H291.293z
              M503.297,254.399V188.54H391.559v-21.089L498.858,13.903h35.149
              v149.478h33.67v25.159h-33.67v65.859H503.297z M503.297,163.381V83.092c0-12.58,0.37-25.16,1.11-37.74h-1.11
              c-7.399,14.06-13.319,24.42-19.979,35.52l-58.829,81.769v0.74H503.297z"
          />
        </Svg>
      </Wrapper>
    )
  }
}

export default NotFound;
