import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { compose, createStore, applyMiddleware } from 'redux';

import appReducer from '../reducers';

const enhancers = [applyMiddleware(thunk, promiseMiddleware())];

if (window['__REDUX_DEVTOOLS_EXTENSION__']) {
  enhancers.push(window['__REDUX_DEVTOOLS_EXTENSION__']());
}

const store = createStore(appReducer, compose(...enhancers));

export default store;
