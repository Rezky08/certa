import React from "react";
import { TextField, Link } from "@mui/material";

class LoginBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.email ?? undefined,
      password: props.password ?? undefined,
    };
  }

  render() {
    return (
      <div className="cr-login-body">
        <div className="cr-login--title cr-text--title">
          <span>Login</span>
        </div>
        <div className="cr-login--form">
          <TextField
            placeholder="Email"
            variant="filled"
            onChange={(e) =>
              this.setState({ email: e.target.value }, () =>
                this.props.onChange(this.state)
              )
            }
          />
          <TextField
            placeholder="Password"
            type="password"
            variant="filled"
            onChange={(e) =>
              this.setState({ password: e.target.value }, () =>
                this.props.onChange(this.state)
              )
            }
          />
          <Link href="/forgot-password" className="cr-text--small">
            Forgot your password?
          </Link>
        </div>
      </div>
    );
  }
}

LoginBody.defaultProps = {
  onChange: () => {},
};
export default LoginBody;
