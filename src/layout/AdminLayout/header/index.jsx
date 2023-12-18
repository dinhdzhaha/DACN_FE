import React,{ useState, useEffect, useContext} from "react";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo/logo.svg";
import iconsearch from "../../../assets/icon/Union.svg";
import bell from "../../../assets/icon/filled.svg";
import add from "../../../assets/icon/add.svg";
import { showToastMessageError,showToastMessageSuccess } from "../../../components/toast";
import Dropdown from 'react-bootstrap/Dropdown';
import CreateInventory from "../../../components/createInventory";
import CreateAccount from "../../../components/createAccount";
import "../../../assets/style/admin/layout/header/header.scss";
import CreateSample from "../../../components/createSample";
import ReactHtmlParser from 'react-html-parser';

function Header() {
  const {logout} = useContext(UserContext);
  const currentPath = window.location.pathname;
  const [isWarehousePage, setIsWarehousePage] = useState(currentPath==="/warehouse");
  const [isAccount, setIsAccount] = useState(currentPath==="/accounts");
  const [isSample, setIsSample] = useState(currentPath==="/sampleupdate");
  const [isTask, setIsTask] = useState(currentPath==="/admin" || currentPath.includes("Job"));
  console.log(currentPath);
  useEffect(() => {
    if(currentPath.includes("admin"))
    {
      setIsTask(true);
      setIsAccount(false);
      setIsWarehousePage(false);
      setIsSample(false); 
    }
    else if (currentPath.includes("account"))
    {
      setIsAccount(true);
      setIsTask(false);
      setIsWarehousePage(false);
      setIsSample(false); 
    }
    else if (currentPath.includes("warehouse"))
    {
      setIsWarehousePage(true);
      setIsTask(false);
      setIsAccount(false);
      setIsSample(false); 
    }
    else if(currentPath.includes("sampleupdate"))
    {
      setIsSample(true); 
      setIsWarehousePage(false);
      setIsTask(false);
      setIsAccount(false);
    }
  });
  const navigate = useNavigate();
  const userAuth= JSON.parse(localStorage.getItem("userAuth"));
  const [activeTab, setActiveTab] = useState(1);
  const [count,setCount]=useState(0);
  const [notifiesInit,setNotifiesInit] = useState([]);
  const [notifies,setNotifies]= useState([]);
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
  useEffect(() => {
    if(userAuth){
      if(!userAuth.isAdmin)
      {
        navigate("/");
      }
      axios.get(baseURL+`api/Users/GetUser/${userAuth.id}`,yourConfig).then((res) => {
          if(res.data.isAdmin===false) navigate("/");
          setUser(res.data);
      }).catch((err) => {
        if(err?.response?.status===401){
          showToastMessageError("Vui lòng đăng nhập lại!");
          logout();
          navigate("/login");
        }
        else{
          logout();
          showToastMessageError("Vui lòng đăng nhập!");
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
    else{
      logout();
      navigate("/login");
    }
  },[]);
  const handleCreateJobs=()=>{
    navigate("/createJob");
  };
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
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
      if(currentPath.includes("/updateJob/"))
      {
        navigate(`/updateJob/${item.taskId}`);
        window.location.reload(false);
      }
      else navigate(`/updateJob/${item.taskId}`);
      
    }
    else
      navigate("/cart");
  }
  return (
    <div className="header-admin d-flex justify-content-between">
      <div className="header-admin-logo" onClick={()=>navigate("/admin")}>
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
        {
        isWarehousePage &&
          <CreateInventory data="Hàng hoá mới" />
        }
        {
        isAccount &&
          <CreateAccount data="Tài khoản mới" />
        }
        {
        isSample &&
          <CreateSample data="Mẫu mới" />
        }
        {
        isTask &&
          <div>
            <button
              type="button"
              className="header-admin-center-btn"
              onClick={handleCreateJobs}
            >
              <img src={add} className="me-2" alt=""/>
              Công việc mới
            </button>
          </div>
        }
        
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
          <Dropdown.Menu className="width-notification-admin">
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
      </div>

      <Dropdown className="dropdown-hover">
          <Dropdown.Toggle variant="null"  bsPrefix="header-login">
            <div className="header-user d-flex align-items-center gap-2">
              <div className="header-user-avatar">
                <img
                  src={user.avatar}
                  className="header-user-avatar-photo"
                  alt=""
                />
              </div>
              <div className="header-user-name-position">
                <div className="header-user-name">{`${user.firstName} ${user.lastName}`}</div>
              </div>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu className="width-logout">
            <Dropdown.Item onClick={handleLogout} className="bordered-item"> Đăng xuất
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      
    </div>
  );
}

export default Header;
