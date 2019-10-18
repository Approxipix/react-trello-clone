import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Boards from '../pages/Boards'
import Board from '../pages/Board'
import CardModal from '../pages/CardModal';
import NotFound from '../pages/NotFound';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Boards}/>
      <Route path="/b">
        <Route path="/b/:boardId" component={Board} />
        <Route exact path="/b/:boardId/c/:cardId" component={CardModal}/>
      </Route>
      <Route exact component={NotFound} />
    </Switch>
  )
};

export default Routes;
