import React from "react";

import Icon from "../components/Icon";
import { ReactComponent as HomeIcon } from "../assets/icon/Home.svg";
import { ReactComponent as SearchIcon } from "../assets/icon/Search.svg";
import { ReactComponent as NotificationIcon } from "../assets/icon/Notification.svg";
import { ReactComponent as ProfileIcon } from "../assets/icon/Profile.svg";
import { Link, Outlet } from "react-router-dom";
import AuthLayoutContext from "./context/AuthLayoutContext";
import { withRouter } from "./route/WithRouter";

class AuthLayout extends React.Component {
  constructor(props) {
    super(props);
    this.setHeader = this.setHeader.bind(this);
    this.setChildren = this.setChildren.bind(this);
    this.state = {
      header: props.header ?? null,
      setHeader: this.setHeader,
      children: props.children ?? null,
      setChildren: this.setChildren,
    };
  }

  componentDidUpdate() {
    console.log(this.props);
  }

  setHeader(component) {
    this.setState({ header: component });
  }
  setChildren(component) {
    this.setState({ children: component });
  }
  render() {
    return (
      <AuthLayoutContext.Provider value={this.state}>
        <div
          className={[
            "cr-layout",
            this.props.header !== false ? "header" : null,
          ].join(" ")}
        >
          {/* {this.props.header !== false ? (
            <div className="cr-layout-header">{this.props.header}</div>
          ) : null}
          <div className="cr-layout-body">
            <Outlet />
          </div> */}
          <Outlet />
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
      </AuthLayoutContext.Provider>
    );
  }
}

export default withRouter(AuthLayout);
