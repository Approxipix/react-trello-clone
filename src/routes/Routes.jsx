import React, { Component } from 'react';
import styled from 'styled-components'
import { Switch, Route, Redirect } from 'react-router-dom'
import Header from '../components/Header/Header'
import Board from '../pages/Board'
import Boards from '../pages/Boards'
import CardModal from "../pages/CardModal";

const MainWrapper = styled.div` 
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto 1fr;
  grid-template-areas: 'header' 'main';
  min-height: 100vh;
`;

const HeaderWrapper = styled.div`
  grid-area: header;
`;

const ContentWrapper = styled.div`
  grid-area: main;
`;

class Routes extends Component {
  render() {
    return (
      <MainWrapper>
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
       <ContentWrapper>
         {/*<Switch>*/}
         {/*  <Route exact path="/boards" component={Boards}/>*/}
         {/*  <Route exact path="/b/:boardId" component={Board}/>*/}
         {/*  <Route exact render={ () => <Redirect to="/boards"/>} />*/}
         {/*</Switch>*/}
         <Route exact path="/boards" component={Boards}/>
         <Route path="/b/:boardId" component={Board}/>
         <Route exact path={`/b/:boardId/c/:cardId`} component={CardModal}/>
       </ContentWrapper>
      </MainWrapper>
    )
  }
}

export default Routes;
