import React from "react";
import { ReactComponent as CertaVerticalIcon } from "../assets/icon/certaVerticalIcon.svg";
import Icon from "./Icon";
import LoadingContext from "./LoadingContext";

class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: props.isLoading ?? false,
    };
  }
  render() {
    return (
      <LoadingContext.Consumer>
        {({ isLoading }) => {
          return (
            <div className="cr-splash-screen">
              <div className="cr-splash-screen--container">
                <div className={isLoading ? "cr-loading" : null}>
                  <Icon icon={<CertaVerticalIcon />} size="18rem" />
                </div>
              </div>
            </div>
          );
        }}
      </LoadingContext.Consumer>
    );
  }
}

export default SplashScreen;
