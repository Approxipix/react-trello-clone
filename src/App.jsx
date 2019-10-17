import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addEntities } from "./redux/rootReducer/actions/actions";
import Routes from './routes/Routes';
import normalizeBoards from './helpers/normalizeBoards'
import boards from './data';

class App extends Component {
  componentDidMount() {
    //simulate request to db
    setTimeout(() => {
      const normalizeBoardsData = normalizeBoards(boards);
      this.props.actions.addEntities(normalizeBoardsData)
    }, 2000)
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
      addEntities,
    }, dispatch)
  };
}

export default connect(undefined, mapDispatchToProps)(App);
