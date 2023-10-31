// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import add from "../assets/icon/add.svg";
// import "../assets/style/components/create.scss";
// function UpdateInventory({data}) {
//   const [imagePreview, setImagePreview] = useState(data?.images);
//   const [showModal, setShowModal] = useState(false);
//   const userAuth = JSON.parse(localStorage.getItem("userAuth"));
//   const baseURL = import.meta.env.VITE_API_URL;
//   const yourConfig = {
//     headers: {
//       Authorization: "Bearer " + userAuth?.token
//     }
//   };
//   const [nameInventory, setNameInventory] = useState(data?.name);
//   const [price, setPrice] = useState(data?.price);
//   const [total, setTotal] = useState(data?.total);
//   const [used, setUsed] = useState(data?.used);
//   const [idInventoryCategory, setIdInventoryCategory] = useState(data?.inventoryCategoryId);
//   const [category,setCategory] =useState([{}]);
//   useEffect(() => { 
//     axios.get(baseURL+`api/InventoryCategory/GetAllInventoryCategory`,yourConfig).then((res) => {
//       setCategory(res.data);
//       setIdInventoryCategory(res.data[0].id);
//     }).catch((err) => {
//       console.log(err);
//     });
//     setNameInventory(data?.name);
//     setPrice(data?.price);
//     setTotal(data?.total);
//     setUsed(data?.used);
//     setIdInventoryCategory(data?.inventoryCategoryId);
//     setImagePreview(data?.images);
//   }, [data]);
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       const reader = new FileReader();

//       reader.onload = (e) => {
//         setImagePreview(e.target.result);
//         setShowModal(false); // Ẩn modal sau khi tải ảnh lên
//       };

//       reader.readAsDataURL(file);
//     }
//   };
//   const handleDeleteImage = () => {
//     setImagePreview(null); // Xoá ảnh bằng cách cài đặt giá trị null
//     setShowModal(true); // Hiển thị modal sau khi xoá ảnh
//   };
//   const handleUpdate=()=>{
//     const body={
//       "id":data?.id,
//       "inventoryCategoryId": idInventoryCategory,
//       "name": nameInventory,
//       "describe": "",
//       "images": imagePreview,
//       "price": price?parseInt(price, 10):0,
//       "total": total?parseInt(total, 10):0,
//       "used": used?parseInt(used, 10):0
//     }
//     axios.put(`${baseURL}api/Inventory/UpdateInventory`,body,yourConfig)
//     .then((res)=>{
//       window.location.reload();
//     })
//     .catch((err)=>{
//       console.log(err);
//     })
//   };
//   console.log("==============================")
//   console.log(nameInventory,imagePreview)
//   console.log("==============================")
//   return (
//     <div className="create" key={data?.id}>
      
//       <div
//         className="modal fade"
//         id="exampleModal1"
//         tabIndex="-1"
//         aria-labelledby="exampleModalLabel1"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-body">
//               <h3 className="warehouse-model-title">Cập nhật nguyên liệu</h3>
//               <div className="warehouse-model-img">
//                 {imagePreview && (
//                   <div className="position-relative">
//                     <div className="warehouse-model-updaload">
//                       <img
//                         src={imagePreview}
//                         alt="Preview"
//                         className="warehouse-model-photo"
//                       />
//                     </div>
//                     <button
//                       className="closes position-absolute"
//                       onClick={handleDeleteImage}
//                     >
//                       <i className="fa-regular fa-circle-xmark"></i>
//                     </button>
//                   </div>
//                 )}
//                 {showModal && (
//                   <div className="modal-load">
//                     <input
//                       type="file"
//                       id="loadimg1"
//                       accept="image/*"
//                       onChange={handleImageChange}
//                       className="d-none"
//                     />
//                     <label htmlFor="loadimg1" className="upload-load">
//                       Tải ảnh
//                     </label>
//                   </div>
//                 )}
//               </div>
//               <div className="warehouse-model-name">
//                 <div className="d-flex">
//                   <h2 className="model-names m-0">Tên:</h2>
//                   <input
//                     type="text"
//                     className="warehouse-model-input w-100"
//                     placeholder="Nhập tên"
//                     value={nameInventory}
//                     onChange={(e) => setNameInventory(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <div className="warehouse-model-line width-line"></div>
//               <ul className="warehouse-model-menu">
//                 <li className="warehouse-model-item" someAttribute={true}>
//                   <div className="d-flex">
//                     <div className="width-label">
//                       <strong className="text-dark"> Loại: </strong>{" "}
//                     </div>
//                     <select
//                       id="selectInput"
//                       className="warehouse-model-input"
//                       value={idInventoryCategory}
//                       onChange={(e) => setIdInventoryCategory(e.target.value)}
//                     >
//                       {
//                         category.map((item,index)=>{
//                           return(
//                             <option key={index} value={item.id}>{item.name}</option>
//                           )
//                         })
//                       }
//                     </select>
//                   </div>
//                 </li>
//                 <li className="warehouse-model-item" someAttribute={true}>
//                   <div className="d-flex">
//                     <div className="width-label">
//                       <strong className="text-dark width-label">Đơn Giá: </strong>{" "}
//                     </div>
//                     <span>
//                       {" "}
//                       <input
//                         type="number"
//                         className="warehouse-model-input w-100  "
//                         placeholder="Nhập đơn giá"
//                         value={price}
//                         onChange={(e) => setPrice(e.target.value)}
//                       />
//                     </span>
//                   </div>
//                 </li>
//                 <li className="warehouse-model-item" someAttribute={true}>
//                   <div className="d-flex">
//                     <div className="width-label">
//                       <strong className="text-dark width-label">Tổng: </strong>{" "}
//                     </div>
//                     <input
//                       type="number"
//                       className="warehouse-model-input"
//                       placeholder="Nhập tổng số lượng trong kho"
//                       value={total}
//                       onChange={(e) => setTotal(e.target.value)}
//                     />
//                   </div>
//                 </li>
//                 <li className="warehouse-model-item" someAttribute={true}>
//                   <div className="d-flex">
//                     <div className="width-label">
//                       <strong className="text-dark width-label"> Đã sử dụng: </strong>{" "}
//                     </div>
//                     <input
//                       type="number"
//                       className="warehouse-model-input"
//                       placeholder="Nhập số lượng đã sự dụng"
//                       defaultValue={0}
//                       value={used}
//                       onChange={(e) => setUsed(e.target.value)}
//                     />
//                   </div>
//                 </li>
//               </ul>
//               <div className="text-end">
//                 <button type="button" className="warehouse-model-btn" onClick={handleUpdate}>
//                   Cập nhật
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UpdateInventory;

import React from "react";

function UpdateInventory ({ close }) 
{
  return
    (
    <div className="modal">
      <a className="close" onClick={close}>
        &times;
      </a>
      <div className="header"> Modal Title </div>
      <div className="content">
        {" "}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
        Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
        delectus doloremque, explicabo tempore dicta adipisci fugit amet
        dignissimos?
        <br />
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
        commodi beatae optio voluptatum sed eius cumque, delectus saepe
        repudiandae explicabo nemo nam libero ad, doloribus, voluptas rem alias.
        Vitae?
      </div>
    </div>
  );
}
export default UpdateInventory