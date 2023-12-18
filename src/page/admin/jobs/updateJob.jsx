import React  from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState,useEffect, useRef } from "react";
import { showToastMessageError,showToastMessageSuccess } from "../../../components/toast";
import "../../../assets/style/admin/account/account.scss";
import update from "../../../assets/icon/update.svg";
import remove from "../../../assets/icon/removeSample.svg";
import addImage from "../../../assets/icon/add-image-svgrepo-com.svg";
import { parse, differenceInDays, format, parseISO } from "date-fns";
import Modal from 'react-modal';
import { Progress } from 'rsuite';
import "rsuite/dist/rsuite.css";
import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import Album from "../../../components/ablumPhoto";


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
    const endDate=useRef();
    const pantLegWidthRef=useRef();
    const [name,setName]=useState("");
    const userAuth = JSON.parse(localStorage.getItem("userAuth"));
    const baseURL = import.meta.env.VITE_API_URL;
    const yourConfig = {
      headers: {
          Authorization: "Bearer " + userAuth?.token
      }
    };
    const [useData,setUseData]=useState({});
    const [hidden,setHidden]=useState(false);
    const [hiddenOther,setHiddenOther]=useState(false);
    const [useStateData,setUseStateData]=useState({});
    const [isActiveInfo,setIsActiveInfo]=useState(true);
    const [isActiveOtherInfo,setIsActiveOtherInfo]=useState(true);
    const [birthDay,setBirthDay]=useState("");
    const [productCategoryId,setProductCategoryId]=useState(0);
    const [productCategoryIdInit,setProductCategoryIdInit]=useState(0);
    let { id } = useParams();
    const [productId,setProductId]=useState(0);
    const handleHidden=()=>{setHidden(!hidden);};
    const handleHiddenOther=()=>{setHiddenOther(!hiddenOther);};
    useEffect(() => {
      let productIdVar=0;
      axios.get(baseURL+`api/Task/GetTaskByIdQuery?id=${id}`,yourConfig).then((res) => {
        console.log(res.data)
          setUseStateData(res.data.user);
          let date = new Date(res.data.user.birthDay);
          setBirthDay(format(date, 'yyyy-MM-dd'));
          setUseData(res.data.user);
          setName(res.data.user.firstName+" "+res.data.user.lastName);
          setContent(res.data.content);
          setContentInit(res.data.content);
          setNote(res.data.note);
          setNoteInit(res.data.note);
          setIsUseCloth(res.data.isUseCloth);
          setIsUseClothInit(res.data.isUseCloth);
          setSelection(res.data.status);
          setSelectionInit(res.data.status);
          date = new Date(res.data.startTime);
          setStartTime(format(date, 'yyyy-MM-dd'));
          setStartTimeInit(format(date, 'yyyy-MM-dd'));
          date = new Date(res.data.endTime);
          setEndTime(format(date, 'yyyy-MM-dd'));
          setEndTimeInit(format(date, 'yyyy-MM-dd'));
          setSampleTask(res.data.sample);
          setSampleTaskInit(res.data.sample);
          setNameTaskInit(res.data.product.name);
          setNameTask(res.data.product.name);
          setPrice(res.data.product.price);
          setPriceInit(res.data.product.price);
          setPriceCloth(res.data.product.priceCloth);
          setPriceClothInit(res.data.product.priceCloth);
          setNoteCloth(res.data.product.noteCloth);
          setNoteClothInit(res.data.product.noteCloth);
          setImage(res.data.product.images);
          setImageInit(res.data.product.images);
          date = new Date(res.data.completeDate);
          setComplete(format(date, 'yyyy-MM-dd'));
          setCompleteInit(format(date, 'yyyy-MM-dd'));
          date = new Date(res.data.doneDate);
          setDone(format(date, 'yyyy-MM-dd'));
          setDoneInit(format(date, 'yyyy-MM-dd'));

          setPercent(res.data.percent);
          setProductCategoryId(res.data.product.productCategoryId);
          setProductCategoryIdInit(res.data.product.productCategoryId);

          productIdVar  = res.data.productId;
          setProductId(productIdVar);
          return axios.get(baseURL+`api/ImageProductControl/GetImagesByTaskId?productId=${productIdVar}`,yourConfig).then((res) => {
            setPhotos(res.data.map((photo) => ({
              src: photo.linkImage,
              width: 220,
              height: 200,
              title:photo.id
              })));
          }).catch((err) => {
          });
        }).catch((err) => {
        });
        
    },[]);
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
      Onclick(!isUseCloth,null,null,null,null);
    };
  //#endregion
    const [photos, setPhotos]=useState([]);
  //#region Info Task
    const [content, setContent] = useState('');
    const [note, setNote] = useState('');
    const [contentInit, setContentInit] = useState('');
    const [noteInit, setNoteInit] = useState('');
    const [isUseCloth,setIsUseCloth]=useState(false);
    const [isUseClothInit,setIsUseClothInit]=useState(false);
    const [selection,setSelection]=useState("todo");
    const [selectionInit,setSelectionInit]=useState("todo");
    const [isShowContent,setIsShowContent]=useState(false);
    const [isShowNote,setIsShowNote]=useState(false);
    const [endTime,setEndTime]=useState('');
    const [endTimeInit,setEndTimeInit]=useState('');
    const [startTime,setStartTime]=useState('');
    const [startTimeInit,setStartTimeInit]=useState('');
    const [nameTask,setNameTask]=useState('');
    const [nameTaskInit,setNameTaskInit]=useState('');
    const [sampleTask,setSampleTask]=useState({});
    const [sampleTaskInit,setSampleTaskInit]=useState({});
    const [price,setPrice]=useState('');
    const [priceInit,setPriceInit]=useState('');
    const [image,setImage]=useState("");
    const [imageInit,setImageInit]=useState('');
    const [isShowOther,setIsShowOther]=useState(false);
    const handleSubmitContent=()=>{
      Onclick(null,content,null,null,null);
    }
    const handleSubmitNote=()=>{
      Onclick(null,null,note,null,null);
    }
    const handleCancelContent=()=>{
      setIsShowContent(false);
      setContent(contentInit);
    }
    const handleCancelNote=()=>{
      setIsShowNote(false);
      setNote(noteInit);
    }
    const handleSubmitOtherTask=()=>{
      if(endTime<startTime)
      {
        showToastMessageError("Thời gian kết thúc không được nhỏ hơn thời gian bắt đầu!");
        endDate.current.focus();
        return;
      }
      const config = yourConfig;
      const bodyParameters = {
        "id": id,
        "name": nameTask,
        "sampleId": sampleTask?sampleTask.id:0,
        "price": price,
        "startTime": startTime,
        "endTime": endTime,
        "image": image??"",
        "priceCloth": priceCloth,
        "noteCloth": noteCloth,
        "doneDate": done,
        "completeDate": complete,
        "productCategoryId": productCategoryId,
      };
      axios.put(baseURL+`api/Task/UpdateInfoTask1`,bodyParameters,config).then((res) => {
        setNameTaskInit(nameTask);
        setSampleTaskInit(sampleTask);
        setStartTimeInit(startTime);
        setEndTimeInit(endTime);
        setPriceInit(price);
        setImageInit(image);
        setIsShowOther(!isShowOther);
        setPriceClothInit(priceCloth);
        setNoteClothInit(noteCloth);
        setCompleteInit(complete);
        setDoneInit(done);
        setProductCategoryIdInit(productCategoryId);
        showToastMessageSuccess("Cập nhật thành công!");
      }).catch((err) => {
        // setNameTask(nameTaskInit);
        // setSampleTask(sampleTaskInit);
        // setStartTime(startTimeInit);
        // setEndTime(endTimeInit);
        // setPrice(priceInit);
        // setImage(imageInit);
        showToastMessageError("Cập nhật bị lỗi!");
      });
    }
    const handleCancelOtherTask=()=>{
      setNameTask(nameTaskInit);
      setSampleTask(sampleTaskInit);
      setStartTime(startTimeInit);
      setEndTime(endTimeInit);
      setPrice(priceInit);
      setImage(imageInit);
      setIsShowOther(!isShowOther);
      setPriceCloth(priceClothInit);
      setNoteCloth(noteClothInit);
      setComplete(completeInit);
      setDone(doneInit);
      setProductCategoryIdInit(productCategoryIdInit);
    }
    const Onclick=(isUseClothParam=null,contentParam=null,noteParam=null,statusParam=null, percentParam=null)=>{
      const config = yourConfig;
      const bodyParameters = {
        "id": id,
        "content": contentParam??content,
        "isUseCloth": isUseClothParam??isUseCloth,
        "note": noteParam??note,
        "status": statusParam??selection,
        "percent":percentParam??percent,
      };
      axios.put(baseURL+`api/Task/UpdateInfoTask`,bodyParameters,config).then((res) => {
        showToastMessageSuccess("Cập nhật thành công!");
        if(contentParam!=null)
        {
          setIsShowContent(false);
          setContentInit(contentParam);
        }
        if(noteParam!=null)
        {
          setIsShowNote(false);
          setNoteInit(noteParam);
        }
        if(isUseClothParam!=null)
          setIsUseClothInit(isUseClothParam);
        if(statusParam!=null)
        {
          setSelectionInit(statusParam);
          if(statusParam=="todo")
          {
            setPercent(0);
          }
          else if(statusParam=="done" || statusParam=="complete")
          {
            setPercent(100);
          }
        }
        if(percentParam!=null)
        {
          if(percentParam==100 && selection!="complete")
          {
            setSelectionInit("done");
            setSelection("done");
          }
        }
      }).catch((err) => {
        // setNote(noteInit);
        // setContent(contentInit);
        // setIsUseCloth(isUseClothInit);
        // setSelection(selectionInit);
        showToastMessageError("Cập nhật bị lỗi!");
      });
    }
    const status= (result)=>
    {
      if(result>7 || selection==="done" || selection==="complete")
      {
        return "text-3";
      }
      else if(result>0)
      {
        return "text-2";
      }
      else{
        return "text-1";
      }
    }
    const handleTime=(utcDateStr) => {
      const localDate = new Date(); // Ngày hiện tại ở múi giờ cục bộ
      const utcDate = parse(utcDateStr, "yyyy-MM-dd", new Date()); // Chuyển đổi ngày UTC từ chuỗi
      const result=differenceInDays(utcDate, localDate);
      return result;
    };
  const [samples,setSamples] = useState([{}]);
  const [samplesInit,setSamplesInit] = useState([{}]);
  const [category,setCategory] =useState([{}]);
  const [selection1,setSelection1]=useState(0);
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
  //endregion

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = (data) => {
    if(isShowOther)
      setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleClickSample=(id)=>
  {
    setModalIsOpen(false);
    setSampleTask(samples.find(c=>c.id==id));
  }
  const [done, setDone]=useState(null);
  const [complete, setComplete]=useState(null);
  const [doneInit, setDoneInit]=useState(null);
  const [completeInit, setCompleteInit]=useState(null);

  const [percent, setPercent]=useState(0);
  const [priceCloth, setPriceCloth]=useState(0);
  const [priceClothInit, setPriceClothInit]=useState(0);
  const [noteCloth, setNoteCloth]=useState("");
  const [noteClothInit, setNoteClothInit]=useState("");
  const handlePercent=(percentParam)=>{
    if(selection=="doing")
    {
      setPercent(percentParam);
      Onclick(null,null,null,null,percentParam);
    }
  }
  const [showModal, setShowModal] = useState(true);
  const handleImageChange = (e) => {
    if(isShowOther)
    {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          setImage(e.target.result);
          setShowModal(false); // Ẩn modal sau khi tải ảnh lên
        };

        reader.readAsDataURL(file);
      }
    }
  };
  const handleDeleteImage = () => {
    if(isShowOther)
    {
      setImage(null); // Xoá ảnh bằng cách cài đặt giá trị null
      setShowModal(true); // Hiển thị modal sau khi xoá ảnh
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    acceptedFiles.forEach((file) => {
        const reader = new FileReader();
  
        reader.onload = (e) => {
          const dataUrl = e.target.result;
          const yourConfig = {
            headers: {
                Authorization: "Bearer " + userAuth?.token
            }
          };
          const body={
            productId: productId,
            linkImage: dataUrl
          }
          axios.post(baseURL+`api/ImageProductControl/CreateImage`,body,yourConfig).then((res) => {
            setPhotos((props)=>[{
              src: res.data.linkImage,
              width: 220,
              height: 200,
              title:res.data.id
              },...props]);
          }).catch((err) => {
          });
          
          // Store the data URL in your listFiles array
        };
        reader.readAsDataURL(file);
    });
    // Now listFiles contains an array of data URLs for your image files

  }, [userAuth?.token, productId, setPhotos]);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,accept: {
    'image/jpeg': [],
    'image/png': [],
    'image/webp': [],
    'image/heic': [],
    'image/jfif': [],
  },})

  return (
    <div>
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
      <nav aria-label="breadcrumb">
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
            Thông tin công việc
          </li>
        </ol>
      </nav>
      <div className="account-body d-flex ps-3 pe-3">
        <div className="width-info">
          
          {
            hidden?
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
              <button className="btn-show" hidden={!isActiveInfo} onClick={handleHidden}>
                Hiện thị thông tin Tài khoản
              </button>
            </div>
            :
            <div className="account-info margin-0 bottom">
              <div className="text-end justify-content-start w-100 d-flex mb-1">
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
          }
          <div className="account-info margin-0">
          <div className="text-end justify-content-start w-100 d-flex">
            <h2 className="account-other-information-measurements">
              Thông tin công việc
            </h2>
          </div>
            <div className={"text-end justify-content-end w-100 d-flex"}>
              {
                isShowOther? 
                <div>
                  <button className="btn-cancel-task" onClick={handleCancelOtherTask}>
                    Hủy
                  </button>
                  <button className="btn-update-task" onClick={handleSubmitOtherTask}>Cập nhật</button>
                </div>
                :<button className="table-action-update" onClick={() => setIsShowOther(true)}>
                  <img src={update} className="table-action-icon"></img>
                  Cập nhật
                </button>
              }
            </div>
            <div className={!isShowOther?"transparency":""}>
              <div className="warehouse-model-img  d-flex align-items-center align-content-center justify-content-center">
                {(image || image!="") && (
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
                {(image==null || image=="") && showModal && (
                  <div className={isShowOther?"modal-loa":"modal-loa cursor-disable"}>
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
                          className={`account-info-input width-75 ${isShowOther ? "" : "noBorder"}`}
                          onChange={(event) => {setNameTask(event.target.value)}}
                          disabled={!isShowOther}
                          ></input>
            </div>
            <div className="account-info-sample bottom d-flex align-items-center">
              <div className="width-15" >
                <strong >Mẫu:</strong>
              </div>
              <div className={isShowOther?"account-info-input d-flex align-items-center width-75 cursor hover-scss":"account-info-input d-flex width-75 cursor-disable"} onClick={openModal}>
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
                  <div className="width-field two-line-ellipsis m-lg-1 width-75 align-items-center">
                    <p className={isShowOther?"jobs-staff-name two-line-ellipsis":"jobs-staff-name two-line-ellipsis cursor-disable"}>
                      {
                        sampleTask!=null?<strong>{sampleTask.name}</strong>: <strong>Không</strong>
                      }
                    </p>
                  </div>
              </div>
              {sampleTask&&isShowOther&&<img src={remove} className="margin-left-icon-remove cursor" onClick={()=>{setSampleTask(null); }}></img>}
            </div>
            <div className="account-info-sample bottom d-flex align-items-center">
              <div className="width-15">
                <strong >Tiền:</strong>
              </div>
              <input
                  type="number" 
                  value={price}
                  placeholder="Giá tiền" 
                  className={`account-info-input width-75 ${isShowOther ? "" : "noBorder"}`}
                  onChange={(event) => {setPrice(event.target.value)}}
                  disabled={!isShowOther}
                  ></input>
              <div className="price">đ</div>
              
            </div>
            <div className="account-info-sample bottom d-flex align-items-center">
              <div className="width-15">
                <strong >Loại:</strong>
              </div>
              <select
              className={`account-info-input width-75 ${isShowOther ? "" : "noBorder"}`}
              value={productCategoryId}
              onChange={(e) => setProductCategoryId(e.target.value)}
              disabled={!isShowOther}
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
                    className={`account-info-input width-75 ${isShowOther ? "" : "noBorder"}`}
                    onChange={(event) => {setPriceCloth(event.target.value)}}
                    disabled={!isShowOther}
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
                  className={ isShowOther ? "contentTask scss-note-cloth" : "contentTask scss-note-cloth cursor-disable"}
                  cols={10}
                  rows={5}
                  disabled={!isShowOther}
                />
              </div>
            }
            <div className="account-info-time bottom d-flex align-items-center">
              <div className="width-50">
                <strong >Thời gian bắt đầu:</strong>
              </div>
              <input
                          type="date" 
                          value={startTime}
                          placeholder="Thời gian bắt đầu" 
                          className={`account-info-input width-40 ${isShowOther ? "" : "noBorder"}`}
                          onChange={(event) => { setStartTime(event.target.value);}}
                          disabled={!isShowOther}
                          ></input>
            </div>
            <div className="account-info-time bottom d-flex align-items-center">
              <div className="width-50">
                <strong >Thời gian kết thúc:</strong>
              </div>
              <input
                          type="date" 
                          value={endTime}
                          placeholder="Thời gian kết thúc:" 
                          className={`account-info-input width-40 ${isShowOther ? "" : "noBorder"}`}
                          onChange={(event) => { 
                              setEndTime(event.target.value);
                          }}
                          ref={endDate}
                          disabled={!isShowOther}
                          ></input>
            </div>
            {(selection==="done" || selection==="complete")&&
            <div className="account-info-time bottom d-flex align-items-center">
              <div className="width-50">
                <strong >Thời gian hoàn thành:</strong>
              </div>
              <input
                            type="date" 
                            value={done}
                            placeholder="Thời gian kết thúc:" 
                            className={`account-info-input width-40 ${isShowOther ? "" : "noBorder"}`}
                            onChange={(event) => setDone(event.target.value)
                            }
                            disabled={!isShowOther}
                            ></input>
            </div>
            }
            {
            selection==="complete"&&
            <div className="account-info-time bottom d-flex align-items-center">
              <div className="width-50">
                <strong >Thời gian giao hàng:</strong>
              </div>
              <input
                            type="date" 
                            value={complete}
                            placeholder="Thời gian kết thúc:" 
                            className={`account-info-input width-40 ${isShowOther ? "" : "noBorder"}`}
                            onChange={(event) => setComplete(event.target.value)
                            }
                            disabled={!isShowOther}
                            ></input>
            </div>
            }
            <div className="account-info-remain-time bottom">
              <div className={"text-center font-size-20 "+status(handleTime(endTime))}>
              {
                (selection!="done" && selection!="complete")?
                handleTime(endTime)>0?<span>(Thời gian còn lại: {handleTime(endTime)} ngày)</span>:
                <span>(Đã quá hạn: {Math.abs(handleTime(endTime))} ngày)</span>
                :selection=="done"?<span>Đã hoàn thành</span>:<span>Đã giao hàng</span>
              }
              </div>
            </div>
          </div>
        </div>
        </div>

        <div className="account-other-information">
          <div className="account-other-information-top bg-white p-1 bottom">
            <h2 className="account-other-information-measurements ps-3">
              Số đo cơ thể
            </h2>
            {hiddenOther? <div className="from-top mb-2"><button className="btn-show1" onClick={handleHiddenOther}>
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
                  <button className={isActiveOtherInfo? "btn-update-non-active" :"btn-update" } disabled={isActiveOtherInfo} onClick={handleSubmit}>
                    Cập nhật
                  </button>
                }
              </div>
            </form>
          }
          </div>
          <div className="account-other-information-top bg-white p-3 bottom">
            <h2 className="account-other-information-measurements ps-3">
              Trạng thái
            </h2>
            <ul className="nav nav-pills ps-3" id="pills-tab" role="tablist">
              <li className="nav-item"  >
                <button
                  className={selection=="todo"?"status-selected":"status-update"}
                  onClick={()=>{setSelection("todo");Onclick(null,null,null,"todo");}}
                >
                  Chưa thực hiện
                </button>
              </li>
              <li className="nav-item"  >
                <button
                  className={selection=="doing"?"status-selected":"status-update"}
                  onClick={()=>{setSelection("doing");Onclick(null,null,null,"doing");}}
                >
                  Đang thực hiện
                </button>
              </li>
              <li className="nav-item"  >
                <button
                  className={selection=="done"?"status-selected":"status-update"}
                  onClick={()=>{setSelection("done");Onclick(null,null,null,"done");}}
                >
                  Đã xong
                </button>
              </li>
              <li className="nav-item"  >
                <button
                  className={selection=="complete"?"status-selected":"status-update"}
                  onClick={()=>{setSelection("complete");Onclick(null,null,null,"complete");}}
                >
                  Đã nhận
                </button>
              </li>
          </ul>
          </div>
          <div className="account-other-information-top bg-white p-3 bottom">
            <h2 className="account-other-information-measurements ps-3">
            Đã thực hiện
            </h2>
            <ul className={selection!="doing"?"nav nav-pills ps-3 transparency1":"nav nav-pills ps-3"} id="pills-tab" role="tablist">
              <li className="nav-item"  >
                <button
                  className={percent==0?"status-selected":"status-update"}
                  onClick={()=>{handlePercent(0)}}
                >
                  0%
                </button>
              </li>
              <li className="nav-item"  >
                <button
                  className={percent==25?"status-selected":"status-update"}
                  onClick={()=>{handlePercent(25)}}
                >
                  25%
                </button>
              </li>
              <li className="nav-item"  >
                <button
                  className={percent==50?"status-selected":"status-update"}
                  onClick={()=>{handlePercent(50)}}
                >
                  50%
                </button>
              </li>
              <li className="nav-item"  >
                <button
                  className={percent==75?"status-selected":"status-update"}
                  onClick={()=>{handlePercent(75)}}
                >
                  75%
                </button>
              </li>
              <li className="nav-item"  >
                <button
                  className={percent==100?"status-selected":"status-update"}
                  onClick={()=>{handlePercent(100)}}
                >
                  100%
                </button>
              </li>
          </ul>
            {percent==0 && <Progress.Line percent={0} strokeWidth={15} strokeColor="#dc3545" status="fail" />}
            {percent==25 && <Progress.Line percent={25} strokeWidth={15} strokeColor="#dc3545" status="active" />}
            {percent==50 && <Progress.Line percent={50} strokeWidth={10} strokeColor="rgba(255, 159, 56, 0.9294117647)" status="active"/>}
            {percent==75 && <Progress.Line percent={75} strokeWidth={10} strokeColor="#20df7f" status="active"/>}
            {percent==100 && <Progress.Line percent={100} strokeWidth={10} strokeColor="#20df7f" status="success"/>}
          </div>
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
              {
              isShowContent&&
              <div className="text-end justify-content-end w-75 margin-right-30">
                  <button className="btn-cancel" onClick={handleCancelContent}>
                    Hủy
                  </button>
                  <button className="btn-update" onClick={handleSubmitContent}>Cập nhật</button>
              </div>
              }
            </div>
            <textarea
              value={content}
              onChange={(e) => {setContent(e.target.value);setIsShowContent(true);}}
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
              {
              isShowNote&&
              <div className="text-end justify-content-end w-75 margin-right-30">
                  <button className="btn-cancel" onClick={handleCancelNote}>
                    Hủy
                  </button>
                  <button className="btn-update" onClick={handleSubmitNote}>Cập nhật</button>
              </div>
              }
            </div>
            <textarea
              value={note}
              onChange={(e) => {setNote(e.target.value);setIsShowNote(true);}}
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
