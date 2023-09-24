import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../../assets/style/admin/layout/sidebar/sidbar.scss";

function Sidebar() {
  const [selectedLink, setSelectedLink] = useState("task");
  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          <li className="sidebar-item">
            <Link
              to="/admin"
              className={`sidebar-link ${
                selectedLink === "task" ? "active-sidebar" : ""
              }`}
              onClick={() => setSelectedLink("task")}
            >
              <i className="fa-solid fa-list"></i>
              Công việc
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              to="/account"
              className={`sidebar-link ${
                selectedLink === "account" ? "active-sidebar" : ""
              }`}
              onClick={() => setSelectedLink("account")}
            >
              <i className="fa-regular fa-user"></i>
              Tài khoản
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              to="/message"
              className={`sidebar-link ${
                selectedLink === "mess" ? "active-sidebar" : ""
              }`}
              onClick={() => setSelectedLink("mess")}
            >
              <i className="fa-regular fa-message"></i>
              Tin nhắn
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              to="/warehouse"
              className={`sidebar-link ${
                selectedLink === "warehouse" ? "active-sidebar" : ""
              }`}
              onClick={() => setSelectedLink("warehouse")}
            >
              <i className="fa-solid fa-warehouse"></i>
              Kho
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              to="/sampleupdate"
              className={`sidebar-link ${
                selectedLink === "updatedata" ? "active-sidebar" : ""
              }`}
              onClick={() => setSelectedLink("updatedata")}
            >
              <i className="fa-regular fa-pen-to-square"></i>
              Cập nhập dữ liệu
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
