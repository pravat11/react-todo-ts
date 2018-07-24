import { LOGIN_FULFILLED } from '../../actions/login';
import SessionState from '../../domain/state/session';
import AppActions from '../../domain/action/AppActions';

const INITIAL_STATE: SessionState = null;

const session = (state: SessionState = INITIAL_STATE, action: AppActions) => {
  switch (action.type) {
    case LOGIN_FULFILLED:
      return action.payload;

    default:
      return state;
  }
};

export default session;
