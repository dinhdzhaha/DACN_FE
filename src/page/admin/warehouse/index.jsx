import React, { useState,useEffect } from "react";
import axios from "axios";
import "../../../assets/style/admin/warehouse/warehouse.scss";
import icondot from "../../../assets/icon/icondot.svg";
import Dropdown from 'react-bootstrap/Dropdown';
import { showToastMessageError,showToastMessageSuccess } from "../../../components/toast";
import UpdateInventory from "../../../components/updateInventory";

function Warehouse() {
  const userAuth = JSON.parse(localStorage.getItem("userAuth"));
  const baseURL = import.meta.env.VITE_API_URL;
  const yourConfig = {
    headers: {
      Authorization: "Bearer " + userAuth?.token
    }
  };
  const [selection,setSelection]=useState(0);
  const [category,setCategory] =useState([{}]);
  const [dataInventory,setDataInventory] = useState([{}]);
  const [dataInventoryInit,setDataInventoryInit] = useState([{}]);
  useEffect(() => { 
    axios.get(baseURL+`api/InventoryCategory/GetAllInventoryCategory`,yourConfig).then((res) => {
      setCategory(res.data);
    }).catch((err) => {
      console.log(err);
    });

    axios.get(baseURL+`api/Inventory/GetAllInventory`,yourConfig).then((res) => {
      setDataInventoryInit(JSON.parse(JSON.stringify(res.data)));
      setDataInventory(res.data);
    }).catch((err) => {
      console.log(err);
    });
  },[]);
  const [isUpdates,setIsUpdate]= useState([]);
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
  console.log('handleCance');

  const handleCancel=(item)=>{
    setIsUpdate((isUpdates)=>{
      return isUpdates.filter(c=>c!=item.id);
    });
    console.log('handleCance');
    setDataInventory((dataInventory)=>{
      const index=dataInventory.findIndex(c=>c.id==item.id);
      console.log(dataInventoryInit[index]);
      console.log(dataInventory[index]);
      const data=dataInventory;
      data[index].total=dataInventoryInit[index].total;
      data[index].used=dataInventoryInit[index].used;
      return data;
    });
    console.log('handleCance');

  };
  const handleSubmit=(id)=>{
    const body=dataInventory.filter(c=>c.id==id);
    const bodyParam={
      "id": body[0].id,
      "inventoryCategoryId": body[0].inventoryCategoryId,
      "name": body[0].name,
      "describe": body[0].describe,
      "images": body[0].images,
      "price": body[0].price,
      "total": body[0].total,
      "used": body[0].used,
    };
    axios.put(baseURL+`api/Inventory/UpdateInventory`,bodyParam,yourConfig).then((res) => {
      setIsUpdate((isUpdates)=>{
        return isUpdates.filter(c=>c!=id);
      });
      const index=dataInventory.findIndex(c=>c.id==id);
      setDataInventoryInit((dataInventoryInit)=>[
        ...dataInventoryInit.slice(0, index), // Copy elements before the index
        JSON.parse(JSON.stringify(res.data)), // Add the new item
        ...dataInventoryInit.slice(index+1)]);
      setDataInventory((dataInventory)=>[
        ...dataInventory.slice(0, index), // Copy elements before the index
        res.data, // Add the new item
        ...dataInventory.slice(index+1) // Copy elements after the index
      ]);
      showToastMessageSuccess("Cập nhật thành công!");
    }).catch((err) => {console.error(err);showToastMessageError(err.response.data.detail);});
  };
  const handleDelete=(id)=>{
    axios.delete(baseURL+`api/Inventory/DeleteInventory?id=${id}`,yourConfig).then((res) => {
      setDataInventory((dataInventory)=>{
        return dataInventory.filter(c=>c.id!=id);
      });
      setDataInventoryInit((dataInventory)=>{
        return dataInventory.filter(c=>c.id!=id);
      });
      showToastMessageSuccess("Xóa thành công!");
    }).catch((err) => {console.error(err);showToastMessageError(err.response.data.detail);});
  };
  const [selectedObject, setSelectedObject] = useState(null);

  const openModal = (object) => {
    setSelectedObject(object);
  };

  const closeModal = () => {
    setSelectedObject(null);
  };
  return (
    <div className="warehouse">
      {selectedObject && (
        <UpdateInventory data={selectedObject} onClose={closeModal}></UpdateInventory>
      )}
      <div className="warehouse-select">
      <ul className="nav nav-pills" id="pills-tab" role="tablist">
          <li li className="nav-item" someAttribute={true} >
            <button
              className={selection==0?"nav-link active warehouse-text selected":"nav-link active warehouse-text"}
              onClick={()=>{setSelection(0);setDataInventory(dataInventoryInit);}}
            >
              Tất cả
            </button>
          </li>
        {category.map((item, index) => (
          <li className="nav-item" key={index} someAttribute={true}>
            <button
              className={selection==item.id?"nav-link active warehouse-text selected":"nav-link active warehouse-text"}
              onClick={()=>{setSelection(item.id);setDataInventory(dataInventoryInit.filter(c=>c.inventoryCategoryId==item.id));}}
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
                dataInventory.map((item,index)=>(
                <div className="warehouse-content-box bg-white" key={index}>
                <div className="warehouse-content-top d-flex  justify-content-between">
                  <div className="warehouse-content-top-left">
                    <h2 className="warehouse-content-top-name">{item.name}</h2>
                    <p className="warehouse-content-top-price">Đơn giá:  {item.price?.toLocaleString('vi-VN')}đ</p>
                    <div className="warehouse-content-top-quantity">
                      <div className="warehouse-content-top-group-total d-flex justify-content-between align-items-center ">
                        <div>
                            <label className="warehouse-content-top-total">
                              Tổng:
                            </label>
                            <input
                              type="number"
                              id="warehouse-content-top-total"
                              className="warehouse-content-top-number total"
                              value={item.total}
                              onChange={(e)=>{
                                setIsUpdate((isUpdates)=>
                                {
                                  if(!isUpdates.includes(item.id))
                                    return ([...isUpdates,item.id])
                                  else return isUpdates;
                                });
                                setDataInventory((dataInventory)=>{
                                  const index=dataInventory.findIndex(c=>c.id==item.id);
                                  const number=e.target.value;
                                  dataInventory[index].total=number;
                                  return [...dataInventory];
                                });}}
                            />
                          </div>
                          <div className="d-flex flex-column ">
                              <i className="fa-solid fa-chevron-up width-icon" onClick={()=>{
                                setIsUpdate((isUpdates)=>
                                {
                                  if(!isUpdates.includes(item.id))
                                    return ([...isUpdates,item.id])
                                  else return isUpdates;
                                });
                                setDataInventory((dataInventory)=>{
                                  const index=dataInventory.findIndex(c=>c.id==item.id);
                                  const number=dataInventory[index].total+1;
                                  dataInventory[index].total=number;
                                  return [...dataInventory];
                                });}}></i>
                              <i className="fa-solid fa-chevron-down width-icon" ></i>
                          </div>
                        </div>
                        <div className="warehouse-content-top-group d-flex justify-content-between align-items-center">
                          <div>
                            <label className="warehouse-content-top-used">
                              Đã sử dụng:
                            </label>
                            <input
                              type="number"
                              id="warehouse-content-top-used"
                              className="warehouse-content-top-number"
                              value={item.used}
                              onChange={(e)=>{
                                setIsUpdate((isUpdates)=>
                                {
                                  if(!isUpdates.includes(item.id))
                                    return ([...isUpdates,item.id])
                                  else return isUpdates;
                                });
                                setDataInventory((dataInventory)=>{
                                  const index=dataInventory.findIndex(c=>c.id==item.id);
                                  const number=e.target.value;
                                  if(number>item.total)
                                  {
                                    alert("Số lượng đã sử dụng không được lớn hơn số lượng tổng");
                                    return [...dataInventory];
                                  }
                                  dataInventory[index].used=number;
                                  return [...dataInventory];
                                });}}
                            />
                          </div>
                          <div className="d-flex flex-column ">
                              <i className="fa-solid fa-chevron-up width-icon" onClick={()=>{
                                setIsUpdate((isUpdates)=>
                                {
                                  if(!isUpdates.includes(item.id))
                                    return ([...isUpdates,item.id])
                                  else return isUpdates;
                                });
                                setDataInventory((dataInventory)=>{
                                  const index=dataInventory.findIndex(c=>c.id==item.id);
                                  const number=dataInventory[index].used+1;
                                  if(number>item.total)
                                  {
                                    alert("Số lượng đã sử dụng không được lớn hơn số lượng tồn kho");
                                    return [...dataInventory];
                                  }
                                  dataInventory[index].used=number;
                                  return [...dataInventory];
                                });}}></i>
                              <i className="fa-solid fa-chevron-down width-icon" onClick={()=>{
                                setIsUpdate((isUpdates)=>
                                {
                                  if(!isUpdates.includes(item.id))
                                    return ([...isUpdates,item.id])
                                  else return isUpdates;
                                });
                                setDataInventory((dataInventory)=>{
                                  const index=dataInventory.findIndex(c=>c.id==item.id);
                                  const number=dataInventory[index].used-1;
                                  if(number>=0)
                                  {
                                    if(number>item.total)
                                    {
                                      alert("Số lượng đã sử dụng không được lớn hơn số lượng tổng");
                                      return [...dataInventory];
                                    }
                                    dataInventory[index].used=number;
                                  }
                                  return [...dataInventory];
                                });}}></i>
                          </div>
                        </div>
                        <div className="warehouse-content-top-group-remaining">
                          <label className="warehouse-content-top-remaining-id">
                            Còn lại:
                          </label>
                          <input
                            type="number"
                            id="warehouse-content-top-remaining-id"
                            className="warehouse-content-top-remaining-input warehouse-content-top-number text-white"
                            value={item?.total - item?.used}
                            readOnly
                            defaultValue={0}
                          />
                        </div>
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
                        data-bs-target="#exampleModal1" onClick={() => openModal(item)}>Cập nhật khác</Dropdown.Item>
                      <Dropdown.Item  className="bordered-item-warehouse" onClick={()=>handleDelete(item.id)}>Xóa</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="d-flex flex-row">
                  <div className="warehouse-content-bottom">
                    Thời gian cập nhật gần nhất {item.updatedAt!=null?handleTime(item.updatedDate):handleTime(item.createdDate)}
                  </div>
                  <button className="btn-cancel-admin" hidden={!isUpdates.includes(item.id)} onClick={()=>handleCancel(item)}>
                    Hủy
                  </button>
                  <button  hidden={!isUpdates.includes(item.id)} className={"btn-update-admin" } onClick={()=>handleSubmit(item.id)}>
                    Cập nhật
                  </button>
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

export default Warehouse;
