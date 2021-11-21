import React from "react";
import AuthContext from "./AuthContext";
import { getMe } from "../functions/Auth";
import { withRouter } from "react-router";

class RequireAuth extends React.Component {
  constructor(props) {
    super(props);

    this.setUser = this.setUser.bind(this);
    this.state = {
      user: JSON.parse(localStorage.getItem("user")) ?? props.user ?? null,
      setUser: this.setUser,
    };

    getMe();
  }

  setUser(user) {
    this.setState({ user });
  }
  render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default withRouter(RequireAuth);
