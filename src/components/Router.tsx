import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './Login';
import * as routes from '../constants/routes';
import TodoContainer from './todo/TodoContainer';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={routes.LOGIN} component={Login} />
      <Route exact path={routes.HOME} component={TodoContainer} />
    </Switch>
  </BrowserRouter>
);

export default Router;
