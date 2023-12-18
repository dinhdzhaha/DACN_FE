import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo/logo.svg";
import bell from "../../../assets/icon/bell.svg";
import Dropdown from 'react-bootstrap/Dropdown';
import { UserContext } from "../../../context/UserContext";
import dropIcon from "../../../assets/icon/dropdown.svg";
import axios from "axios";
import { showToastMessageError,showToastMessageSuccess } from "../../../components/toast";
import ReactHtmlParser from 'react-html-parser';
import "../../../assets/style/custom/layout/header/header.scss";

function Header() {
  const currentPath = window.location.pathname;
  const navigate = useNavigate();
  const userAuth= JSON.parse(localStorage.getItem("userAuth"));
  const [activeTab, setActiveTab] = useState(1);
  const [isActive, setActive] = useState(1);
  const { logout } = useContext(UserContext);
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
    if(tabNumber===1)
    {
      setNotifies(notifiesInit);
    }
    else
    {
      setNotifies(notifiesInit.filter((item)=>item.isRead===false)); 
    }
  };
  const [user,setUser]=useState({});
  const baseURL = import.meta.env.VITE_API_URL;
  const yourConfig = {
    headers: {
        Authorization: "Bearer " + userAuth?.token
    }
  };
  const [notifiesInit,setNotifiesInit] = useState([]);
  const [notifies,setNotifies]= useState([]);
  const [count,setCount]=useState(0);
  const handleEdit = () => {setActive(0);console.log('aa');navigate("/updateUser");};
  useEffect(() => {
    if(userAuth)
    {
      axios.get(baseURL+`api/Users/GetUser/${userAuth.id}`,yourConfig).then((res) => {
          setUser(res.data);
      }).catch((err) => {
        console.log(err);
        if(err?.response?.status===401){
          showToastMessageError("Vui lòng đăng nhập lại!");
          logout();
          navigate("/login");
        }
        else
        {
          logout();
          navigate("/login");
        }
      });
      axios.get(baseURL+`api/Notify/GetNotifys?userId=${userAuth.id}`,yourConfig).then((res) => {
        setNotifiesInit(res.data);
        if(activeTab===1)
        {
          setNotifies(res.data);
        }
        else
        {
          setNotifies(res.data.filter((item)=>item.isRead===false)); 
        }
        setCount(res.data.filter((item)=>item.isRead===false).length);
      }).catch((err) => {
      
      });
    }
  },[]);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const handleClick=(item)=>{
    if(item.isRead===false)
    {
      const body={
        "id": item.id
      }
      axios.put(baseURL+`api/Notify/UpdateReadeNotify`,body,yourConfig).then((res) => {
        setNotifies(notifies.map((item2)=>{
          if(item2.id===item.id)
          {
            item2.isRead=true;
          }
          return item2;
        }));
        setCount(count-1);
      }).catch((err) => {
        console.log(err);
      });
    }
    if(userAuth.isAdmin)
    {
      navigate(`/updateJob/${item.taskId}`);
    }
    else
      navigate("/cart");
  }
  const handleTime=(time)=>{
    const dateObject = new Date(time);
    
    // Convert to local format (hh:mm dd-mm-yyyy)
    const localFormat = dateObject.toLocaleString('en-US', {
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    return localFormat;
  }
  return (
    <div className="header d-flex justify-content-between">
      <div className="header-logo">
        <img src={logo} className="header-logo-img" alt="logo" />
      </div>
      <div className="header-menu d-flex align-items-center">
        <nav className="header-nav">
          <ul className="header-nav-menu d-flex align-items-center">
            <li className="header-nav-menu-item">
              <Link to="/" className={`header-nav-menu-link${currentPath==='/'?'-'+"active":''} text-white`}>
                Trang Chủ
              </Link>
            </li>
            <li className="header-nav-menu-item">
              <Link to="/sample" className={`header-nav-menu-link${currentPath==='/sample'?'-'+"active":''} text-white`}>
                Sản phẩm mẫu
              </Link>
            </li>
            {(user!= null && userAuth!=null && userAuth.auth)&&
            <li className="header-nav-menu-item">
              <Link to="/cart" className={`header-nav-menu-link${currentPath==='/cart'?'-'+"active":''} text-white`}>
                Sản phẩm của tôi
              </Link>
            </li>
            }
            <li className="header-nav-menu-item"></li>
          </ul>
        </nav>
        {user!= null&&
        <Dropdown className="dropdown-hover">
          
          <Dropdown.Toggle variant="null"  bsPrefix="position-relative">
            <div
              className="header-bell-change position-relative"
            >
              <img src={bell} alt="" className="header-nav-menu-img-bell" />
              {count>0 &&
              <span className="header-bell-number">{count}</span>
              }
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu className="width-notification">
            <Dropdown.Item disabled>
              <h2 className="header-notification-title">Thông báo</h2>
            </Dropdown.Item>
            <div className="d-flex gap-2 mb-2 margin-dropdown">
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
            {notifies.map((item,index)=>(
            <Dropdown.Item  className="bordered-item" key={item.id} onClick={()=>handleClick(item)}>
              <div className={item.isRead?"d-flex gap-3 notification-hover notification-not-active width-notification-content":"d-flex gap-3 notification-hover notification-active width-notification-content"}>
                <div className="header-notification-avatars">
                  <img
                    src={item?.linkProduct??user?.avatar}
                    className="header-notification-photo"
                    alt=""
                  />
                </div>
                <div className="header-notification-text text-white width-notification-content-text">
                <p className="header-notification-text-top mb-1">
                  {ReactHtmlParser(item.content)}
                </p>
                  <p className="header-notification-text-time mb-1">
                    {
                      handleTime(item.createdDate)
                    }
                  </p>
                </div>
              </div>
            </Dropdown.Item>))}
            {notifies.length==0 &&
            <Dropdown.Item  className="bordered-item">
              <div className="d-flex gap-3 non-notify">
                {activeTab==1?"Không có thông báo nào":"Không có thông báo chưa đọc"}
              </div>
            </Dropdown.Item>}
          </Dropdown.Menu>
        </Dropdown>
    }
    {
              user!= null && userAuth!=null && userAuth.auth?
        <Dropdown className="dropdown-hover">
          <Dropdown.Toggle variant="null"  bsPrefix="header-login">
            <div className="header-login">
            {
              user!= null && userAuth!=null && userAuth.auth?
              <div className="d-flex gap-3 align-items-center header-cursor">
                <div className="header-login-avatar">
                  <img
                    src={user?.avatar}
                    alt=""
                    className="header-login-avatar-photo"
                  />
                </div>
                <div className="header-login-name">
                  <div className="header-login-user-name">{user?.firstName + " " + user?.lastName}</div>
                </div>
                <div className="header-login-arrow">
                  <img className="header-drop" src={dropIcon} alt="" />
                </div>
              </div>
              :
              <Link
              to="/login"
              className="header-login-link text-white text-decoration-none"
              >
                Đăng nhập
              </Link> 
            }
              
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleEdit} className="bordered-item">Cập nhật thông tin</Dropdown.Item>
            <Dropdown.Item onClick={handleLogout} className="bordered-item">Đăng xuất</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        : <Link
        to="/login"
        className="header-login-link text-white text-decoration-none login-hover"
        >
          Đăng nhập
        </Link> 

}
      </div>
    </div>
  );
}

export default Header;
