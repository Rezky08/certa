import React from "react";
import { ReactComponent as CertaVerticalIcon } from "../assets/icon/certaVerticalIcon.svg";
import Icon from "./Icon";

class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }
  render() {
    return (
      <div className="cr-splash-screen">
        <div className="cr-splash-screen--container">
          <div className={this.state.isLoading ? "cr-loading" : null}>
            <Icon icon={<CertaVerticalIcon />} size="18rem" />
          </div>
        </div>
      </div>
    );
  }
}

export default SplashScreen;
