import React, { useState, useRef } from "react";
import axios from "axios";
import add from "../assets/icon/add.svg";
import "../assets/style/components/createAccount.scss";
import { showToastMessageError,showToastMessageSuccess } from "./toast";
function CreateAccount({ data }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const userAuth = JSON.parse(localStorage.getItem("userAuth"));
  const baseURL = import.meta.env.VITE_API_URL;
  const yourConfig = {
    headers: {
      Authorization: "Bearer " + userAuth?.token
    }
  };
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [userName, setUerName] = useState("");
  const [password, setPassword] = useState("");
  const emailRef=useRef();
  const phoneRef=useRef();
  const nameRef=useRef();
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setShowModal(false); // Ẩn modal sau khi tải ảnh lên
      };

      reader.readAsDataURL(file);
    }
  };
  const handleDeleteImage = () => {
    setImagePreview(null); // Xoá ảnh bằng cách cài đặt giá trị null
    setShowModal(true); // Hiển thị modal sau khi xoá ảnh
  };
  const handleCreate=()=>{
    if(email!="")
    {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; // Ví dụ kiểm tra địa chỉ email.
      if(!emailRegex.test(email))
      {
        showToastMessageError("Email chưa đúng!");
        emailRef.current.focus();
        return;
      }
    }
    if(phone!="")
    {
      const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/; // Ví dụ kiểm tra số điện thoại.
      if(!phoneRegex.test(phone))
      {
        showToastMessageError("Số điện thoại chưa đúng!");
        phoneRef.current.focus();
        return;
      }
    }
    if(email==="")
    {
      showToastMessageError("Không được để trống Email!");
      emailRef.current.focus();
      return;
    }
    else if(phone==="")
    {
      showToastMessageError("Không được để trống số điện thoại!");
      phoneRef.current.focus();
      return;
    }
    else if(lName==="")
    {
      showToastMessageError("Không được để trống tên!");
      nameRef.current.focus();
      return;
    }
    const body={
        "email": email,
        "phone": phone,
        "address": address,
        "firstName": fName,
        "lastName": lName,
        "avatar": imagePreview??"",
        "userName": userName==""?phone:userName,
        "passWord": password==""?phone:password,
        "birthDay": date
    }
    axios.post(`${baseURL}api/Users/CreateUser`,body,yourConfig)
    .then((res)=>{
      window.location.reload();
    })
    .catch((err)=>{
      showToastMessageError("Tài khoản đã tồn tại trong hệ thống!");
      console.log(err);
    })
  };
  return (
    <div className="create">
      <button
        type="button"
        className="header-admin-center-btn"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <img src={add} className="me-2" alt=""/>
        {data}
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content width-modal">
            <div className="modal-body">
              <h3 className="warehouse-model-title">Tạo tài khoản mới</h3>
              <div className="warehouse-model-img change-width">
                {imagePreview && (
                  <div className="position-relative">
                    <div className="warehouse-model-updaload">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="warehouse-model-photo"
                      />
                    </div>
                    <button
                      className="closes position-absolute"
                      onClick={handleDeleteImage}
                    >
                      <i className="fa-regular fa-circle-xmark"></i>
                    </button>
                  </div>
                )}
                {showModal && (
                  <div className="modal-load">
                    <input
                      type="file"
                      id="loadimg"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="d-none"
                    />
                    <label htmlFor="loadimg" className="upload-load">
                      Tải ảnh
                    </label>
                  </div>
                )}
              </div>
              <div className="warehouse-model-name margin-name">
                <div className="d-flex">
                  <h2 className="model-names m-0 scss-name">Họ:</h2>
                  <input
                    type="text"
                    className="warehouse-model-input w-100 scss-name"
                    placeholder="Nhập họ"
                    value={fName}
                    onChange={(e) => setFName(e.target.value)}
                  />
                  <h2 className="model-names m-0 scss-name scss-name">Tên:</h2>
                  <input
                    type="text"
                    className="warehouse-model-input w-100 scss-name"
                    placeholder="Nhập tên"
                    value={lName}
                    ref={nameRef}
                    onChange={(e) => setLName(e.target.value)}
                  />
                </div>
              </div>
              <div className="warehouse-model-line width-line"></div>
              <ul className="warehouse-model-menu">
              <li className="warehouse-model-item">
                  <div className="d-flex">
                    <div className="width-label-1">
                      <strong className="text-dark"> Ngày sinh: </strong>{" "}
                    </div>
                    <input type="date" 
                    className="warehouse-model-input width-auto"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}></input>
                  </div>
                </li>
                <li className="warehouse-model-item">
                  <div className="d-flex">
                    <div className="width-label-1">
                      <strong className="text-dark"> Địa chỉ email: </strong>{" "}
                    </div>
                    <input type="email"
                    placeholder="Nhập địa chỉ email"
                    className="warehouse-model-input"
                    ref={emailRef}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                  </div>
                </li>
                <li className="warehouse-model-item">
                  <div className="d-flex">
                    <div className="width-label-1">
                      <strong className="text-dark width-label-1">Số điện thoại: </strong>{" "}
                    </div>
                    <span>
                      <input
                        type="number"
                        className="warehouse-model-input w-100  "
                        placeholder="Nhập số điện thoại"
                        ref={phoneRef}
                        value={phone}
                        onChange={(e) => {setPhone(e.target.value);}}
                      />
                    </span>
                  </div>
                </li>
                <li className="warehouse-model-item">
                  <div className="d-flex">
                    <div className="width-label-1">
                      <strong className="text-dark width-label-1">Địa chỉ: </strong>{" "}
                    </div>
                    <input
                      type="text"
                      className="warehouse-model-input"
                      placeholder="Nhập địa chỉ"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </li>
                <li className="warehouse-model-item">
                  <div className="d-flex">
                    <div className="width-label-1">
                      <strong className="text-dark width-label-1"> Tài khoản: </strong>{" "}
                    </div>
                    <input
                      type="text"
                      className="warehouse-model-input"
                      placeholder="Nhập tài khoản người dùng"
                      value={userName}
                      onChange={(e) => setUerName(e.target.value)}
                    />
                  </div>
                </li>
                <li className="warehouse-model-item">
                  <div className="d-flex">
                    <div className="width-label-1">
                      <strong className="text-dark width-label">Mật khẩu: </strong>{" "}
                    </div>
                    <input
                      type="text"
                      className="warehouse-model-input"
                      placeholder="Nhập mật khẩu"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </li>
              </ul>
              <div className="text-end">
                <button type="button" className="warehouse-model-btn" onClick={handleCreate}>
                  Tạo mới
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
