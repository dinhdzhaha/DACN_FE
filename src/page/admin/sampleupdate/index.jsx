import React, { useState,useEffect } from "react";
import axios from "axios";
import "../../../assets/style/custom/sample/sampleUpdate.scss";
import icondot from "../../../assets/icon/icondot.svg";
import Dropdown from 'react-bootstrap/Dropdown';
import { showToastMessageError,showToastMessageSuccess } from "../../../components/toast";
import UpdateSample from "../../../components/updateSample";
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
  const [data,setData]=useState(null);
  const handleUpdate=(item)=>{
    setData(item);
  }
  return (
    <div className="warehouse">
      <div className="warehouse-select">
      <ul className="nav nav-pills" id="pills-tab" role="tablist">
          <li li className="nav-item" someAttribute={true} >
            <button
              className={selection==0?"nav-link active warehouse-text selected":"nav-link active warehouse-text"}
              onClick={()=>{setSelection(0);setSamples(samplesInit);}}
            >
              Tất cả
            </button>
          </li>
        {category.map((item, index) => (
          <li className="nav-item" key={index} someAttribute={true}>
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
                  <UpdateSample data={item}></UpdateSample>

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
                        data-bs-target="#exampleModal12" onClick={()=>handleUpdate(item)}>Cập nhật khác</Dropdown.Item>
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
