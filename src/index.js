import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { createGlobalStyle } from 'styled-components';
import Routes from './routes/Routes'
import './helpers/fontawesome';

import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux';
import { store, history } from './redux/store/index';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: sans-serif;
    font-size: 14px;
    color: #40424b;
    * {
      box-sizing: border-box;
    }
  }
  h1,h2,h3,h4,h5,h6,p {
    margin: 0;
  }
  button {
    border: none;
    outline: none;
    background-color: transparent;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  a {
  text-decoration: none;
`;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <GlobalStyle />
          <Routes />
        </ConnectedRouter>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
