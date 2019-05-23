import React, { Component } from 'react';
import CardChecklistAdd from '../Checklist/CheckListAdd';
import LabelAdd from '../Label/LabelAdd';
import CardTooltip from './CardTooltip';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  padding: .5rem 0;
`;

const Title = styled.h3`
  margin-bottom: .5rem;
  font-size: .75rem;
  color: #6b778c;
  font-weight: 500;
  text-transform: uppercase;
`;

const ActionList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const ActionItem = styled.li`
  position: relative;
  &:not(:last-child) {
    margin-bottom: .5rem;
  }
`;

const Link = styled.a`
  display: flex;
  align-items: center;
  width: 100%;
  padding: .5rem .75rem;
  font-size: .875rem;
  font-weight: 600;
  border-radius: .2rem;
  text-align: left;
  background-color: #ebecf0;
  box-shadow: 0 1px 0 0 rgba(9, 30, 66, .13);
  transition: all .2s ease-in;
  cursor: pointer;
  &:hover {
    background-color: #dfe1e6;
    box-shadow: 0 1px 0 0 rgba(9, 30, 66, .25);
  }
`;

const Icon = styled.div`
  margin-right: .5rem;
`;


class CardActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: null
    }
  }

  toggleIsOpened = (key) => {
    this.setState({
      isOpened: key !== this.state.isOpened ? key : null
    })
  };

  render() {
    const { isOpened } = this.state;
    const { card } = this.props;
    const actionItems = [
      {
        title: 'Label',
        icon: 'tag',
        component: (
          <LabelAdd
            cardId={card._cardId}
            cardLabels={card.cardLabels}
          />
        )
      },
      {
        title: 'CheckList',
        icon: 'check-square',
        component: (
          <CardChecklistAdd
            cardId={card._cardId}
            toggleTooltip={() => this.toggleIsOpened('CheckList')}
          />
        )
      },
    ];
    return (
      <Wrapper>
        <Title>
          Add to cards
        </Title>
        <ActionList>
          {actionItems.map((action, index) => (
            <ActionItem key={index}>
              <Link onClick={() => this.toggleIsOpened(action.title)}>
                <Icon>
                  <FontAwesomeIcon icon={action.icon} />
                </Icon>
                {action.title}
              </Link>
              <CardTooltip
                title={action.title}
                isOpened={isOpened === action.title}
                toggleTooltip={() => this.toggleIsOpened(action.title)}
                body={action.component}
              />
            </ActionItem>
          ))}
        </ActionList>
      </Wrapper>
    )
  }
}

export default CardActions;
