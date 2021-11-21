import React from "react";
import LoginBody from "../components/login/LoginBody";
import LoginFooter from "../components/login/LoginFooter";
import LoginHeader from "../components/login/LoginHeader";
import { login } from "../api/auth";

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
  onSubmit() {
    login(this.state).then((data) => {
      console.log(data);
    });
  }

  render() {
    return (
      <div className="cr-login">
        <LoginHeader />
        <LoginBody onChange={this.onChange} />
        <LoginFooter onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default Login;
