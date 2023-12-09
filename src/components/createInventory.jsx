import React, { useState, useEffect } from "react";
import axios from "axios";
import add from "../assets/icon/add.svg";
import "../assets/style/components/createInventory.scss";
import { showToastMessageError,showToastMessageSuccess } from "./toast";

function CreateInventory({ data }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const userAuth = JSON.parse(localStorage.getItem("userAuth"));
  const baseURL = import.meta.env.VITE_API_URL;
  const yourConfig = {
    headers: {
      Authorization: "Bearer " + userAuth?.token
    }
  };
  const [nameInventory, setNameInventory] = useState("");
  const [price, setPrice] = useState("");
  const [total, setTotal] = useState("");
  const [used, setUsed] = useState(0);
  const [idInventoryCategory, setIdInventoryCategory] = useState("");
  const [category,setCategory] =useState([{}]);
  useEffect(() => { 
    axios.get(baseURL+`api/InventoryCategory/GetAllInventoryCategory`,yourConfig).then((res) => {
      setCategory(res.data);
      setIdInventoryCategory(res.data[0].id);
    }).catch((err) => {
      console.log(err);
    });
  }, []
  );
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
    if(nameInventory.length == 0)
    {
      showToastMessageError("Tên không được để trống!");
      return;
    }
    const body={
      "inventoryCategoryId": idInventoryCategory,
      "name": nameInventory,
      "describe": "",
      "images": imagePreview??0,
      "price": price?parseInt(price, 10):0,
      "total": total?parseInt(total, 10):0,
      "used": used?parseInt(used, 10):0
    }
    axios.post(`${baseURL}api/Inventory/CreateInventory`,body,yourConfig)
    .then((res)=>{
      window.location.reload();
    })
    .catch((err)=>{
      console.log(err);
    })
  };
  return (
    <div className="create">
      <button
        type="button"
        className="header-admin-center-btn"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal2"
      >
        <img src={add} className="me-2" alt=""/>
        {data}
      </button>
      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <h3 className="warehouse-model-title">Thêm nguyên liệu</h3>
              <div className="warehouse-model-img">
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
              <div className="warehouse-model-name">
                <div className="d-flex">
                  <h2 className="model-names m-0">Tên:</h2>
                  <input
                    type="text"
                    className="warehouse-model-input w-100"
                    placeholder="Nhập tên"
                    value={nameInventory}
                    onChange={(e) => setNameInventory(e.target.value)}
                  />
                </div>
              </div>
              <div className="warehouse-model-line"></div>
              <ul className="warehouse-model-menu">
                <li className="warehouse-model-item" >
                  <div className="d-flex">
                    <div className="width-label">
                      <strong className="text-dark"> Loại: </strong>{" "}
                    </div>
                    <select
                      id="selectInput"
                      className="warehouse-model-input"
                      value={idInventoryCategory}
                      onChange={(e) => setIdInventoryCategory(e.target.value)}
                    >
                      {
                        category.map((item,index)=>{
                          return(
                            <option key={index} value={item.id}>{item.name}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                </li>
                <li className="warehouse-model-item" >
                  <div className="d-flex">
                    <div className="width-label">
                      <strong className="text-dark width-label">Đơn Giá: </strong>{" "}
                    </div>
                    <span>
                      {" "}
                      <input
                        type="number"
                        className="warehouse-model-input w-100  "
                        placeholder="Nhập đơn giá"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </span>
                  </div>
                </li>
                <li className="warehouse-model-item" >
                  <div className="d-flex">
                    <div className="width-label">
                      <strong className="text-dark width-label">Tổng: </strong>{" "}
                    </div>
                    <input
                      type="number"
                      className="warehouse-model-input"
                      placeholder="Nhập tổng số lượng trong kho"
                      value={total}
                      onChange={(e) => setTotal(e.target.value)}
                    />
                  </div>
                </li>
                <li className="warehouse-model-item" >
                  <div className="d-flex">
                    <div className="width-label">
                      <strong className="text-dark width-label"> Đã sử dụng: </strong>{" "}
                    </div>
                    <input
                      type="number"
                      className="warehouse-model-input"
                      placeholder="Nhập số lượng đã sự dụng"
                      defaultValue={0}
                      value={used}
                      onChange={(e) => setUsed(e.target.value)}
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

export default CreateInventory;
