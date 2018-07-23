import { combineReducers } from 'redux';

import ui from './ui';
import todos from './todos';
import AppState from '../../domain/state/App';
import visibilityFilter from './visibilityFilter';

const appReducer = combineReducers<AppState>({
  ui,
  todos,
  visibilityFilter
});

export default appReducer;
