import React, { Component } from "react";
import styled from 'styled-components'

const Wrapper = styled.div``;

class ClickOutside extends Component {
  componentDidMount() {
    const { action } = this.props;
    document.addEventListener(!!action ? action : 'click', this.outerClick);
  }

  componentWillUnmount() {
    const { action } = this.props;
    document.removeEventListener(!!action ? action : 'click', this.outerClick);
  }

  outerClick = (e) => {
    let { target } = e;
    if (!!target.closest && (target.closest('.click-outside-wrapper'))) {
      return null;
    }
    this.props.toggleOpened();
  };

  render() {
    return (
      <Wrapper className="click-outside-wrapper">
        {this.props.children}
      </Wrapper>
    )
  };
}

export default ClickOutside;
