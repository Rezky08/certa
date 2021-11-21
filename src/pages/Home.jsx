import React from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Icon from "../components/Icon";
import { ReactComponent as HomeIcon } from "../assets/icon/Home.svg";

function HomeMenuItem(props) {
  return (
    <div className="cr-home-menu-item">
      <Link to={props?.to ?? "/"}>
        <div className="cr-home-menu-item--button">
          <Icon icon={props.icon ?? <HomeIcon />} size="2rem" />
        </div>
      </Link>
    </div>
  );
}

class Home extends React.Component {
  render() {
    return (
      <AuthLayout>
        <div className="cr-home">
          <div className="cr-home-menu">
            <HomeMenuItem />
            <HomeMenuItem />
            <HomeMenuItem />
          </div>
          <div className="cr-home-break">
            <div className="cr-home-break-line"></div>
            <span className="cr-home-break-text">TOP</span>
            <div className="cr-home-break-line"></div>
          </div>
          <div className="cr-home-popular"></div>
        </div>
      </AuthLayout>
    );
  }
}

export default Home;
