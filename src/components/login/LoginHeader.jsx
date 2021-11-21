import React from "react";
import Icon from "../Icon";
import { ReactComponent as CertaVerticalIcon } from "../../assets/icon/certaVerticalIcon.svg";

class LoginHeader extends React.Component {
  render() {
    return (
      <div className="cr-login-header">
        <div className="cr-login-header--icon">
          <Icon icon={<CertaVerticalIcon />} size="13rem" />
        </div>
      </div>
    );
  }
}

export default LoginHeader;
