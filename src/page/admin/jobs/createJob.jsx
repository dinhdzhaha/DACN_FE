import React  from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState,useEffect, useRef,useCallback } from "react";
import { showToastMessageError,showToastMessageSuccess } from "../../../components/toast";
import "../../../assets/style/admin/account/account.scss";
import update from "../../../assets/icon/update.svg";
import { parse, differenceInDays, format, parseISO } from "date-fns";
import { Label } from "@mui/icons-material";
import Modal from 'react-modal';
import remove from "../../../assets/icon/removeSample.svg";
import ModalUser from "../../../components/modalUser";
import Album from "../../../components/ablumPhoto";
import addImage from "../../../assets/icon/add-image-svgrepo-com.svg";
import {useDropzone} from 'react-dropzone'
import { useNavigate } from 'react-router-dom';


function UpdateJob() {
  //#region Info User
    const [load,setLoad]= useState(false);
    const nRef = useRef();
    const eRef = useRef();
    const pRef = useRef();
    const adRef = useRef();
    const nPRef = useRef();
    const bRef=useRef();
    const neckCircumferenceRef=useRef();
    const checkCircumferenceRef=useRef();
    const waistCircumferenceRef=useRef();
    const buttCircumferenceRef=useRef();
    const underarmCircumferenceRef=useRef();
    const shoulderWidthRef=useRef();
    const armCircumferenceRef=useRef();
    const sleeveLengthRef=useRef();
    const cuffCircumferenceRef=useRef();
    const shirtLengthRef=useRef();
    const thighCircumferenceRef=useRef();
    const bottomCircumferenceRef=useRef();
    const pantLengthRef=useRef();
    const kneeHeightRef=useRef();
    const pantLegWidthRef=useRef();
    const [name,setName]=useState("");
    const userAuth = JSON.parse(localStorage.getItem("userAuth"));
    const baseURL = import.meta.env.VITE_API_URL;
    const yourConfig = {
      headers: {
          Authorization: "Bearer " + userAuth?.token
      }
    };
    const [useData,setUseData]=useState(null);
    const [hidden,setHidden]=useState(false);
    const [hiddenOther,setHiddenOther]=useState(false);
    const [useStateData,setUseStateData]=useState({});
    const [isActiveInfo,setIsActiveInfo]=useState(true);
    const [isActiveOtherInfo,setIsActiveOtherInfo]=useState(true);
    const [birthDay,setBirthDay]=useState("");
    const handleHidden=()=>{setHidden(!hidden);};
    const [productCategoryId,setProductCategoryId]=useState(0);
    const handleHiddenOther=()=>{setHiddenOther(!hiddenOther);};
    const handleName=(event)=>
    {
      const arrayStr=event.target.value.split(" ");
      const name=arrayStr.length==0?"":arrayStr[arrayStr.length-1];
      let firstName="";
      arrayStr.forEach((element,index) => {
        if(index<arrayStr.length-2)
        {
          firstName+=element+" ";
        }
        else if(index==arrayStr.length-2)
        {
          firstName+=element;
        }
      });;
      setUseData(useData=>({...useData,firstName:firstName,lastName:name}));
      setName(event.target.value);
      setIsActiveInfo(false);
    }
    const handleSubmit=()=>{
      if(!isActiveInfo)
      {
        if(useData?.firstName.length===0){
            showToastMessageError("Họ và tên không được để trống!");
            nPRef.current.focus();
            return;
        }
        else if(useData?.email.length===0){
            showToastMessageError("Email không được để trống!");
            eRef.current.focus();
            return;
        }
        else if(useData?.phone.length===0){
            showToastMessageError("Số điện thoại không được để trống!");
            pRef.current.focus();
            return;
        }
        else if(useData?.address.length===0){
            showToastMessageError("Địa chỉ không được để trống!");
            adRef.current.focus();
            return;
        }
        else if(useData?.birthDay.length===0){
          showToastMessageError("Ngày sinh không được để trống!");
          bRef.current.focus();
          return;
        }
      }
      if(!isActiveOtherInfo)
      {
        if(useData?.neckCircumference===""){
          showToastMessageError("Vòng cổ không được để trống!");
          neckCircumferenceRef.current.focus();
          return;
        }
        else if(useData?.checkCircumference==="") 
        {
          showToastMessageError("Vòng ngực không được để trống!");
          checkCircumferenceRef.current.focus();
          return;
        }
        else if(useData?.waistCircumference==="")  {
          showToastMessageError("Vòng eo không được để trống!");
          waistCircumferenceRef.current.focus();
          return;
        }
        else if(useData?.buttCircumference==="")  {
          showToastMessageError("Vòng mông không được để trống!");
          buttCircumferenceRef.current.focus();
          return;
        }
        else if(useData?.underarmCircumference==="")  {
          showToastMessageError("Vòng nách không được để trống!");
          underarmCircumferenceRef.current.focus();
          return;
        }
        else if(useData?.shoulderWidth==="")  {
          showToastMessageError("Rộng vai không được để trống!");
          shoulderWidthRef.current.focus();
          return;
        }
        else if(useData?.armCircumference==="")  {
          showToastMessageError("Bắp tay không được để trống!");
          armCircumferenceRef.current.focus();
          return;
        }
        else if(useData?.sleeveLength==="")  {
          showToastMessageError("Dài tay không được để trống!");
          sleeveLengthRef.current.focus();
          return;
        }
        else if(useData?.cuffCircumference==="")  {
          showToastMessageError("Cửa tay không được để trống!");
          cuffCircumferenceRef.current.focus();
          return;
        }
        else if(useData?.shirtLength==="")  {
          showToastMessageError("Dài áo không được để trống!");
          shirtLength.current.focus();
          return;
        }
        else if(useData?.thighCircumference==="")  {
          showToastMessageError("Vòng đùi không được để trống!");
          thighCircumferenceRef.current.focus();
          return;
        }
        else if(useData?.bottomCircumference==="")  {
          showToastMessageError("Vòng đáy không được để trống!");
          bottomCircumferenceRef.current.focus();
          return;
        }
        else if(useData?.pantLength==="")  {
          showToastMessageError("Dài quần không được để trống!");
          pantLengthRef.current.focus();
          return;
        }
        else if(useData?.kneeHeight==="")  {
          showToastMessageError("Hạ gối không được để trống!");
          kneeHeightRef .current.focus();
          return;
        }
        else if(useData?.pantLegWidth==="")  {
          showToastMessageError("Ống quần không được để trống!");
          pantLegWidthRef .current.focus();
          return;
        }

      }
      

      setLoad(true);
      
      const config = yourConfig;
      
      const bodyParameters = {...useData};
      axios.put(baseURL+`api/Users/UpdateUser`,bodyParameters,config).then((res) => {
          setUseStateData(res.data);
          const date = new Date(res.data.birthDay);
          setBirthDay(format(date, 'yyyy-MM-dd'));
          setLoad(false);
          setIsActiveInfo(true);
          setIsActiveOtherInfo(true);
          showToastMessageSuccess("Cập nhật thành công!");
      }).catch((err) => {
          setLoad(false);
          setIsActiveInfo(false);
          setIsActiveOtherInfo(false);
          showToastMessageError(err.response.data.detail);
      });
    }
    const handleCancel= ()=>{
        setIsActiveInfo(true);
        setUseData(useStateData);
        setName(useStateData.firstName+" "+useStateData.lastName);
    };
    const handleCancelOther= ()=>{
      setIsActiveOtherInfo(true);
      setUseData(useStateData);
    };
    const handleCheckboxChange= ()=>{
      setIsUseCloth(!isUseCloth);
    };
  //#endregion
    const [photos, setPhotos]=useState([]);
  //#region Info Task
    const [content, setContent] = useState('');
    const [note, setNote] = useState('');
    const [isUseCloth,setIsUseCloth]=useState(false);
    const [endTime,setEndTime]=useState('');
    const [startTime,setStartTime]=useState('');
    const [nameTask,setNameTask]=useState('');
    const [sampleTask,setSampleTask]=useState(null);
    const [price,setPrice]=useState('');
    const [image,setImage]=useState(null);

  //endregion
  const handleTime=(utcDateStr) => {
    console.log("handleTime",utcDateStr);
    const localDate = new Date(); // Ngày hiện tại ở múi giờ cục bộ
    const utcDate = parse(utcDateStr, "yyyy-MM-dd", new Date()); // Chuyển đổi ngày UTC từ chuỗi
    const result=differenceInDays(utcDate, localDate);
    return result;
  };
  const timeRef=useRef();
  const endRef=useRef();
  const priceRef=useRef();
  const nameRef=useRef();
  const navigate=useNavigate();
  const [samples,setSamples] = useState([{}]);
  const [samplesInit,setSamplesInit] = useState([{}]);
  const [category,setCategory] =useState([{}]);
  const [selection1,setSelection1]=useState(0);
  const [priceCloth, setPriceCloth]=useState(0);
  const [noteCloth, setNoteCloth]=useState("");
  useEffect(() => { 
    axios.get(baseURL+`api/Sample/GetSamples`,yourConfig).then((res) => {
      setSamplesInit(res.data);
      setSamples(res.data);
        }).catch((err) => {
            console.log(err);
        });

    axios.get(baseURL+`api/ProductCategory/GetAllProductCategory`,yourConfig).then((res) => {
      setCategory(res.data);
      setProductCategoryId(res.data[0].id);
      }).catch((err) => {
          console.log(err);
      });
  },[]);
  //endregion

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = (data) => {
      setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleClickSample=(id)=>
  {
    setModalIsOpen(false);
    setSampleTask(samples.find(c=>c.id==id));
    setPrice(samples.find(c=>c.id==id).price);
    setProductCategoryId(samples.find(c=>c.id==id).productCategoryId);
  }
  const [modalIsOpen1, setModalIsOpen1] = useState(false);
  const openModal1 = (data) => {
      setModalIsOpen1(true);
  };

  const closeModal1 = () => {
    setModalIsOpen1(false);
  };
  const handleClickSample1=(id)=>
  {
    setModalIsOpen1(false);
  }
  const [showModal, setShowModal] = useState(true);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImage(e.target.result);
        setShowModal(false); // Ẩn modal sau khi tải ảnh lên
      };

      reader.readAsDataURL(file);
    }
  };
  const handleDeleteImage = () => {
    setImage(null); // Xoá ảnh bằng cách cài đặt giá trị null
    setShowModal(true); // Hiển thị modal sau khi xoá ảnh
  };
  const handleCreate=()=>{
    if(endTime<startTime) {
      showToastMessageError("Thời gian kết thúc phải lớn hơn thời gian bắt đầu!");
      timeRef.current.focus();
      return;
    }
    if(startTime==="" )
    {
      showToastMessageError("Thời gian bắt đầu không được để trống!");
      timeRef.current.focus();
      return;
    }
    if(endTime==="" )
    {
      showToastMessageError("Thời gian kết thúc không được để trống!");
      endRef.current.focus();
      return;
    }
    if(nameTask==="")
    {
      showToastMessageError("Tên sản phẩm không được để trống!");
      nameRef.current.focus();
      return;
    }
    if(price==="")
    {
      showToastMessageError("Giá tiền không được để trống!");
      priceRef.current.focus();
      return;
    }

    if(useData===null)
    {
      showToastMessageError("Bạn chưa chọn khách hàng!");
      return;
    }
    let body=
    {
      "productCategoryId": productCategoryId,
      "name": nameTask,
      "images": image??"",
      "price": price,
      "note": "",
      "noteCloth": noteCloth??"",
      "priceCloth": priceCloth??0,
      "description": "",
    }
    let productId=0;
    axios.post(baseURL+`api/Product/CreateProduct`,body,yourConfig).then((res) => {
      productId=res.data.id;
      body={
        "userId": useData?.id,
        "sampleId": sampleTask?.id,
        "productId": productId,
        "content": content??"",
        "status": "todo",
        "startTime": startTime,
        "endTime": endTime,
        "priority": 0,
        "index": 0,
        "isUseCloth": isUseCloth,
        "note": note,
        "percent": 0
      }
      axios
        .post(baseURL + `api/Task/CreateTask`, body, yourConfig)
        .then((taskRes) => {
          showToastMessageSuccess("Tạo công việc thành công!"); 
          navigate(`/updateJob/${taskRes.data.id}`);
        })
        .catch((error) => {
          showToastMessageError(error.response.data.detail);  });
      photos.map((item,index)=>{
        body={
          productId: productId,
          linkImage: item.src
        };
        axios.post(baseURL+`api/ImageProductControl/CreateImage`,body,yourConfig).then((imageRes) => {
        }).catch((err) => {
        });
      })
    }).catch((err) => {
      showToastMessageError(error);
    });
  }
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    let listResult=[];
    acceptedFiles.forEach((file) => {
        const reader = new FileReader();
  
        reader.onload = (e) => {
          const dataUrl = e.target.result;
          setPhotos((props)=>[...props,{
              src: dataUrl,
              width: 220,
              height: 200
              }]);
          // Store the data URL in your listFiles array
        };
        reader.readAsDataURL(file);
    });
    // Now listFiles contains an array of data URLs for your image files
  }, []);
  console.log(photos);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,accept: {
    'image/jpeg': [],
    'image/png': [],
    'image/webp': [],
    'image/heic': [],
    'image/jfif': [],
  },});
  return (
    <div>
      <Modal
      ariaHideApp={false}
      isOpen={modalIsOpen1}
      onRequestClose={closeModal1}
      closeAfterTransition
      className='modal-2'
      >
        <ModalUser CloseModal1={closeModal1} SetUseData={setUseData} SetUseStateData={setUseStateData} SetBirthDay={setBirthDay} SetName={setName}></ModalUser>
      </Modal>
      <Modal
      ariaHideApp={false}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      closeAfterTransition
      className='modal-2'
      >
      <div className="warehouse-select">
      <ul className="nav nav-pills" id="pills-tab" role="tablist">
          <li className="nav-item"  >
            <button
              className={selection1==0?"nav-link active warehouse-text selected":"nav-link active warehouse-text"}
              onClick={()=>{setSelection1(0);setSamples(samplesInit);}}
            >
              Tất cả
            </button>
          </li>
        {category.map((item, index) => (
          <li className="nav-item" key={index} >
            <button
              className={selection1==item.id?"nav-link active warehouse-text selected":"nav-link active warehouse-text"}
              onClick={()=>{setSelection1(item.id);setSamples(samplesInit.filter(c=>c.productCategoryId==item.id));}}
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
                  
                <div className="warehouse-content-box bg-white cursor" key={index} onClick={()=>{handleClickSample(item.id);}}>

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
                </div>
              </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </Modal>
    <div className="account">
      <div className="d-flex mb-2">
        <nav aria-label="breadcrumb" className="width-40">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link
                to="/admin"
                className="breadcrumb-account text-decoration-none p-0"
              >
                Công việc
              </Link>
            </li>
            <li
              className="breadcrumb-item breadcrumb-account p-0"
              aria-current="page"
            >
              Tạo công việc
            </li>
          </ol>
        </nav>
        <div className="d-flex justify-content-end align-items-center btn-create-scss">
              <button className="btn-create" onClick={handleCreate}>
                Tạo mới
              </button>
        </div>
      </div>
      <div className="account-body d-flex ps-3 pe-3">
        <div>
          <div className="account-info margin-0 bottom">
            <button className="btn-show" hidden={!isActiveInfo} onClick={openModal1}>
              Chọn khác hàng
            </button>
          </div>
          {
            useData!=null &&
            (
              hidden?
              <div className="account-info margin-0 bottom">
                <div className="account-info-avatar-name">
                  <div className="text-end justify-content-start w-100 d-flex">
                    <h2 className="account-other-information-measurements">
                      Thông tin khách hàng
                    </h2>
                  </div>
                  <div className="account-info-avatar text-center">
                    <img
                      src={useData?.avatar}
                      className="account-info-photo"
                      alt=""
                    />
                    <div className="account-info-name">{useData?.firstName+" " + useData?.lastName}</div>
                  </div>
                </div>
                <button className="btn-show" hidden={!isActiveInfo} onClick={handleHidden}>
                  Hiện thị thông tin Tài khoản
                </button>
              </div>
              :
              <div className="account-info margin-0 bottom">
                <div className="text-end justify-content-start w-100 d-flex">
                  <h2 className="account-other-information-measurements">
                    Thông tin khách hàng
                  </h2>
                </div>
                <div className="account-info-avatar-name">
                  <div className="account-info-avatar text-center">
                    <img
                      src={useData?.avatar}
                      className="account-info-photo"
                      alt=""
                    />
                    <div className="account-info-name">{useData?.firstName+" " + useData?.lastName}</div>
                  </div>
                </div>
                <div className="account-info-detail">
                  <h4 className="account-info-text">Chi tiết</h4>
                  <div className="account-info-gach"></div>
                  <div className="account-info-personal-information bottom">
                    <div className="width-30"><strong >Họ và Tên:</strong> </div>
                    <input  type="text"
                            value={name}  
                            placeholder="Họ và Tên" 
                            className="account-info-input width-60"
                            onChange={handleName}
                            ref={nRef}
                            ></input>
                  </div>
                  <div className="account-info-personal-information bottom">
                  <div className="width-30"><strong>Số điện thoại:</strong></div>
                    <input  type="number"
                            value={useData?.phone}
                            placeholder="Số điện thoại"
                            className="account-info-input width-60"
                            onChange={(event) => {setUseData(useData=>({...useData,phone:event.target.value}));setIsActiveInfo(false);}}
                            ref={pRef}
                    ></input>
                  </div>
                  <div className="account-info-personal-information bottom">
                    <div className="width-30"><strong>Địa chỉ:</strong></div>
                    <input
                            type="text" 
                            value={useData?.address}
                            placeholder="Địa chỉ" 
                            className="account-info-input width-60"
                            onChange={(event) => {setUseData(useData=>({...useData,address:event.target.value}));setIsActiveInfo(false);}}
                            ref={adRef}
                            ></input>
                  </div>
                  <div className="account-info-personal-information bottom">
                    <div className="width-30"><strong>Ngày sinh: </strong></div>
                    <input 
                            type="date" 
                            value={birthDay}
                            className="account-info-input width-60"
                            onChange={(event) => {setUseData(useData=>({...useData,birthDay:event.target.value}));setIsActiveInfo(false);setBirthDay(event.target.value);}}
                            ref={bRef}
                            ></input>
                  </div>
                  <div className="text-end">
                    <button className="btn-cancel" hidden={isActiveInfo} onClick={handleCancel}>
                      Hủy
                    </button>
                    {isActiveInfo?
                    <button className="btn-cancel1" hidden={!isActiveInfo} onClick={handleHidden}>
                      Ẩn thông tin tài khoản
                    </button>
                    :<button className={isActiveInfo? "btn-update-non-active" :"btn-update" } onClick={handleSubmit} disabled={isActiveInfo || load}>Cập nhật</button>}
                  </div>
                </div>
            </div>
            )
          }
          <div className="account-info margin-0">
          <div className="text-end justify-content-start w-100 d-flex">
            <h2 className="account-other-information-measurements">
              Thông tin công việc
            </h2>
          </div>
            <div className="warehouse-model-img  d-flex align-items-center align-content-center justify-content-center">
                {image!=null && (
                  <div className="position-relative">
                    <div className="warehouse-model-updaload">
                      <img
                        src={image}
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
                {image==null &&showModal && (
                  <div className="modal-loa">
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
            <div className="account-info-sample bottom d-flex align-items-center top-10">
              <div className="width-15">
                <strong >Tên:</strong>
              </div>
              <input
                          type="text" 
                          value={nameTask}
                          placeholder="Tên sản phẩm" 
                          className={`account-info-input width-75`}
                          onChange={(event) => {setNameTask(event.target.value)}}
                          ref={nameRef}
                          ></input>
            </div>
            <div className="account-info-sample bottom d-flex align-items-center">
              <div className="width-15" >
                <strong >Mẫu:</strong>
              </div>
              <div className="account-info-input d-flex align-items-center width-75 cursor hover-scss" onClick={openModal}>
                  {sampleTask&&
                    <div className="jobs-staff width-15">
                      {
                      <img
                        src={sampleTask?.images}
                        alt=""
                      />
                      }
                    </div>
                  }
                  <div className="width-field two-line-ellipsis m-lg-1 width-75">
                    <div className="jobs-staff-name two-line-ellipsis align-items-center d-flex">
                      {
                        sampleTask!=null?<strong>{sampleTask.name}</strong>: <strong>Không</strong>
                      }
                    </div>
                  </div>
              </div>
              {sampleTask&&<img src={remove} className="margin-left-icon-remove cursor" onClick={()=>{setSampleTask(null); }}></img>}
            </div>
            <div className="account-info-sample bottom d-flex align-items-center">
              <div className="width-15">
                <strong >Tiền:</strong>
              </div>
                  <input
                  type="number" 
                  value={price}
                  placeholder="Giá tiền" 
                  className={`account-info-input width-75`}
                  onChange={(event) => {setPrice(event.target.value)}}
                  defaultValue={0}
                  ref={priceRef}
                  ></input>
              <div className="price">đ</div>
            </div>
            <div className="account-info-sample bottom d-flex align-items-center">
              <div className="width-15">
                <strong >Loại:</strong>
              </div>
              <select
              className={`account-info-input width-75 noBorder}`}
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
            {
              isUseCloth&&
              <div className="account-info-sample bottom d-flex align-items-center">
                <div className="width-15">
                  <strong >Tiền vải:</strong>
                </div>
                    <input
                    type="number" 
                    value={priceCloth}
                    placeholder="Giá tiền" 
                    className={`account-info-input width-75 noBorder`}
                    onChange={(event) => {setPriceCloth(event.target.value)}}
                    defaultValue={0}
                    ></input>
                <div className="price">đ</div>
              </div>
            }
            {
              isUseCloth&&
              <div className="account-info-sample bottom d-flex align-items-center">
                <div className="width-15">
                  <strong >Ghi chú thêm:</strong>
                </div>
                <textarea
                  value={noteCloth}
                  onChange={(e) => {setNoteCloth(e.target.value);}}
                  placeholder="Nhập ghi chú thêm..."
                  className={"contentTask scss-note-cloth cursor"}
                  cols={10}
                  rows={5}
                />
              </div>
            }
            <div className="account-info-time bottom d-flex align-items-center">
              <div className="w-48">
                <strong >Thời gian bắt đầu:</strong>
              </div>
              <input
                          type="date" 
                          value={startTime}
                          placeholder="Thời gian bắt đầu" 
                          className={`account-info-input w-45`}
                          onChange={(event) => { setStartTime(event.target.value);}}
                          ref={timeRef}
                          ></input>
            </div>
            <div className="account-info-time bottom d-flex align-items-center">
              <div className="w-48">
                <strong >Thời gian kết thúc:</strong>
              </div>
              <input
                          type="date" 
                          value={endTime}
                          placeholder="Thời gian kết thúc:" 
                          className={`account-info-input w-45`}
                          onChange={(event) => { 
                            setEndTime(event.target.value);
                          }}
                          ref={endRef}
                          ></input>
            </div>
          </div>
        </div>

        <div className="account-other-information">
        {useData==null?
          <div className="account-other-information-top bg-white p-1 bottom">
            <h2 className="account-other-information-measurements ps-3 scss-padding">
              Số đo cơ thể
            </h2>
        </div>
        :
          <div className="account-other-information-top bg-white p-1 bottom">
            <h2 className="account-other-information-measurements ps-3">
              Số đo cơ thể
            </h2>
            {hiddenOther? <div className="from-top"><button className="btn-show1" onClick={handleHiddenOther}>
                    Hiện thông tin số đo cơ thể
                  </button></div>:
            <form action="#" className="from">
              <div className="from-top">
                <div className="container-fluid h-100">
                  <div className="row h-100">
                    <div className="col-4 ps-0">
                      <div className="dasheds d-flex flex-column h-100 justify-content-between">
                        <div className="account-other-information-ring align-items-center">
                          <div className="account-other-information-group">
                            <label className="account-other-information-ring-label">
                              Vòng cổ
                            </label>
                            <input
                              type="number"
                              className="account-other-information-input"
                              value={useData?.neckCircumference}
                              onChange={(event) => {setUseData(useData=>({...useData,neckCircumference:event.target.value}));setIsActiveOtherInfo(false);}}
                              placeholder="Vòng cổ"
                              ref={neckCircumferenceRef}
                            />
                          </div>
                          <div className="account-other-information-group">
                            <label className="account-other-information-ring-label">
                              Vòng mông
                            </label>
                            <input
                              type="number"
                              className="account-other-information-input"
                              value={useData?.buttCircumference}
                              onChange={(event) => {setUseData(useData=>({...useData,buttCircumference:event.target.value}));setIsActiveOtherInfo(false);}}
                              placeholder="Vòng mông"
                              ref={buttCircumferenceRef}
                            />
                          </div>
                          <div className="account-other-information-group">
                            <label className="account-other-information-ring-label">
                              Bắp tay
                            </label>
                            <input
                              type="number"
                              className="account-other-information-input"
                              value={ useData?.armCircumference}
                              onChange={(event) => {setUseData(useData=>({...useData,armCircumference:event.target.value}));setIsActiveOtherInfo(false);}}
                              placeholder="Bắp tay"
                              ref={armCircumferenceRef}
                            />
                          </div>
                          <div className="account-other-information-group">
                            <label className="account-other-information-ring-label">
                              Dài áo
                            </label>
                            <input
                              type="number"
                              className="account-other-information-input"
                              value={useData?.shirtLength}
                              onChange={(event) => {setUseData(useData=>({...useData,shirtLength:event.target.value}));setIsActiveOtherInfo(false);}}
                              placeholder="Dài áo"
                              ref={shirtLengthRef}
                            />
                          </div>
                        </div>
                        <div className="account-other-information-ring align-items-center rings">
                          <div className="account-other-information-group">
                            <label className="account-other-information-ring-label">
                              Vòng đùi
                            </label>
                            <input
                              type="number"
                              className="account-other-information-input"
                              value={useData?.thighCircumference}
                              onChange={(event) => {setUseData(useData=>({...useData,thighCircumference:event.target.value}));setIsActiveOtherInfo(false);}}
                              placeholder="Vòng đùi"
                              ref={thighCircumferenceRef}
                            />
                          </div>
                          <div className="account-other-information-group">
                            <label className="account-other-information-ring-label">
                              Hạ gối
                            </label>
                            <input
                              type="number"
                              className="account-other-information-input"
                              value={useData?.kneeHeight}
                              onChange={(event) => {setUseData(useData=>({...useData,kneeHeight:event.target.value}));setIsActiveOtherInfo(false);}}
                              placeholder="Hạ gối"
                              ref={kneeHeightRef}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 ps-0">
                      <div className="dasheds d-flex flex-column h-100 justify-content-between">
                        <div className="account-other-information-ring align-items-center">
                          <div className="account-other-information-group">
                            <label className="account-other-information-ring-label">
                              Vòng ngực
                            </label>
                            <input
                              type="number"
                              className="account-other-information-input"
                              value={useData?.checkCircumference}
                              onChange={(event) => {setUseData(useData=>({...useData,checkCircumference:event.target.value}));setIsActiveOtherInfo(false);}}
                              placeholder="Vòng ngực"
                              ref={checkCircumferenceRef}
                            />
                          </div>
                          <div className="account-other-information-group">
                            <label className="account-other-information-ring-label">
                              Vòng nách
                            </label>
                            <input
                              type="number"
                              className="account-other-information-input"
                              value={useData?.underarmCircumference}
                              onChange={(event) => {setUseData(useData=>({...useData,underarmCircumference:event.target.value}));setIsActiveOtherInfo(false);}}
                              placeholder="Vòng nách"
                              ref={underarmCircumferenceRef}
                            />
                          </div>
                          <div className="account-other-information-group">
                            <label className="account-other-information-ring-label">
                              Dài tay
                            </label>
                            <input
                              type="number"
                              className="account-other-information-input"
                              value={useData?.sleeveLength}
                              onChange={(event) => {setUseData(useData=>({...useData,sleeveLength:event.target.value}));setIsActiveOtherInfo(false);}}
                              placeholder="Dài tay"
                              ref={sleeveLengthRef}
                            />
                          </div>
                        </div>
                        <div className="account-other-information-ring align-items-center rings">
                          <div className="account-other-information-group">
                            <label className="account-other-information-ring-label">
                              Vòng đáy
                            </label>
                            <input
                              type="number"
                              className="account-other-information-input"
                              value={useData?.bottomCircumference}
                              onChange={(event) => {setUseData(useData=>({...useData,bottomCircumference:event.target.value}));setIsActiveOtherInfo(false);}}
                              placeholder="Vòng đáy"
                              ref={bottomCircumferenceRef}
                            />
                          </div>
                          <div className="account-other-information-group">
                            <label className="account-other-information-ring-label">
                              Ống quần
                            </label>
                            <input
                              type="number"
                              className="account-other-information-input"
                              value={useData?.pantLegWidth}
                              onChange={(event) => {setUseData(useData=>({...useData,pantLegWidth:event.target.value}));setIsActiveOtherInfo(false);}}
                              placeholder="Ống quần"
                              ref={pantLegWidthRef}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 p-0">
                      <div className="d-flex flex-column h-100 text-center justify-content-between">
                        <div className="account-other-information-ring align-items-center">
                          <div className="account-other-information-group">
                            <label className="account-other-information-ring-label">
                              Vòng eo
                            </label>
                            <input
                              type="number"
                              className="account-other-information-input"
                              value={useData?.waistCircumference}
                              onChange={(event) => {setUseData(useData=>({...useData,waistCircumference:event.target.value}));setIsActiveOtherInfo(false);}}
                              placeholder="Vòng eo"
                              ref={waistCircumferenceRef}
                            />
                          </div>
                          <div className="account-other-information-group">
                            <label className="account-other-information-ring-label">
                              Rộng vai
                            </label>
                            <input
                              type="number"
                              className="account-other-information-input"
                              value={useData?.shoulderWidth}
                              onChange={(event) => {setUseData(useData=>({...useData,shoulderWidth:event.target.value}));setIsActiveOtherInfo(false);}}
                              placeholder="Rộng vai"
                              ref={shoulderWidthRef}
                            />
                          </div>
                          <div className="account-other-information-group">
                            <label className="account-other-information-ring-label">
                              Cửa tay
                            </label>
                            <input
                              type="number"
                              className="account-other-information-input"
                              value={useData?.cuffCircumference}
                              onChange={(event) => {setUseData(useData=>({...useData,cuffCircumference:event.target.value}));setIsActiveOtherInfo(false);}}
                              placeholder="Cửa tay"
                              ref={cuffCircumferenceRef}
                            />
                          </div>
                        </div>
                        <div className="account-other-information-ring align-items-center rings">
                          <div className="account-other-information-group">
                            <label className="account-other-information-ring-label">
                              Dài quần
                            </label>
                            <input
                              type="number"
                              className="account-other-information-input"
                              value={useData?.pantLength}
                              placeholder="Dài quần"
                              onChange={(event) => {setUseData(useData=>({...useData,pantLength:event.target.value}));setIsActiveOtherInfo(false);}}
                              ref={pantLengthRef}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="account-other-information-btn text-end">
                <button className="btn-cancel" hidden={isActiveOtherInfo} onClick={handleCancelOther}>
                  Hủy
                </button>
                
                {
                  isActiveOtherInfo?
                  <button className="btn-cancel1" onClick={handleHiddenOther}>
                    Ẩn thông tin số đo cơ thể
                  </button>:
                  <button className={isActiveOtherInfo? "btn-update-non-active" :"btn-update" } disabled={isActiveOtherInfo|| load} onClick={handleSubmit}>
                    Cập nhật
                  </button>
                }
              </div>
            </form>
          }
          </div>
}
          <div className="account-other-information-top bg-white p-3 bottom div-check">
            <input
            type="checkbox"
            checked={isUseCloth}
            onChange={handleCheckboxChange}
            className="account-other-information-checkbox"
            />
            <strong className="checkmark"  onClick={handleCheckboxChange}>Có sử dụng vải của cơ sở may</strong>
          </div>
          <div className="account-other-information-top bg-white p-3 bottom">
            <div className="d-flex align-content-center">
              <div className=" w-25">
                <h2 className="account-other-information-measurements ps-3">
                  Nội dung
                </h2>
              </div>
            </div>
            <textarea
              value={content}
              onChange={(e) => {setContent(e.target.value);}}
              placeholder="Nhập nội dung..."
              className="contentTask"
              cols={100}
              rows={5}
            />
          </div>
          <div className="account-other-information-top bg-white p-3 bottom">
            <div className="d-flex align-content-center">
              <div className=" w-25">
                <h2 className="account-other-information-measurements ps-3">
                  Chú thích
                </h2>
              </div>
            </div>
            <textarea
              value={note}
              onChange={(e) => {setNote(e.target.value);}}
              placeholder="Nhập chú thích..."
              className="noteTask"
              cols={100}
              rows={5}
            />
          </div>
          <div className="account-other-information-top bg-white p-3 bottom">
                <div className=" w-25">
                  <h2 className="account-other-information-measurements ps-3">
                    Ảnh
                  </h2>
                </div>
                <div className="ps-3">
                  <Album photos={photos} setPhotos={setPhotos}>
                  
                  </Album>
                  <div {...getRootProps()}>
                    <input {...getInputProps()}/>
                    <div className="width-add-image">
                      <img src={addImage} alt="Add Image" width="230" height="150"/>
                      <span>Hãy nhấn để chọn ảnh hoặc kéo thả ảnh vào đây để thêm vào.</span>
                    </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default UpdateJob;
