import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../assets/style/admin/layout/sidebar/sidbar.scss";

function Sidebar() {
  const currentPath = window.location.pathname;
  const [isWarehousePage, setIsWarehousePage] = useState(currentPath==="/warehouse");
  const [isAccount, setIsAccount] = useState(currentPath==="/accounts");
  const [isSample, setIsSample] = useState(currentPath==="/sampleupdate");
  const [isTask, setIsTask] = useState(currentPath==="/admin");
  useEffect(() => {
    if(currentPath==="/admin")
    {
      setIsTask(true);
      setIsAccount(false);
      setIsWarehousePage(false);
      setIsSample(false); 
    }
    else if (currentPath==="/accounts" || currentPath.includes("/account"))
    {
      setIsAccount(true);
      setIsTask(false);
      setIsWarehousePage(false);
      setIsSample(false); 
    }
    else if (currentPath==="/warehouse")
    {
      setIsWarehousePage(true);
      setIsTask(false);
      setIsAccount(false);
      setIsSample(false); 
    }
    else if(currentPath==="/sampleupdate")
    {
      setIsSample(true); 
      setIsWarehousePage(false);
      setIsTask(false);
      setIsAccount(false);
    }
  });
  return (
    <div className="sidebar sidebar-scss">
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          <li className="sidebar-item">
            <Link
              to="/admin"
              className={`sidebar-link ${
                isTask ? "active-sidebar" : ""
              }`}
            >
              <i className="fa-solid fa-list"></i>
              Công việc
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              to="/accounts"
              className={`sidebar-link ${
                isAccount ? "active-sidebar" : ""
              }`}
            >
              <i className="fa-regular fa-user"></i>
              Tài khoản
            </Link>
          </li>
          {/* <li className="sidebar-item">
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
          </li> */}
          <li className="sidebar-item">
            <Link
              to="/warehouse"
              className={`sidebar-link ${
                isWarehousePage ? "active-sidebar" : ""
              }`}
            >
              <i className="fa-solid fa-warehouse"></i>
              Kho
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              to="/sampleupdate"
              className={`sidebar-link ${
                isSample ? "active-sidebar" : ""
              }`}
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
