import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestBoards, responseBoardsSuccess } from "./redux/rootReducer/actions/actions";
import Routes from './routes/Routes';
import normalizeBoards from './helpers/normalizeBoards'
import boards from './data';

class App extends Component {
  componentDidMount() {
    //simulate request to db
    new Promise((resolve, reject) => {
      this.props.actions.requestBoards();
      const normalizeBoardsData = normalizeBoards(boards);
      setTimeout(() => {
        resolve(normalizeBoardsData);
      }, 2000)
    }).then(response => {
      this.props.actions.responseBoardsSuccess(response)
    });
  }

  render() {
    return (
      <Routes />
    )
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

export default connect(undefined, mapDispatchToProps)(App);
