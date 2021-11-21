import React from "react";
import LoadingContext from "./LoadingContext";
import SplashScreen from "./SplashScreen";
import { setToken } from "../api/setToken";
import RequireAuth from "./RequireAuth";

class DefaultLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      setLoading: this.setLoading,
    };
    this.setLoading = this.setLoading.bind(this);
    setToken();
  }
  componentDidMount() {
    setTimeout(() => this.setLoading(false), 1500);
  }
  setLoading(isLoading) {
    this.setState({ isLoading: isLoading });
  }

  render() {
    return (
      <div className="cr-default-layout">
        <RequireAuth>
          <LoadingContext.Provider value={this.state}>
            {this.state.isLoading ? <SplashScreen /> : this.props.children}
          </LoadingContext.Provider>
        </RequireAuth>
      </div>
    );
  }
}

export default DefaultLayout;
