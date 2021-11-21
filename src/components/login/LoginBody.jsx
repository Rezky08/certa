import React from "react";
import { TextField, Link } from "@mui/material";

class LoginBody extends React.Component {
  render() {
    return (
      <div className="cr-login-body">
        <div className="cr-login--title cr-text--title">
          <span>Login</span>
        </div>
        <div className="cr-login--form">
          <TextField placeholder="Email" variant="filled" />
          <TextField placeholder="Password" type="password" variant="filled" />
          <Link href="/forgot-password" className="cr-text--small">
            Forgot your password?
          </Link>
        </div>
      </div>
    );
  }
}

export default LoginBody;
