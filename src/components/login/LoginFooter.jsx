import React from "react";
import { Button, Link } from "@mui/material";

class LoginFooter extends React.Component {
  render() {
    return (
      <div className="cr-login-footer">
        <Button
          variant="outlined"
          fullWidth
          className="cr-button cr-text--bold cr-text--large"
          onClick={this.props.onSubmit}
        >
          Login
        </Button>
        <Link href="/sign-up" className="cr-text--small">
          Don’t have an account? <strong>Sign Up</strong>
        </Link>
      </div>
    );
  }
}

LoginFooter.defaultProps = {
  onSubmit: () => {},
};

export default LoginFooter;
