import React, { Component } from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div``;
Wrapper.displayName = 'Wrapper';

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
    if (!!target.closest && (target.closest('.click-outside-wrapper'))) return null;
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

ClickOutside.defaultProps = {
  toggleOpened: () => {}
};

ClickOutside.propTypes = {
  toggleOpened: PropTypes.func.isRequired
};

export default ClickOutside;
