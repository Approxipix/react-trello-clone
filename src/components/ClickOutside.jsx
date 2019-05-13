import React, { Component } from "react";

class ClickOutside extends Component {
  componentDidMount() {
    document.addEventListener('click', this.outerClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.outerClick);
  }

  outerClick = (e) => {
    let { target } = e;
    if (!!target.closest && (target.closest('.click-outside-wrapper'))) {
      return;
    }
    this.props.toggleOpened();
  };

  render() {
    return (
      <div className="click-outside-wrapper">
        {this.props.children}
      </div>
    )
  };
}

export default ClickOutside;
