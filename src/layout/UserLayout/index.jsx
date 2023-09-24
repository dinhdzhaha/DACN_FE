import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../../assets/style/custom/layout/layout.scss";
function Layout({ children }) {
  return (
    <div className="wapper">
      <Header></Header>
      <div className="content">{children}</div>
      <Footer></Footer>
    </div>
  );
}

export default Layout;
