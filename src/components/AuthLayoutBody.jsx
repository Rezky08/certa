import React from "react";
import { Outlet } from "react-router-dom";

class AuthLayoutBody extends React.Component {
  render() {
    return (
      <div className="cr-layout-container">
        {this.props.header ? (
          <div className="cr-layout-header">{this.props.header ?? null}</div>
        ) : null}
        <div
          className={[
            "cr-layout-body",
            this.props.padding === false ? "padding-less" : null,
          ].join(" ")}
        >
          {this.props.children ?? <Outlet />}
        </div>
      </div>
    );
  }
}

export default AuthLayoutBody;
