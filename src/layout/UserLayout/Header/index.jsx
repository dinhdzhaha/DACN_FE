import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo/logo.svg";
import bell from "../../../assets/icon/bell.svg";

import "../../../assets/style/custom/layout/header/header.scss";

function Header() {
  const [activeTab, setActiveTab] = useState(1);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  const toggleNotification = () => {
    setNotificationVisible(!notificationVisible);
  };
  return (
    <div className="header d-flex justify-content-between">
      <div className="header-logo">
        <img src={logo} className="header-logo-img" alt="logo" />
      </div>
      <div className="header-menu d-flex align-items-center">
        <nav className="header-nav">
          <ul className="header-nav-menu d-flex align-items-center">
            <li className="header-nav-menu-item">
              <Link to="/" className="header-nav-menu-link text-white">
                Trang Chủ
              </Link>
            </li>
            <li className="header-nav-menu-item">
              <a href="#" className="header-nav-menu-link text-white">
                Sản phẩm mẫu
              </a>
            </li>
            <li className="header-nav-menu-item">
              <Link to="/cart" className="header-nav-menu-link text-white">
                Sản phẩm của tôi
              </Link>
            </li>
            <li className="header-nav-menu-item"></li>
          </ul>
        </nav>
        <div className="position-relative">
          <div
            className="header-bell-change position-relative"
            onClick={toggleNotification}
          >
            <img src={bell} alt="" className="header-nav-menu-img-bell" />
            <span className="header-bell-number">1</span>
          </div>
          {notificationVisible && (
            <div className="header-notification position-absolute">
              <h2 className="header-notification-title">Thông báo</h2>
              <div>
                <div className="d-flex gap-3 mb-3">
                  <div
                    className={`tab header-notification-all ${
                      activeTab === 1 ? "active" : ""
                    }`}
                    onClick={() => handleTabClick(1)}
                  >
                    Tất cả
                  </div>
                  <div
                    className={`tab header-notification-unread ${
                      activeTab === 2 ? "active" : ""
                    }`}
                    onClick={() => handleTabClick(2)}
                  >
                    Chưa đọc
                  </div>
                </div>

                {activeTab === 1 && (
                  <div className="tab-content">
                    <div className="header-notification-box">
                      <div className="d-flex gap-3">
                        <div className="header-notification-avatars">
                          <img
                            src="https://i.pinimg.com/564x/bc/77/95/bc77955563a66537bcfae105838e2c86.jpg"
                            className="header-notification-photo"
                            alt=""
                          />
                        </div>
                        <div className="header-notification-text text-white">
                          <p className="header-notification-text-top mb-1">
                            Áo sơ mi đồng phục cấp 2 của bạn đã được nhận bởi
                            bạn
                          </p>
                          <p className="header-notification-text-time mb-1">
                            54 phút trước
                          </p>
                        </div>
                      </div>
                      <div className="d-flex gap-3">
                        <div className="header-notification-avatars">
                          <img
                            src="https://i.pinimg.com/564x/bc/77/95/bc77955563a66537bcfae105838e2c86.jpg"
                            className="header-notification-photo"
                            alt=""
                          />
                        </div>
                        <div className="header-notification-text text-white">
                          <p className="header-notification-text-top mb-1 notification-active">
                            Áo sơ mi đồng phục cấp 2 của bạn đã được nhận bởi
                            bạn
                          </p>
                          <p className="header-notification-text-time notification-active-time mb-1">
                            54 phút trước
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 2 && (
                  <div className="tab-content">Content of Tab 2</div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="header-login d-flex gap-2 align-items-center">
          {/* <Link
            to="#"
            className="header-login-link text-white text-decoration-none"
          >
            Đăng nhập
          </Link> */}
          <div className="header-login-avatar">
            <img
              src="https://i.pinimg.com/564x/7f/b3/16/7fb31650b97e6e62944fd87f89605f6e.jpg"
              alt=""
              className="header-login-avatar-photo"
            />
          </div>
          <div className="header-login-name">
              <div className="header-login-user-name">An tony</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
