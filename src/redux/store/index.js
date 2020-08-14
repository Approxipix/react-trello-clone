import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'

import rootReducer from '../rootReducer/reducer/reducer';
import boardReducer from '../boardReducer/reducer/reducer';
import listReducer from '../listReducer/reducer/reducer';
import cardReducer from '../cardReducer/reducer/reducer';
import checkListReducer from '../checkListReducer/reducer/reducer';

export const history = createBrowserHistory({ basename: process.env.PUBLIC_URL + "/" });

const middleware = routerMiddleware(history);

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
