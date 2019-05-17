import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'

import rootReducer from '../rootReducer/reducer';
import boardReducer from '../boardReducer/reducer';
import listReducer from '../listReducer/reducer';
import cardReducer from '../cardReducer/reducer';
import checkListReducer from '../checkListReducer/reducer';

// Create a history of your choosing (we're using a browser history in this case)
export const history = createBrowserHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
export const store = createStore(
  combineReducers({
    router: connectRouter(history),
    rootReducer,
    boardReducer,
    listReducer,
    cardReducer,
    checkListReducer,
  }),
  applyMiddleware(middleware)
);

export default store;
