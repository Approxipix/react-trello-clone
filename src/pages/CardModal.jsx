import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { history } from "../redux/store";
import { Redirect } from "react-router";
import CardActions from "../components/CardModal/CardActions";
import CheckList from "../components/Checklist/CheckList";
import CardTitle from "../components/CardModal/CardTitle/CardTitle";
import CardDescription from "../components/CardModal/CardDescription/CardDescription";
import Label from "../components/Label/Label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';

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
  @media (max-width: 770px) {
    left: 1rem;
    right: 1rem;
    width: auto;
    transform: translateX(0);
  }
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
  &:not(:last-child) {
    margin-bottom: 1rem;
  }  
`;

const Header = styled.div`
  position: relative;
  margin-bottom: .3rem;
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
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Col = styled.div`
`;

const TitleContainer = (props) => {
  const { card } = props;
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
};

const DescriptionContainer = (props) => {
  const { card } = props;
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
};

const LabelContainer = (props) => {
  const { card } = props;
  if (card.cardLabels.length === 0) return null;
  return (
    <Container>
      <Header>
        <Icon>
          <FontAwesomeIcon icon="tag" />
        </Icon>
        <Title>
          Labels
        </Title>
      </Header>
      <Body>
        <Label cardLabels={card.cardLabels}/>
      </Body>
    </Container>
  )
};

const ChecklistContainer = (props) => {
  const { card } = props;
  if (card.checkLists.length === 0) return null;
  return (
    card.checkLists.map((checkListId, index) => (
      <Container key={index}>
        <CheckList
          cardId={card._cardId}
          checkListId={checkListId}
        />
      </Container>
    ))
  )
};

const CardModal = (props) => {
  const { card, listId, currentBoardId } = props;
  if (!currentBoardId) return null;
  const boardUrl = `/b/${currentBoardId}`;
  if (!card) return <Redirect to={boardUrl} />;
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
            <LabelContainer card={card}/>
            <ChecklistContainer card={card} />
          </Col>
          <Col>
            <CardActions
              card={card}
              title="Add to card"
              actions={["Label", "CheckList"]}
              listId={listId}
            />
            <CardActions
              card={card}
              title="Actions"
              actions={["Delete"]}
              listId={listId}
            />
          </Col>
        </Row>
      </Wrapper>
    </Backdrop>
  )
};

CardModal.defaultProps = {
  listId: '',
  currentBoardId: null,
  card: {},
};

CardModal.propTypes = {
  listId: PropTypes.string.isRequired,
  currentBoardId: PropTypes.string.isRequired,
  card: PropTypes.shape({
    _cardId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    checkLists: PropTypes.arrayOf(PropTypes.string).isRequired,
    cardLabels: PropTypes.array.isRequired,
  }).isRequired,
};

function mapStateToProps(state, ownProps) {
  let listId = null;
  Object.keys(state.listReducer).forEach(list => {
    state.listReducer[list].cards.forEach(card => {
      if (card === ownProps.match.params.cardId) {
        listId = list;
      }
    })
  });
  return {
    listId: listId,
    currentBoardId: state.rootReducer.currentBoardID,
    card: state.cardReducer[ownProps.match.params.cardId],
  }
}

export default connect(mapStateToProps)(CardModal);
