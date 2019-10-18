import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestBoards, responseBoardsSuccess } from "./redux/rootReducer/actions/actions";
import Routes from './routes/Routes';
import normalizeBoards from './helpers/normalizeBoards'
import boards from './data';
import Header from "./components/Header/Header";
import styled from "styled-components";
import Loader from "./components/Loader/Loader";

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
    new Promise((resolve, reject) => {
      this.props.actions.requestBoards();
      const normalizeBoardsData = normalizeBoards(boards);
      setTimeout(() => {
        resolve(normalizeBoardsData);
      }, 1000)
    }).then(response => {
      this.props.actions.responseBoardsSuccess(response)
    });
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
