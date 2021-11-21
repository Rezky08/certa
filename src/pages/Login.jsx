import React from "react";
import LoginBody from "../components/login/LoginBody";
import LoginFooter from "../components/login/LoginFooter";
import LoginHeader from "../components/login/LoginHeader";
import { login } from "../api/auth";
import AuthContext from "../components/AuthContext";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(state) {
    this.setState(state);
  }
  onSubmit(callback) {
    login(this.state).then((data) => {
      callback(data);
    });
  }

  render() {
    return (
      <AuthContext.Consumer>
        {({ user, setUser }) => {
          return (
            <div className="cr-login">
              <LoginHeader />
              <LoginBody onChange={this.onChange} />
              <LoginFooter onSubmit={() => this.onSubmit(setUser)} />
            </div>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}

export default Login;
