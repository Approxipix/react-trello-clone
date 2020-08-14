import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components";
import { requestBoards, responseBoardsSuccess } from "./redux/rootReducer/actions/actions";
import normalizeBoards from './helpers/normalizeBoards'
import Routes from './routes/Routes';
import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";
import boards from './data';

const MainWrapper = styled.div` 
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto 1fr;
  grid-template-areas: 'header' 'main';
  min-height: 100vh;
  overflow: hidden;
`;

const HeaderWrapper = styled.header`
  grid-area: header;
`;

const ContentWrapper = styled.main`
  grid-area: main;
`;

class App extends Component {
  componentDidMount() {
    //simulate request to db
    new Promise((resolve) => {
      this.props.actions.requestBoards();
      const normalizeBoardsData = normalizeBoards(boards);
      setTimeout(() => {
        resolve(normalizeBoardsData);
      }, 1000)
    }).then(response => {
      this.props.actions.responseBoardsSuccess(response)
    }).catch(error => console.log(error));
  }

  render() {
    const { isLoading } = this.props;

    return (
      <MainWrapper>
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        {isLoading ? (
          <Loader />
        ) : (
          <ContentWrapper>
            <Routes />
          </ContentWrapper>
        )}
      </MainWrapper>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.rootReducer.isLoading,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      requestBoards,
      responseBoardsSuccess,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
