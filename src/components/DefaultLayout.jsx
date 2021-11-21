import React from "react";
import LoadingContext from "./LoadingContext";
import SplashScreen from "./SplashScreen";

class DefaultLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      setLoading: this.setLoading,
    };
    this.setLoading = this.setLoading.bind(this);
  }
  setLoading(isLoading) {
    this.setState({ isLoading: isLoading });
  }

  render() {
    return (
      <div className="cr-default-layout">
        <LoadingContext.Provider value={this.state}>
          {this.state.isLoading ? <SplashScreen /> : this.props.children}
        </LoadingContext.Provider>
      </div>
    );
  }
}

export default DefaultLayout;
