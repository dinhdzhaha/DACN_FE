import React, { useState } from "react";
import { Table } from "antd";
import "../assets/style/admin/account/account.scss";
import { useEffect } from "react";
import axios from "axios";
import { parse, differenceInDays, format, parseISO } from "date-fns";
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
}

function ModalUser(props) {
  const [data, setData]= useState([{"key":"","image":"","name":"", "userName":"", "address":"", "phone":"", "birthday":""}])
  const userAuth = JSON.parse(localStorage.getItem("userAuth"));
  const baseURL = import.meta.env.VITE_API_URL;
  const [users,setUseStateData]= useState([]);
  useEffect(() => {
    axios.get(baseURL+`api/Users/GetAllUsers`,yourConfig).then((res) => {
        let responseData = res.data;
        setUseStateData(responseData);
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
  const yourConfig = {
    headers: {
        Authorization: "Bearer " + userAuth?.token
    }
  };
  const oneClickHandler = (record) => {
    props.SetUseStateData(users.filter((item)=>item.id===record.key)[0]);
    props.SetUseData(users.filter((item)=>item.id===record.key)[0]);
    props.CloseModal1();
    const date = new Date(users.filter((item)=>item.id===record.key)[0].birthDay);
    props.SetBirthDay(format(date, 'yyyy-MM-dd'));
    props.SetName(users.filter((item)=>item.id===record.key)[0].firstName+" "+users.filter((item)=>item.id===record.key)[0].lastName);
  }
  return (
    <div className="table-user">
      <Table
      pagination={{ pageSize: 7 }}
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowClassName="row-scss"
        onRow={(record, rowIndex) => {
          return {
            onClick:()=> {oneClickHandler(record)},
            onDoubleClick: (event) => {}, // right button click row
            onContextMenu: (event) => {}, // right button click row
            onMouseEnter: (event) => {}, // mouse enter row
            onMouseLeave: (event) => {}, // mouse leave row
          };
        }}
      />
    </div>
  );
}

export default ModalUser;
