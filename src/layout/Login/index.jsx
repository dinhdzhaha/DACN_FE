// Removed unused import
import React from "react";
import Background from "./Background";
import "../../assets/style/login/layout.scss";

function LayoutLogin({children})
{
    return(
        <div className="wrapper-login">
            <Background></Background>
            <div className="container">
                {children}
            </div>
            
        </div>
    );
}
export default LayoutLogin;