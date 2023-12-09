import React  from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState,useEffect, useRef } from "react";
import { showToastMessageError,showToastMessageSuccess } from "../../../components/toast";
import timedot from "../../../assets/icon/TimelineDot.svg";
import "../../../assets/style/admin/account/account.scss";
import { parse, differenceInDays, format, parseISO } from "date-fns";


function Account() {
  const [load,setLoad]= useState(false);
  const nRef = useRef();
  const eRef = useRef();
  const pRef = useRef();
  const adRef = useRef();
  const nPRef = useRef();
  const passRef=useRef();
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
  const [useData,setUseData]=useState([]);
  const [useStateData,setUseStateData]=useState([]);
  const [isActiveInfo,setIsActiveInfo]=useState(true);
  const [isActiveOtherInfo,setIsActiveOtherInfo]=useState(true);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [usePass,setUsePassword]=useState("");
  const[listSample,setListSample]=useState([]);
  const [birthDay,setBirthDay]=useState("");
  const [task,setTask]=useState([]);
  let { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(baseURL+`api/Users/GetUser/${id}`,yourConfig).then((res) => {
        setUseStateData(res.data);
        const date = new Date(res.data.birthDay);
        setBirthDay(format(date, 'yyyy-MM-dd'));
        setUseData(res.data);
        setName(res.data.firstName+" "+res.data.lastName);
      }).catch((err) => {
        navigate("/accounts");
      });
      axios.get(baseURL+`api/UserSample/GetUserSampleByUserQuery?userId=${userAuth.id}`,yourConfig).then((res) => {
        var listSamples=res.data;
        listSamples.map((element) => {
          const utcTime = new Date(element.createdDate);
          const date = utcTime.toLocaleString();
          element.createdDate = date;
        });
        setListSample(listSamples);
        }).catch((err) => {
        });
    axios.get(baseURL+`api/Task/GetTasksByUserIdQuery?userId=${id}`,yourConfig).then((res) => {
      setTask(res.data);
      console.log(res.data)
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
      if(usePass.length>0 && usePass.length<8){
          showToastMessageError("Mật khẩu có độ dài lớn hơn hoặc bằng 8!");
          passRef.current.focus();
          setUsePassword("");
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
    
    const bodyParameters = {...useData,password:usePass};
    axios.put(baseURL+`api/Users/UpdateUser`,bodyParameters,config).then((res) => {
        setUseStateData(res.data);
        console.log(res.data);
        const date = new Date(res.data.birthDay);
        setBirthDay(format(date, 'yyyy-MM-dd'));
        setLoad(false);
        setIsActiveInfo(true);
        setIsActiveOtherInfo(true);
        showToastMessageSuccess("Cập nhật thành công!");
        setUsePassword("");
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
      setUsePassword("");
  };
  const handleCancelOther= ()=>{
    setIsActiveOtherInfo(true);
    setUseData(useStateData);
  };
  const handleClickRow=(id)=>{
  navigate(`/updateJob/${id}`)
  };
  const handlePrice=(item)=>{
    if(item.isUseCloth)
    {
      return (item.product.price + item.product.priceCloth).toLocaleString('vi-VN')+" đ";
    }
    return item.product.price.toLocaleString('vi-VN')+" đ";
  }
  const handlerTime=(time)=>{
    const date = new Date(time);
    return(format(date, 'yyyy-MM-dd'));
  }
  return (
    <div className="account">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link
              to="/accounts"
              className="breadcrumb-account text-decoration-none p-0"
            >
              Tài khoản
            </Link>
          </li>
          <li
            className="breadcrumb-item breadcrumb-account p-0"
            aria-current="page"
          >
            Thông tin tài khoản
          </li>
        </ol>
      </nav>
      <div className="account-body d-flex ps-3 pe-3">
        <div className="account-info">
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
                <div className="width-30">
                  <strong>Mật khẩu:</strong>
                </div>
                  <div  className="input-pass width-60i">
                    <input 
                            type={isShowPassword ? "text" : "password"}
                            value={usePass}
                            placeholder="Mật khẩu" 
                            className="account-info-input width-pass"
                            onChange={(event) => {setUsePassword(event.target.value);setIsActiveInfo(false);}}
                            ref={passRef}
                    ></input>
                  </div>
                  {usePass.length > 0 && (
                    <div className="icon-left opacity-75 ">
                      <i
                        className={
                          isShowPassword
                            ? " fa fa-eye opacity-75"
                            : "fa fa-eye-slash opacity-75"
                        }
                        aria-hidden="true"
                        onClick={() => {
                          setIsShowPassword(!isShowPassword);
                        }}
                      ></i>
                    </div>
                  )}
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
              <button className={isActiveInfo? "btn-update-non-active" :"btn-update" } onClick={handleSubmit} disabled={isActiveInfo || load}>Cập nhật</button>
            </div>
          </div>
        </div>
        <div className="account-other-information">
          <div className="account-other-information-top bg-white p-1">
            <h2 className="account-other-information-measurements ps-3">
              Số cơ thể
            </h2>
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
                <button className={isActiveOtherInfo? "btn-update-non-active" :"btn-update" } disabled={isActiveOtherInfo} onClick={handleSubmit}>
                  Cập nhật
                </button>
              </div>
            </form>
          </div>

          <div className="account-other-information-product">
            <h2 className="account-other-information-measurements">
              Các sản phẩm may đã đặt may
            </h2>
            <table className="table">
              <thead className="p-3 text-center align-middle">
                <tr className="account-other-information-table-top" >
                  <th scope="col" className="account-other-information-th">STT</th>
                  <th scope="col" className="account-other-information-th">Tên</th>
                  <th scope="col" className="account-other-information-th">Thời gian</th>
                  <th scope="col" className="account-other-information-th">Tổng tiền</th>
                  <th scope="col" className="account-other-information-th">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {
                  task?.map((item,index)=>
                    <tr className="cursor hover-row" key={item.id} onClick={()=>handleClickRow(item.id)}>
                      <td className="align-middle">{index+1}</td>
                      <td className="align-middle">
                        <div className="account-other-product-sewing d-flex align-items-center gap-3">
                          <img
                            src={item.product.images}
                            alt=""
                            className="account-other-product-sewing-image"
                          />
                          <div className="account-other-product-name text-start">
                            <strong>{item.product.name}</strong>
                            <p className="m-0 category">{item.product.productCategory?.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="time align-middle text-center">
                      {handlerTime(item.startTime)}{" "}<i className="fa-sharp fa-solid fa-arrow-right"></i>{" "}
                      {handlerTime(item.endTime)}
                      </td>
                      <td className="price text-end align-middle">{handlePrice(item)}</td>
                      {
                        item.status=="todo"?<td className="text-center align-middle status-todo">Chưa thực hiện</td>:
                        item.status=="doing"?<td className="text-center align-middle status-doing">Đang thực hiện</td>:
                        item.status=="done"?<td className="text-center align-middle status-done">Đã xong</td>:
                        item.status=="complete"?<td className="text-center align-middle status-complete"><div>Đã nhận</div></td>:<td className="align-middle">Đã hủy</td>
                        }
                    </tr>
                    )
                }
              </tbody>
            </table>
          </div>

          <div className="account-other-information-like">
            <h2 className="account-other-information-measurements">
              Sản phẩm may yêu thích
            </h2>
            {listSample.map(item => (
              <div className="account-other-information-like-product" key={item.id}>
              <div className="container">
                <div className="row">
                  <div className="col-1">
                    <div className="account-other-information-time-dot-img text-center">
                      <img
                        src={timedot}
                        className="timedottime-dot-photo"
                        alt=""
                      />
                    </div>
                    <div className="account-other-information-colum"></div>
                  </div>
                  <div className="col-8">
                    <div className="account-other-information-like-product-shirt">
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={item.sample.images}
                          alt=""
                          className="account-other-information-image"
                        />
                        <div>
                          <p className="account-other-information-like-product-shirt-desp m-0 mt-2 mb-2">
                            <strong>Loại: {" "}</strong>{item.sample.productCategory.name}
                          </p>
                          <p className="account-other-information-like-product-shirt-name m-0">
                            <strong>Tên: {" "}</strong>{item.sample.name}
                          </p>
                        </div>
                      </div>
                      
                      <p className="account-other-information-like-product-shirt-price chung mt-2">
                        <strong>Giá: {" "}</strong>{item.sample.price.toLocaleString('vi-VN')+" đ"}
                      </p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="account-other-information-time">
                      {item.createdDate}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            ))}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
