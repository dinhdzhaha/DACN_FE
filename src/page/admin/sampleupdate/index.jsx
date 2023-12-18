import React, { useState,useEffect } from "react";
import axios from "axios";
import "../../../assets/style/custom/sample/sampleUpdate.scss";
import icondot from "../../../assets/icon/icondot.svg";
import Dropdown from 'react-bootstrap/Dropdown';
import { showToastMessageError,showToastMessageSuccess } from "../../../components/toast";
import Modal from 'react-modal';

function SampleUpdate() {
  const userAuth = JSON.parse(localStorage.getItem("userAuth"));
  const baseURL = import.meta.env.VITE_API_URL;
  const yourConfig = {
    headers: {
      Authorization: "Bearer " + userAuth?.token
    }
  };
  const [selection,setSelection]=useState(0);
  const [category,setCategory] =useState([{}]);
  const [samples,setSamples] = useState([{}]);
  const [samplesInit,setSamplesInit] = useState([{}]);
  const [nameSample, setNameSample] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");
  const [productCategoryId, setProductCategoryId] = useState("");
  const [sex, setSex] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState("");
  useEffect(() => { 

    axios.get(baseURL+`api/Sample/GetSamples`,yourConfig).then((res) => {
      setSamplesInit(res.data);
      setSamples(res.data);
        }).catch((err) => {
            console.log(err);
        });

    axios.get(baseURL+`api/ProductCategory/GetAllProductCategory`,yourConfig).then((res) => {
      setCategory(res.data);
      }).catch((err) => {
          console.log(err);
      });
  },[]);
  const handleTime=(time)=>{
    const originalDate = new Date(time);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };

    const localDate = originalDate.toLocaleString('vi-VN', options);
    return localDate;
  };

  const handleDelete=(id)=>{
    const config = {
      headers: {
        Authorization: "Bearer " + userAuth?.token
      },
      data: {
        "id": id
      }
    };
    axios.delete(baseURL+`api/Sample/DeleteSample`,config).then((res) => {
      setSamples((samples)=>{
        return samples.filter(c=>c.id!=id);
      });
      setSamplesInit((samples)=>{
        return samples.filter(c=>c.id!=id);
      });
      showToastMessageSuccess("Xóa thành công!");
    }).catch((err) => {console.error(err);showToastMessageError(err.response.data.detail);});
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = (data) => {
    setModalIsOpen(true);
    setNameSample(data?.name);
    setPrice(data?.price);
    setDescription(data?.description);
    setNote(data?.note);
    setProductCategoryId(data?.productCategoryId);
    setSex(data?.isMale);
    setImagePreview(data?.images);
    setId(data?.id);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleUpdate=()=>{
    const body=
    {
      "id": id,
      "productCategoryId": productCategoryId,
      "name": nameSample,
      "description": description,
      "images": imagePreview??"",
      "note": note,
      "price": price,
      "isMale": sex
    }
    axios.put(`${baseURL}api/Sample/UpdateSample`,body,yourConfig)
    .then((res)=>{
      const index=samples.findIndex(c=>c.id==id);
      setSamples((samples)=>[
        ...samples.slice(0, index), // Copy elements before the index
        JSON.parse(JSON.stringify(res.data)), // Add the new item
        ...samples.slice(index+1)]);
      setSamplesInit((samples)=>[
        ...samples.slice(0, index), // Copy elements before the index
        res.data, // Add the new item
        ...samples.slice(index+1) // Copy elements after the index
      ]);
      showToastMessageSuccess("Cập nhật thành công!");
      closeModal();
      // window.location.reload();
    })
    .catch((err)=>{
      console.log(err);
    })
  };
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
    <div className="warehouse">
      <Modal
      ariaHideApp={false}
                      isOpen={modalIsOpen}
                      onRequestClose={closeModal}
                      closeAfterTransition
                      className='modal-1'
                    >
         <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <h3 className="warehouse-model-title padding">Cập nhật thông tin mẫu</h3>
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
                    <textarea
                                placeholder="Nhập mô tả"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="sample-textarea"
                                cols={80}
                                rows={3}
                                />
                  </div>
                </li>
                <li className="warehouse-model-item" >
                  <div className="d-flex padding">
                    <div className="width-label">
                      <strong className="text-dark width-label"> Ghi chú: </strong>{" "}
                    </div>
                    <textarea
                                placeholder="Nhập ghi chú"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="sample-textarea"
                                cols={80}
                                rows={3}
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
                <button type="button" className="warehouse-model-btn" onClick={handleUpdate}>
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        </div>
                    </Modal>
      <div className="warehouse-select">
      <ul className="nav nav-pills" id="pills-tab" role="tablist">
          <li className="nav-item"  >
            <button
              className={selection==0?"nav-link active warehouse-text selected":"nav-link active warehouse-text"}
              onClick={()=>{setSelection(0);setSamples(samplesInit);}}
            >
              Tất cả
            </button>
          </li>
        {category.map((item, index) => (
          <li className="nav-item" key={index} >
            <button
              className={selection==item.id?"nav-link active warehouse-text selected":"nav-link active warehouse-text"}
              onClick={()=>{setSelection(item.id);setSamples(samplesInit.filter(c=>c.productCategoryId==item.id));}}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
      </div>
      <div className="warehouse-content">
        <div className="tab-content h-100 overflow-auto" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
            tabIndex="0"
          >
            <div className="d-flex flex-wrap gap-2">
              {
                samples.map((item,index)=>(
                  
                <div className="warehouse-content-box bg-white" key={index}>

                <div className="warehouse-content-top d-flex  justify-content-between">
                  <div className="warehouse-content-top-left-sample">
                    <h2 className="warehouse-content-top-name-sample">{item.name}</h2>
                    <p className="warehouse-content-top-price-sample">{item.price?.toLocaleString('vi-VN')} đ</p>
                    <div className="warehouse-content-bottom-sample">
                    Thời gian cập nhật gần nhất {item.updatedAt!=null?handleTime(item.updatedDate):handleTime(item.createdDate)}
                  </div>
                  </div>
                  <div className="warehouse-content-top-center">
                    <img
                      src={item.images}
                      alt=""
                      className="warehouse-content-top-center-image"
                    />
                  </div>
                  <Dropdown className="dropdown-hover-update-inventory">
                    <Dropdown.Toggle variant="null"  bsPrefix="header-login">
                        <div className="icon-update">
                              <img src={icondot} alt="" className="warehouse-content-top-dot" />
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="drop-width">
                      <Dropdown.Item className="bordered-item-warehouse"  data-bs-toggle="modal"
                        data-bs-target="#exampleModal12" onClick={()=>openModal(item)}>Cập nhật khác</Dropdown.Item>
                      <Dropdown.Item  className="bordered-item-warehouse" onClick={()=>handleDelete(item.id)}>Xóa</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SampleUpdate;
