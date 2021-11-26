import React from "react";

class AuthLayoutHeader extends React.Component {
  render() {
    return <div className="cr-layout-header">{this.props.children}</div>;
  }
}

export default AuthLayoutHeader;
