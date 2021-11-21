import React from "react";
import LoginBody from "../components/login/LoginBody";
import LoginHeader from "../components/login/LoginHeader";
import { Button, Link } from "@mui/material";

class Login extends React.Component {
  render() {
    return (
      <div className="cr-login">
        <LoginHeader />
        <LoginBody />
        <div className="cr-login-footer">
          <Button
            variant="outlined"
            fullWidth
            className="cr-button cr-text--bold cr-text--large"
          >
            Login
          </Button>
          <Link href="/sign-up" className="cr-text--small">
            Don’t have an account? <strong>Sign Up</strong>
          </Link>
        </div>
      </div>
    );
  }
}

export default Login;
