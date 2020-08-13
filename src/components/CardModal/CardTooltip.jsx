import React, { Component } from 'react';
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClickOutside from "../ClickOutside/ClickOutside";
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 2.5rem;
  left: 0;
  width: 17rem;
  background-color: #F4F5F7;
  border-radius: .2rem;
  box-shadow: rgba(0, 0, 0, 0.3) .125rem .125rem .5rem;
  z-index: 10;
  @media (max-width: 910px) {
    right: 0;
    left: auto;
  }
`;

const Header = styled.div`
  position: relative;
  padding: .5rem;
  border-bottom: 1px solid rgba(9,30,66,.13);
`;

const Title = styled.h4`
  font-size: 1rem;
  color: #6b778c;
  text-align: center;
`;

const Button = styled.button`
  position: absolute;
  top: .5rem;
  right: .5rem;
  font-size: 1rem;
  color: #6b778c;
  transition: color .1s ease-in;
  &:hover {
    color: #42526e;
  }
`;
Button.displayName = 'Button';

const Body = styled.div`
   padding: .5rem;
`;

class CardTooltip extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.outerClick);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.outerClick);
  }

  outerClick = (e) => {
    const { isOpened } = this.props;
    if (!isOpened) return null;
    if (e.keyCode === 27) {
      this.props.toggleTooltip(null);
    }
    return null;
  };

  render() {
    const { title, body, isOpened } = this.props;
    if (!isOpened) return null;

    return (
      <ClickOutside toggleOpened={this.props.toggleTooltip}>
        <Wrapper>
          <Header>
            <Title>
              {title}
            </Title>
            <Button onClick={() => this.props.toggleTooltip()}>
              <FontAwesomeIcon icon="times" />
            </Button>
          </Header>
          <Body>
            {body}
          </Body>
        </Wrapper>
      </ClickOutside>
    )
  }
}

CardTooltip.defaultProps = {
  title: '',
  isOpened: false,
  toggleTooltip: () => {},
};

CardTooltip.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  toggleTooltip: PropTypes.func.isRequired,
  body: PropTypes.element.isRequired,
};

export default CardTooltip;
