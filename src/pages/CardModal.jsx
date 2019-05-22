import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardActionsMenu from "../components/CardModal/CardActions";
import CheckList from "../components/CheckList/CheckList";
import CardTitle from "../components/CardModal/CardTitle/CardTitle";
import CardDescription from "../components/CardModal/CardDescription/CardDescription";
import CardLabel from "../components/CardModal/CardLabel";
import { history } from "../redux/store";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const CloseBackdrop = styled.button`
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

const Wrapper = styled.div`
  position: absolute;
  top: 5rem;
  left: 50%;
  max-width: 45rem;
  width: 100%;
  max-height: calc(100% - 8rem);
  padding: 1rem;
  border-radius: .2rem;
  background-color: #f4f5f7;
  transform: translateX(-50%);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: #6b778c;
  font-size: 1.3rem;
  transition: color .1s ease-in;
  z-index: 110;
  &:hover {
    color: #42526e;
  }
`;

const Container = styled.div`
  position: relative;
`;

const Header = styled.div`
  position: relative;
  margin-bottom: .5rem;
  padding-left: calc(2rem - .5rem);
`;

const Body = styled.div`
  padding-left: 2rem;
`;

const Title = styled.h3`
  padding: .3rem .5rem;
  font-size: 1.2rem;
  font-weight: 600;
`;

const Icon = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  font-size: 1rem;
  transform: translateY(-50%);
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 1rem;
`;

const Col = styled.div`

`;

class TitleContainer extends Component {
  render() {
    const { card } = this.props;
    return (
      <Container>
        <Header>
          <Icon>
            <FontAwesomeIcon icon="window-maximize" />
          </Icon>
          <CardTitle
            cardId={card._cardId}
            cardTitle={card.title}
          />
        </Header>
      </Container>
    )
  }
}

class DescriptionContainer extends Component {
  render() {
    const { card } = this.props;
    return (
      <Container>
        <Header>
          <Icon>
            <FontAwesomeIcon icon="align-left" />
          </Icon>
          <Title>
            Description
          </Title>
        </Header>
        <Body>
          <CardDescription
            cardId={card._cardId}
            cardDescription={card.description}
          />
        </Body>
      </Container>
    )
  }
}

class CardModal extends Component {
  render() {
    const { card } = this.props;
    const boardUrl = `/b/${this.props.match.params}`;
    return (
      <Backdrop>
        <CloseBackdrop onClick={() => history.push(boardUrl)} />
        <Wrapper onClick={(e) => e.preventDefault()}>
          <CloseButton onClick={() => history.push(boardUrl)}>
            <FontAwesomeIcon icon="times" />
          </CloseButton>
          <TitleContainer card={card}/>
          <Row>
            <Col>
              <DescriptionContainer card={card}/>
              {/*{card.cardLabels.length !== 0 && (*/}
              {/*  <Container>*/}
              {/*    <Title>*/}
              {/*      Label*/}
              {/*    </Title>*/}
              {/*    <CardLabel  cardId={card._cardId} cardLabels={card.cardLabels}/>*/}
              {/*    <Icon>*/}
              {/*      <FontAwesomeIcon icon="tag" />*/}
              {/*    </Icon>*/}
              {/*  </Container>*/}
              {/*)}*/}
              {/*{card.checkLists.length !== 0 && (*/}
              {/*  <Container>*/}
              {/*    <Icon>*/}
              {/*      <FontAwesomeIcon icon="tag" />*/}
              {/*    </Icon>*/}
              {/*    {card.checkLists.map((chekList, index) => (*/}
              {/*      <CheckList key={index} cardId={card._cardId} chekListId={chekList}/>*/}
              {/*    ))}*/}
              {/*  </Container>*/}
              {/*)}*/}
            </Col>
            <Col>
              <CardActionsMenu card={card} />
            </Col>
          </Row>
        </Wrapper>
      </Backdrop>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    card: state.cardReducer[ownProps.match.params.cardId],
  }
}

export default connect(mapStateToProps)(CardModal);
