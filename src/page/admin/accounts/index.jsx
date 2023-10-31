import React, { useState } from "react";
import { Table } from "antd";
import "../../../assets/style/admin/accounts/accounts.scss";
import { useNavigate } from "react-router-dom";
import update from "../../../assets/icon/update.svg";
import recycle from "../../../assets/icon/recycle.svg";
import { useEffect } from "react";
import axios from "axios";
import { ConfirmToast } from 'react-confirm-toast';
import { showToastMessageError,showToastMessageSuccess } from "../../../components/toast";

const columns = [
  {
    title: "Avatar",
    dataIndex: "image",
    align: "left",
    width:50,
  },
  {
    title: "Họ và tên",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
    align: "left",
    width:100,
  },
  {
    title: "Tài khoản",
    dataIndex: "userName",
    sorter: (a, b) => a.userName.localeCompare(b.userName),
    align: "left",
    width:100,
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    align: "left",
    width:300,
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone",
    align: "left",
    width:100,
  },
  {
    title: "Ngày sinh",
    dataIndex: "birthday",
    align: "left",
    width:100,
  }
];

function onChange(pagination, sorter, extra) {
  
  console.log("params", pagination, sorter, extra);
}

function Accounts() {
  const [data, setData]= useState([{"key":"","image":"","name":"", "userName":"", "address":"", "phone":"", "birthday":""}])
  const userAuth = JSON.parse(localStorage.getItem("userAuth"));
  const baseURL = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    axios.get(baseURL+`api/Users/GetAllUsers`,yourConfig).then((res) => {
        let responseData = res.data;
        let data_=[];
        responseData.forEach((item)=>{
          const utcTime = new Date(item.birthDay);
          const date = utcTime.toLocaleDateString();
          data_.push({"key":item.id,"image":<img src={item.avatar} width={40} height={40}></img>,"name":item.firstName+" "+item.lastName, "userName":item.userName, "address":item.address, "phone":item.phone, "birthday":date});
        })
        setData(data_);
      }).catch((err) => {
        console.log(err);
      });
  },[]);
  const handleEdit=()=>{
    navigate(`/account/${selectedRowKeys[0]}`);
  };
  let singleClickTimer = null;
  let firstClickEvent = false;
  const [isActiveUpdate,setIsActiveUpdate]=useState(false);
  const [isActiveDelete,setIsActiveDelete]=useState(false);
  const oneClickHandler = (record) => {
    if (!firstClickEvent) {
      firstClickEvent = true;
      singleClickTimer = setTimeout(() => {
        if(selectedRowKeys.length===0){
        if(!selectedRowKeys.includes(record.key)) {
          navigate(`/account/${record.key}`);
        }
        else{
          const updatedKeys = [...selectedRowKeys];
          updatedKeys.splice(updatedKeys.indexOf(record.key), 1);
          setSelectedRowKeys(updatedKeys);
        }
        firstClickEvent = false;
      }
    else {
      if (selectedRowKeys.includes(record.key)) {
        const updatedKeys = [...selectedRowKeys];
        updatedKeys.splice(updatedKeys.indexOf(record.key), 1);
        setSelectedRowKeys(updatedKeys);
      } else setSelectedRowKeys([...selectedRowKeys, record.key]);
    }
  }, 300);
}
  };

  const doubleClickHandler = (record) => {
    clearTimeout(singleClickTimer);
    if (selectedRowKeys.includes(record.key)) {
      const updatedKeys = [...selectedRowKeys];
      updatedKeys.splice(updatedKeys.indexOf(record.key), 1);
      setSelectedRowKeys(updatedKeys);
    } else {
      setSelectedRowKeys([...selectedRowKeys, record.key]);
    }
    
    firstClickEvent = false;
  };
  const navigate= useNavigate();
  const [loading,setLoading] = useState(false);
  const handleLoadingChange = (enable) => {
    setLoading(enable);
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  useEffect(() => {if(selectedRowKeys.length>0){
    setIsActiveDelete(true);
    if(selectedRowKeys.length===1)
      setIsActiveUpdate(true);
    else
      setIsActiveUpdate(false);
  }
  else{
    setIsActiveUpdate(false);
    setIsActiveDelete(false);
  }});
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const yourConfig = {
    headers: {
        Authorization: "Bearer " + userAuth?.token
    },
    data: {
      ids:selectedRowKeys
    }
  };
  const myFunction = () => {
    const config = yourConfig;
    axios.delete(baseURL+`api/Users/DeleteUsers`,config).then((res) => {
        const updatedData = data.filter((item) => !selectedRowKeys.includes(item.key));
        setData(updatedData);
        showToastMessageSuccess("Đã xóa thành công!");
        setSelectedRowKeys([]);
        setIsActiveUpdate(false);
        setIsActiveDelete(false);

    }).catch((err) => {
      console.log(err);
    });
  }
  return (
    <div className="table-user">
      <div className="table-action">
        {isActiveUpdate &&
        <button className="table-action-update" onClick={handleEdit}>
            <img src={update} className="table-action-icon"></img>
            Cập nhật
          </button>
        }
        {isActiveDelete &&
        <ConfirmToast
        asModal={true}
        customCancel={'Hủy'}
        customConfirm={'Xóa'}
        customFunction={myFunction}
        message={'Bạn có chắc xóa các tài khoản đã chọn?'}
        position={'top-left'}
        showCloseIcon={true}
        theme={'light'}
      >
      <button className="table-action-remove">
          <img src={recycle}  className="table-action-icon"></img>
          Xóa
        </button>
      </ConfirmToast>}
      </div>
      <Table
      pagination={{ pageSize: 7 }}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowClassName="row-scss"
        onRow={(record, rowIndex) => {
          return {
            onClick:()=> {oneClickHandler(record)},
            onDoubleClick: ()=>doubleClickHandler(record), // double click row
            onContextMenu: (event) => {}, // right button click row
            onMouseEnter: (event) => {}, // mouse enter row
            onMouseLeave: (event) => {}, // mouse leave row
          };
        }}
      />
    </div>
  );
}

export default Accounts;
