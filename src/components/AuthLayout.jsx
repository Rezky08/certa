import React from "react";

import Icon from "../components/Icon";
import { ReactComponent as HomeIcon } from "../assets/icon/Home.svg";
import { ReactComponent as SearchIcon } from "../assets/icon/Search.svg";
import { ReactComponent as NotificationIcon } from "../assets/icon/Notification.svg";
import { ReactComponent as ProfileIcon } from "../assets/icon/Profile.svg";
import { Link } from "react-router-dom";

class AuthLayout extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div className="cr-layout">
        <div className="cr-layout-header">{this.props.header}</div>
        <div className="cr-layout-body">{this.props.children}</div>
        <div className="cr-layout-footer">
          <div className="cr-bottom-navigation">
            <div className="cr-bottom-navigation--item">
              <Link to="/">
                <Icon icon={<HomeIcon />} size="2rem" />
              </Link>
            </div>
            <div className="cr-bottom-navigation--item">
              <Link to="/search">
                <Icon icon={<SearchIcon />} size="2rem" />
              </Link>
            </div>
            <div className="cr-bottom-navigation--item">
              <div className="cr-bottom-navigation--item-create">
                <span>+</span>
                {/* <Icon icon={<HomeIcon />} size="2rem" /> */}
              </div>
            </div>
            <div className="cr-bottom-navigation--item">
              <Link to="/notification">
                <Icon icon={<NotificationIcon />} size="2rem" />
              </Link>
            </div>
            <div className="cr-bottom-navigation--item">
              <Link to="/profile">
                <Icon icon={<ProfileIcon />} size="2rem" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthLayout;
