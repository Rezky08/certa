import React from "react";
import Api from "../api/api";

class AuthLayout extends React.Component {
  componentDidMount() {
    Api();
  }
  render() {
    return <div className="cr-layout"></div>;
  }
}

export default AuthLayout;
