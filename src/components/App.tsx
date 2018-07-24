import * as React from 'react';

import { connect } from 'react-redux';

import Login from './Login';
import AppState from '../domain/state';
import TodoContainer from './todo/TodoContainer';
import SessionState from '../domain/state/session';

interface Props {
  session: SessionState;
}

const App = (props: Props) => (props.session && props.session.token ? <TodoContainer /> : <Login />);

const mapStateToProps = (state: AppState) => ({
  session: state.app.session
});

export default connect(mapStateToProps)(App);
