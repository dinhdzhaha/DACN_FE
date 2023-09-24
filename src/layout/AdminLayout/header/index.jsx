import React,{ useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import logo from "../../../assets/logo/logo.svg";
import iconsearch from "../../../assets/icon/Union.svg";
import bell from "../../../assets/icon/filled.svg";
import add from "../../../assets/icon/add.svg";

import Create from "../../../components/create";

import "../../../assets/style/admin/layout/header/header.scss";
function Header() {
  const location = useLocation();
  const [isWarehousePage, setIsWarehousePage] = useState(
    location.pathname === "/warehouse"
  );

  const handleLocationChange = (newLocation) => {
    setIsWarehousePage(newLocation === "/warehouse");
  };

  useEffect(() => {
    handleLocationChange(location.pathname);
  }, [location.pathname]);
  return (
    <div className="header-admin d-flex justify-content-between">
      <div className="header-admin-logo">
        <img src={logo} alt="" />
      </div>
      <div className="header-admin-center d-flex align-items-center">
        <div className="header-admin-center-seacrh">
          <form className="header-admin-center-seacrh-form">
            <div className="header-admin-center-seacrh-form-group">
              <input
                type="text"
                id="search"
                className="header-admin-center-seacrh-form-group-input"
                placeholder="Tìm kiếm"
              />
              <span className="header-span"></span>
              <label className= "header-search" htmlFor="search">
                <img src={iconsearch} alt="" />
              </label>
            </div>
          </form>
        </div>
        {isWarehousePage ? (
          <Create data="Hàng hoá mới" />
        ) : (
          <button className="header-admin-center-btn">
            <img src={add} className="me-2" alt="" />
            công việc mới
          </button>
        )}
        {/* <Create data="Hàng hoá mới" />
        <button className="header-admin-center-btn">
          <img src={add} className="me-2" alt="" />
          công việc mới
        </button> */}
        <div className="header-admin-center-bell position-relative">
          <img className="header-bell" src={bell} alt="" />
          <span className="header-admin-center-bell-number">1</span>
        </div>
      </div>
      <div className="header-user d-flex align-items-center gap-2">
        <div className="header-user-avatar">
          <img
            src="https://i.pinimg.com/736x/51/dd/2b/51dd2b60fbf996c35dbf9267c4a5709b.jpg"
            className="header-user-avatar-photo"
            alt=""
          />
        </div>
        <div className="header-user-name-position">
          <div className="header-user-name">An tony</div>
          <div className="header-user-position">Tho may</div>
        </div>
      </div>
    </div>
  );
}

export default Header;
