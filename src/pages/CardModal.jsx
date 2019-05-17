import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardActionsMenu from "../components/Card/CardActionsMenu";
import CheckList from "../components/CheckList/CheckList";
import CardTitle from "../components/Card/CardTitle";
import CardDescription from "../components/Card/CardDescription";
import CardLabel from "../components/Card/CardLabel";

import { history } from "../redux/store";


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

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.3rem;
  z-index: 110;
  cursor: pointer;
`;

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;
  padding-left: 1.8rem;
`;

const Title = styled.h4`
  margin-bottom: .5rem;
  padding: .3rem .5rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

const Icon = styled.div`
  position: absolute;
  left: 0;
  top: .6rem;
  font-size: 1rem;
`;


const Row = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 1rem;
`;

const Col = styled.div`

`;


const Close = styled.button`
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


class CardModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTitleEditing: false,
      isDescEditing: false,
    }
  }

  toggleIsTitleEditing = () => {
    this.setState({
      isTitleEditing: !this.state.isTitleEditing
    })
  };

  toggleIsDescEditing = () => {
    this.setState({
      isDescEditing: !this.state.isDescEditing
    })
  };



  render() {
    const { card, cardIndex, listIndex } = this.props;
    const { isTitleEditing, isDescEditing } = this.state;
    const boardUrl = `/b/${this.props.match.params}`;
    return (
      <Backdrop>
        <Close onClick={() => history.push(boardUrl)} />
        <Container onClick={(e) => e.preventDefault()}>
          <CloseButton onClick={() => history.push(boardUrl)}>
            <FontAwesomeIcon icon="times" />
          </CloseButton>
          <Wrapper>
            <CardTitle cardId={card._cardId} cardTitle={card.title}/>
            <Icon>
              <FontAwesomeIcon icon="window-maximize" />
            </Icon>
          </Wrapper>
          <Row>
            <Col>
              <Wrapper>
                <Title>
                  Description
                </Title>
                <CardDescription  cardId={card._cardId} cardDescription={card.description}/>
                <Icon>
                  <FontAwesomeIcon icon="align-left" />
                </Icon>
              </Wrapper>
              {card.cardLabels.length !== 0 && (
                <Wrapper>
                  <Title>
                    Label
                  </Title>
                  <CardLabel  cardId={card._cardId} cardLabels={card.cardLabels}/>
                  <Icon>
                    <FontAwesomeIcon icon="tag" />
                  </Icon>
                </Wrapper>
              )}
              {/*{this.props.checkLists.length !== 0 && (*/}
              {/*  <Wrapper>*/}
              {/*    <Icon>*/}
              {/*      <FontAwesomeIcon icon="tag" />*/}
              {/*    </Icon>*/}
              {/*    {this.props.checkLists.map((item, index) => (*/}
              {/*      <CheckList key={index} checkBoxIndex={index} cardIndex={cardIndex} listIndex={listIndex}/>*/}
              {/*    ))}*/}
              {/*  </Wrapper>*/}
              {/*)}*/}
            </Col>
            <Col>
              <CardActionsMenu card={card} />
            </Col>
          </Row>
        </Container>
      </Backdrop>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    card: state.cardReducer.cards[ownProps.match.params.cardId],
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({

    }, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CardModal);
