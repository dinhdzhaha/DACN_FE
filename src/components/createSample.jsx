import React, { useState, useEffect } from "react";
import axios from "axios";
import add from "../assets/icon/add.svg";
import "../assets/style/components/createSample.scss";
import { showToastMessageError,showToastMessageSuccess } from "./toast";

function CreateSample({ data }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [nameSample, setNameSample] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");
  const [productCategoryId, setProductCategoryId] = useState("");
  const [sex, setSex] = useState("");
  const userAuth = JSON.parse(localStorage.getItem("userAuth"));
  const baseURL = import.meta.env.VITE_API_URL;
  const yourConfig = {
    headers: {
      Authorization: "Bearer " + userAuth?.token
    }
  };
  const [category,setCategory] =useState([{}]);
  useEffect(() => { 
    axios.get(baseURL+`api/ProductCategory/GetAllProductCategory`,yourConfig).then((res) => {
      setCategory(res.data);
      setProductCategoryId(res.data[0].id);
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
    if(nameSample.length == 0)
    {
      showToastMessageError("Tên không được để trống!");
      return;
    }
    const body=
    {
      "productCategoryId": productCategoryId,
      "name": nameSample,
      "description": description,
      "images": imagePreview,
      "note": note,
      "price": price,
      "isMale": sex
    }
    axios.post(`${baseURL}api/Sample/CreateSample`,body,yourConfig)
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
              <h3 className="warehouse-model-">Thêm mẫu</h3>
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
                      id="loadimg12"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="d-none"
                    />
                    <label htmlFor="loadimg12" className="upload-load">
                      Tải ảnh
                    </label>
                  </div>
                )}
              </div>
              <div className="warehouse-model-name">
                <div className="d-flex padding">
                  <h2 className="model-names m-0">Tên mẫu:</h2>
                  <input
                    type="text"
                    className="warehouse-model-input w-100"
                    placeholder="Nhập tên"
                    value={nameSample}
                    onChange={(e) => setNameSample(e.target.value)}
                  />
                </div>
              </div>
              <div className="warehouse-model-line width-line"></div>
              <ul className="warehouse-model-menu">
                <li className="warehouse-model-item" >
                  <div className="d-flex padding">
                    <div className="width-label">
                      <strong className="text-dark"> Loại: </strong>{" "}
                    </div>
                    <select
                      className="warehouse-model-input"
                      value={productCategoryId}
                      onChange={(e) => setProductCategoryId(e.target.value)}
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
                  <div className="d-flex padding">
                    <div className="width-label">
                      <strong className="text-dark width-label">Giá: </strong>{" "}
                    </div>
                    <span>
                      {" "}
                      <input
                        type="number"
                        className="warehouse-model-input w-100  "
                        placeholder="Nhập giá mẫu"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </span>
                  </div>
                </li>
                <li className="warehouse-model-item" >
                  <div className="d-flex padding">
                    <div className="width-label">
                      <strong className="text-dark width-label">Mô tả: </strong>{" "}
                    </div>
                    <input
                      type="number"
                      className="warehouse-model-input"
                      placeholder="Nhập mô tả"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </li>
                <li className="warehouse-model-item" >
                  <div className="d-flex padding">
                    <div className="width-label">
                      <strong className="text-dark width-label"> Ghi chú: </strong>{" "}
                    </div>
                    <input
                      type="number"
                      className="warehouse-model-input"
                      placeholder="Nhập ghi chú"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>
                </li>
                <li className="warehouse-model-item" >
                  <div className="d-flex padding">
                    <div className="width-label">
                      <strong className="text-dark width-label"> Giới tính: </strong>{" "}
                    </div>
                    <select className="warehouse-model-input"
                      placeholder="Chọn giới tính"
                      value={sex}
                      onChange={(e) => setSex(e.target.value)}>
                      <option value="">Chọn giới tính</option>
                      <option value={true}>Nam</option>
                      <option value={false}>Nữ</option>
                    </select>
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

export default CreateSample;
