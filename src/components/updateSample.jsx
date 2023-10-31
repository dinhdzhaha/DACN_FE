import React, { useState, useEffect } from "react";
import axios from "axios";
import add from "../assets/icon/add.svg";
import "../assets/style/components/create.scss";
function UpdateSample({data}) {
  const [imagePreview, setImagePreview] = useState(data?.images);
  const [showModal, setShowModal] = useState(false);
  const userAuth = JSON.parse(localStorage.getItem("userAuth"));
  const baseURL = import.meta.env.VITE_API_URL;
  const yourConfig = {
    headers: {
      Authorization: "Bearer " + userAuth?.token
    }
  };
  const [nameSample, setNameSample] = useState(data?.name);
  const [price, setPrice] = useState(data?.price);
  const [description, setDescription] = useState(data?.description);
  const [note, setNote] = useState(data?.note);
  const [productCategoryId, setProductCategoryId] = useState(data?.productCategoryId);
  const [sex, setSex] = useState(data?.isMale?"Nam":"Nữ");
  const [category,setCategory] =useState([{}]);
  useEffect(() => { 
    axios.get(baseURL+`api/ProductCategory/GetAllProductCategory`,yourConfig).then((res) => {
      setCategory(res.data);
      }).catch((err) => {
          console.log(err);
      });
  }, []
  );
  useEffect(() => { 
    setNameSample(data?.name);
    setPrice(data?.price);
    setDescription(data?.description);
    setNote(data?.note);
    setProductCategoryId(data?.productCategoryId);
    setSex(data?.isMale?"Nam":"Nữ");
    setImagePreview(data?.images);
  }, [data]
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
  const handleUpdate=()=>{
    const body={
      "id":data?.id,
      "inventoryCategoryId": idInventoryCategory,
      "name": nameInventory,
      "describe": "",
      "images": imagePreview,
      "price": price?parseInt(price, 10):0,
      "total": total?parseInt(total, 10):0,
      "used": used?parseInt(used, 10):0
    }
    axios.put(`${baseURL}api/Inventory/UpdateInventory`,body,yourConfig)
    .then((res)=>{
      window.location.reload();
    })
    .catch((err)=>{
      console.log(err);
    })
  };
  console.log("data",data,imagePreview);
  return (
    <div className="create" key={data?.id}>
      
      <div
        className="modal fade"
        id="exampleModal12"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel12"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <h3 className="warehouse-model-title">Cập nhật thông tin mẫu</h3>
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
                <div className="d-flex">
                  <h2 className="model-names m-0">Tên mẫu:</h2>
                  <input
                    type="text"
                    className="warehouse-model-input w-100"
                    placeholder="Nhập tên"
                    value={nameSample}
                    onChange={(e) => setNameInventory(e.target.value)}
                  />
                </div>
              </div>
              <div className="warehouse-model-line width-line"></div>
              <ul className="warehouse-model-menu">
                <li className="warehouse-model-item" someAttribute={true}>
                  <div className="d-flex">
                    <div className="width-label">
                      <strong className="text-dark"> Loại: </strong>{" "}
                    </div>
                    <select
                      className="warehouse-model-input"
                      value={productCategoryId}
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
                <li className="warehouse-model-item" someAttribute={true}>
                  <div className="d-flex">
                    <div className="width-label">
                      <strong className="text-dark width-label">Giá: </strong>{" "}
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
                <li className="warehouse-model-item" someAttribute={true}>
                  <div className="d-flex">
                    <div className="width-label">
                      <strong className="text-dark width-label">Mô tả: </strong>{" "}
                    </div>
                    <input
                      type="number"
                      className="warehouse-model-input"
                      placeholder="Nhập tổng số lượng trong kho"
                      value={description}
                      onChange={(e) => setTotal(e.target.value)}
                    />
                  </div>
                </li>
                <li className="warehouse-model-item" someAttribute={true}>
                  <div className="d-flex">
                    <div className="width-label">
                      <strong className="text-dark width-label"> Ghi chú: </strong>{" "}
                    </div>
                    <input
                      type="number"
                      className="warehouse-model-input"
                      placeholder="Nhập số lượng đã sự dụng"
                      defaultValue={0}
                      value={note}
                      onChange={(e) => setUsed(e.target.value)}
                    />
                  </div>
                </li>
                <li className="warehouse-model-item" someAttribute={true}>
                  <div className="d-flex">
                    <div className="width-label">
                      <strong className="text-dark width-label"> Giới tính: </strong>{" "}
                    </div>
                    <input
                      type="number"
                      className="warehouse-model-input"
                      placeholder="Nhập số lượng đã sự dụng"
                      defaultValue={0}
                      value={sex}
                      onChange={(e) => setUsed(e.target.value)}
                    />
                  </div>
                </li>
              </ul>
              <div className="text-end">
                <button type="button" className="warehouse-model-btn" onClick={handleUpdate}>
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateSample;
