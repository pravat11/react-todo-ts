import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { login } from '../actions/login';
import LoginPayload from '../domain/action/LoginPayload';

interface State {
  username: string;
  password: string;
}

interface DispatchProps {
  login: (payload: LoginPayload) => void;
}

class Login extends React.Component<DispatchProps, State> {
  constructor(props: DispatchProps) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }
  render() {
    return (
      <div className="login-form-container">
        <h1>Sign in</h1>
        <div className="login-form-wrapper">
          <form
            onSubmit={e => {
              e.preventDefault();
              this.props.login({ ...this.state });
            }}
          >
            <input
              type="text"
              className="login-form"
              value={this.state.username}
              onChange={e => this.setState({ username: e.target.value })}
            />
            <input
              type="password"
              className="login-form"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
            <Button type="submit" bsStyle="primary" className="sign-in-button">
              Sign in
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  login
};

export default connect<{}, DispatchProps, {}>(
  null,
  mapDispatchToProps
)(Login);
