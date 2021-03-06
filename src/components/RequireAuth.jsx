import React from "react";
import AuthContext from "./context/AuthContext";

class RequireAuth extends React.Component {
  constructor(props) {
    super(props);

    this.setUser = this.setUser.bind(this);
    this.state = {
      user: localStorage.getItem("authorization") ?? props.user ?? null,
      setUser: this.setUser,
    };
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

export default RequireAuth;
