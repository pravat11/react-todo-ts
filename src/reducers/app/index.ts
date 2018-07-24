import { combineReducers } from 'redux';

import ui from './ui';
import todos from './todos';
import session from './session';
import AppState from '../../domain/state/App';
import visibilityFilter from './visibilityFilter';

const appReducer = combineReducers<AppState>({
  ui,
  todos,
  session,
  visibilityFilter
});

export default appReducer;
