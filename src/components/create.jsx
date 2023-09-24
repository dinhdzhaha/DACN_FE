import React, { useState } from "react";

import add from "../assets/icon/add.svg";
import "../assets/style/components/create.scss";
function Create({ data }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [showModal, setShowModal] = useState(true);

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
  return (
    <div className="create">
      <button
        type="button"
        className="header-admin-center-btn"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <img src={add} className="me-2" alt="" />
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
                      <i class="fa-regular fa-circle-xmark"></i>
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
                    className="warehouse-model-input"
                    placeholder="Nhập tên"
                  />
                </div>
              </div>
              <div className="warehouse-model-line"></div>
              <ul className="warehouse-model-menu">
                <li className="warehouse-model-item">
                  <strong className="text-dark"> Loại: </strong>{" "}
                  <input
                    type="text"
                    className="warehouse-model-input"
                    placeholder="Nhập loại"
                  />
                </li>
                <li className="warehouse-model-item">
                  <strong className="text-dark"> Giá: </strong>{" "}
                  <span>
                    {" "}
                    <input
                      type="text"
                      className="warehouse-model-input"
                      placeholder="nhập tiền"
                      defaultValue={"199đ"}
                    />
                  </span>
                </li>
                <li className="warehouse-model-item">
                  <strong className="text-dark"> Mô tả: </strong>{" "}
                  <input
                    type="text"
                    className="warehouse-model-input"
                    placeholder="nhập mô tả"
                  />
                </li>
                <li className="warehouse-model-item">
                  <strong className="text-dark"> Note: </strong>{" "}
                  <input
                    type="text"
                    className="warehouse-model-input"
                    placeholder="nhập chú ý"
                  />
                </li>
                <li className="warehouse-model-item">
                  <strong className="text-dark"> Vải cơ sở may: </strong>{" "}
                  <input
                    type="text"
                    className="warehouse-model-input"
                    placeholder="nhập vải cơ sở may"
                  />
                </li>
              </ul>
              <div className="text-end">
                <button type="button" className="warehouse-model-btn">
                  Cập nhập
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
