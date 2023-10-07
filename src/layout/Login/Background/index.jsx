import React from "react";
import logo from "../../../assets/logo/logo.svg";
import "../../../assets/style/login/background/background.scss";
function Background()
{
    return (
          <div className="login">
            <div className="login-logo text-center">
              <img src={logo} className="login-logo-logo" alt="" />
            </div>
          </div>
      );
}
export default Background;