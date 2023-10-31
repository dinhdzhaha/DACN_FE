import React, {useEffect, useState, useRef,useContext} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../../assets/style/custom/edit/edit.scss";
import camera from "../../../assets/icon/camera.svg";
import axios from "axios";
import { Circles  } from 'react-loading-icons'
import { UserContext } from "../../../context/UserContext";
import { showToastMessageError,showToastMessageSuccess } from "../../../components/toast";

function Edit() {
    const userAuth = JSON.parse(localStorage.getItem("userAuth"));
    const { logout } = useContext(UserContext);
    const navigate = useNavigate();
    const fNRef = useRef();
    const lNRef = useRef();
    const eRef = useRef();
    const pRef = useRef();
    const adRef = useRef();
    const oPRef = useRef();
    const nPRef = useRef();
    const cPRef = useRef();
    const [isDisable,setDisable]=useState(true);
    const [showUpdatePassword, setShowUpdatePassword] = useState(false);
    const [isLoad, setLoad] = useState(false);
    const [useData,setUseData]=useState({});
    const [useStateData,setUseStateData]=useState({});
    const [usePassword,setUsePassword]=useState({
        "oldPassword": "",
        confirmPassword: "",
        "newPassword": ""
    });
    useEffect(() => {
        if (userAuth===null) {
            logout()
            navigate("/login");
            return;
        }
    }, []);
    const handleShowUpdate = () => {
        setShowUpdatePassword(!showUpdatePassword);
    };
    const yourConfig = {
        headers: {
            Authorization: "Bearer " + userAuth?.token
        }
    };
    const baseURL = import.meta.env.VITE_API_URL;
    const handleSubmit=()=>{
        if(useData?.firstName.length===0){
            showToastMessageError("Họ và tên lót không được để trống!");
            fNRef.current.focus();
            return;
        }
        else if(useData?.lastName.length===0){
            showToastMessageError("Tên không được để trống!");
            lNRef.current.focus();
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
        if(showUpdatePassword)
        {
            if(usePassword?.oldPassword.length===0 || usePassword?.oldPassword.length<8){
                if(usePassword?.oldPassword.length===0)showToastMessageError("Mật khẩu cũ không được để trống!");
                else showToastMessageError("Mật khẩu cũ có độ dài lớn hơn hoặc bằng 8!");
                oPRef.current.focus();
                return;
            }
            else if(usePassword?.newPassword.length===0 || usePassword?.newPassword.length<8){
                if(usePassword?.newPassword===0) showToastMessageError("Mật khẩu mới không được để trống!");
                else showToastMessageError("Mật khẩu mới có độ dài lớn hơn hoặc bằng 8!");
                nPRef.current.focus();
                return;
            }
            else if(usePassword?.confirmPassword.length===0 || usePassword?.confirmPassword.length<8){
                if(usePassword?.confirmPassword.length===0 )showToastMessageError("Xác nhận mật khẩu không được để trống!");
                else showToastMessageError("Xác nhận mật khẩu có độ dài lớn hơn hoặc bằng 8!");
                cPRef.current.focus();
                return;
            }
            else if(usePassword?.newPassword!==usePassword?.confirmPassword){
                showToastMessageError("Mật khẩu mới và xác nhận mật khẩu không trùng khớp!");
                nPRef.current.focus();
                setUsePassword((usePass)=>({...usePass,confirmPassword:""}));
                return;
            }
        }

        setLoad(true);
        const config = yourConfig;
        
        const bodyParameters = {
            "oldPassword": usePassword.oldPassword.length===0 ? null : usePassword.oldPassword,
            "newPassword": usePassword.newPassword.length===0 ? null : usePassword.newPassword,
            "confirmPassword": usePassword.confirmPassword.length===0 ? null : usePassword.confirmPassword,
            "avatar": useData?.avatar,
            "email": useData?.email,
            "phone": useData?.phone,
            "address": useData?.address,
            "firstName": useData?.firstName,
            "lastName": useData?.lastName,
        };
        axios.put(baseURL+`api/Users/UpdatePasswordForUser`,bodyParameters,config).then((res) => {
            setUseData(res.data);
            
            setLoad(false);
            setDisable(true);
            showToastMessageSuccess("Cập nhật thành công!");
            setUsePassword({
                "oldPassword": "",
                confirmPassword: "",
                "newPassword": ""
            });
        }).catch((err) => {
            console.log(err);
            setLoad(false); 
            if(err.response.data.detail==="OldPass InValid")
            {
                showToastMessageError("Mật khẩu cũ không đúng!");
                oPRef.current.focus();
                setUsePassword((usePass)=>({...usePass,oldPassword:""}));
                return;
            }
            showToastMessageError(err.response.data.detail);
        });
    }
    const handleCancel= ()=>{
        setDisable(true);
        setUseData(useStateData);
        setShowUpdatePassword(false);
    };
    useEffect(() => {
        axios.get(baseURL+`api/Users/GetUser/${userAuth.id}`,yourConfig).then((res) => {
            setUsePassword({
                "oldPassword": "",
                confirmPassword: "",
                "newPassword": ""
            });
            setUseStateData(res.data);
            setUseData(res.data);
        }).catch((err) => {
            console.log(err);
        });
    },[]);
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
    
    if (file) {
        convertImageToBase64(file);
    }
    };
    const convertImageToBase64 = (file) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
        const base64String = e.target.result;
        // Ở đây, bạn có thể sử dụng base64String cho mục đích của mình
    };
    
    reader.readAsDataURL(file);
    };
    return (
        <div className="edit">
        <div className="edit-title">
            <span>Cập nhật thông tin tài khoản</span>
        </div>
        <div className="edit-body">
            <div className="edit-info text-center">
                <div className="edit-info-avatar text-center">
                    <label htmlFor="imageInput" className="edit-icon-camera-label">
                        <img
                        src={useData?.avatar}
                        className="edit-info-photo"
                        alt=""
                        />
                        <div className="edit-icon-camera-container">
                            <img className="edit-icon-camera" src={camera} alt="" />
                        </div>
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        id="imageInput"
                        className="edit-icon-camera-input"
                        onChange={handleImageUpload}
                        hidden
                    />
                </div>
            </div>
            <div className="edit-form">
            <div className="edit-form-name">
                <div className="edit-form-first-name">
                <div>
                    <label className="edit-form-first-name-label edit-label">
                    Họ và tên lót
                    </label>
                </div>

                <input
                    type="text"
                    className="edit-form-first-name-input edit-input"
                    placeholder="Nhập họ và tên lót"
                    required
                    value={useData?.firstName}
                    onChange={(event) => {setUseData(useData=>({...useData,firstName:event.target.value}));setDisable(false);}}
                    ref={fNRef}
                />
                </div>
                <div className="edit-form-last-name">
                <div>
                    <label className="edit-form-last-name-label edit-label">
                    Tên
                    </label>
                </div>
                <input
                    type="text"
                    className="edit-form-last-name-input edit-input"
                    placeholder="Nhập tên"
                    required
                    value={useData?.lastName}
                    onChange={(event) => {setUseData(useData=>({...useData,lastName:event.target.value}));setDisable(false);}}
                    ref={lNRef}
                />
                </div>
            </div>

            <div className="edit-form-name">
                <div className="edit-form-first-name">
                <div>
                    <label className="edit-form-first-name-label edit-label">
                    Địa chỉ email
                    </label>
                </div>

                <input
                    type="text"
                    className="edit-form-email-input edit-input"
                    placeholder="Nhập địa chỉ email"
                    required
                    value={useData?.email}
                    onChange={(event) => {setUseData(useData=>({...useData,email:event.target.value}));setDisable(false);}}
                    ref={eRef}
                />
                </div>
                <div className="edit-form-last-name">
                <div>
                    <label className="edit-form-last-name-label edit-label">
                    Số điện thoại
                    </label>
                </div>
                <input
                    type="phone"
                    className="edit-form-phone edit-input"
                    placeholder="Nhập số điện thoại"
                    required
                    value={useData?.phone}
                    onChange={(event) => {setUseData(useData=>({...useData,phone:event.target.value}));setDisable(false);}}
                    ref={pRef}
                />
                </div>
            </div>
            <div className="edit-form-address">
                <div>
                <label className="edit-form-address-label edit-label">
                    Địa chỉ
                </label>
                </div>
                <input
                type="phone"
                className="edit-form-address-input edit-input"
                placeholder="Nhập địa chỉ"
                required
                value={useData?.address}
                onChange={(event) => {setUseData(useData=>({...useData,address:event.target.value}));setDisable(false);}}
                ref={adRef}
                />
            </div>
            {!showUpdatePassword && (
                <div className="edit-update">
                <div className="edit-update-password">
                    <span className="edit-show-update" onClick={handleShowUpdate}>
                    Cập nhật mật khẩu
                    </span>
                </div>
                </div>
            )}
            {showUpdatePassword && (
                <div>
                <div className="edit-password">
                    <div className="edit-form-password-old">
                    <label className="edit-form-password-old-label edit-label">
                        Mật khẩu cũ
                    </label>
                    <input
                        type="password"
                        className="edit-form-address edit-input text-start"
                        placeholder="Nhập mật khẩu cũ"
                        value={usePassword?.oldPassword}
                        onChange={(event) => {setUsePassword((usePass)=>({...usePass,oldPassword:event.target.value}));setDisable(false);}}
                        ref={oPRef}
                    />
                    </div>
                    <div className="edit-form-password-new">
                    <div>
                        <label className="edit-form-password-new-label edit-label">
                        Mật khẩu mới
                        </label>
                    </div>
                    <input
                        type="password"
                        className="edit-form-password-new-input edit-input"
                        placeholder="Nhập mật khẩu mới"
                        value={usePassword?.newPassword}
                        onChange={(event) => {setUsePassword((usePass)=>({...usePass,newPassword:event.target.value}));setDisable(false);}}
                        ref={nPRef}
                    />
                    </div>
                </div>
                <div className="edit-form-password-confirm">
                    <div>
                    <label className="edit-form-password-confirm-label edit-label">
                        Xác nhận mật khẩu mới
                    </label>
                    </div>
                    <input
                    type="password"
                    className="edit-form-password-confirm-input edit-input"
                    placeholder="Nhập xác nhận mật khẩu mới"
                    value={usePassword?.confirmPassword}
                    onChange={(event) => {setUsePassword((usePass)=>({...usePass,confirmPassword:event.target.value}));setDisable(false);}}
                    ref={cPRef}
                    />
                </div>
                <div className="edit-update">
                    <div className="edit-update-password">
                    <span className="edit-show-update" onClick={handleShowUpdate}>
                        Hủy cập nhật mật khẩu
                    </span>
                    </div>
                </div>
                </div>
            )}
            <div className="edit-button">
                <div className="edit-button-width">
                <button className="edit-button-cancel" disabled={isDisable} onClick={handleCancel}>Hủy</button>
                <button className="edit-button-save" onClick={handleSubmit} disabled={isDisable}>{isLoad?<Circles  className={"loader-update"}/>:"Cập nhật"}</button>
                </div>
            </div>
            </div>
        </div>
        <div className="show-other-information">
            <div className="show-other-information-title">
            <span>Số đo cơ thể</span>
            </div>
                <div className="show-other-information-user">
                    <div>
                    <div className="row row-css">
                        <div className="show-other-information-user-group col-3">
                            <label className="show-other-information-user-label">
                                Vòng cổ
                            </label>
                            <input
                                type="text"
                                className="show-other-information-user-input"
                                value={useData?.neckCircumference}
                                readOnly
                                disabled
                            />
                        </div>
                        <div className="show-other-information-user-group col-3">
                            <label className="show-other-information-user-label">
                                Vòng ngực
                            </label>
                            <input
                                type="text"
                                className="show-other-information-user-input"
                                value={useData?.checkCircumference}
                                readOnly
                                disabled
                            />
                        </div>
                        <div className="show-other-information-user-group col-3">
                            <label className="show-other-information-user-label">
                                Vòng eo
                            </label>
                            <input
                                type="text"
                                className="show-other-information-user-input"
                                value={useData?.waistCircumference}
                                readOnly
                                disabled
                            />
                        </div>
                    </div>
                    <div className="row row-css">
                        <div className="show-other-information-user-group col-sm-4">
                            <label className="show-other-information-user-label">
                                Vòng mông
                            </label>
                            <input
                                type="text"
                                className="show-other-information-user-input"
                                value={useData?.buttCircumference}
                                readOnly
                                disabled
                            />
                        </div>
                        <div className="show-other-information-user-group col-sm-4">
                            <label className="show-other-information-user-label">
                                Vòng nách
                            </label>
                            <input
                                type="text"
                                className="show-other-information-user-input"
                                value={useData?.underarmCircumference}
                                readOnly
                                disabled
                            />
                        </div>
                        <div className="show-other-information-user-group col-sm-4">
                            <label className="show-other-information-user-label">
                                Rộng vai
                            </label>
                            <input
                                type="text"
                                className="show-other-information-user-input"
                                value={useData?.shoulderWidth}
                                readOnly
                                disabled
                            />
                        </div>
                    </div>
                    <div className="row row-css">
                        <div className="show-other-information-user-group col-sm-4">
                            <label className="show-other-information-user-label">
                                Bắp tay
                            </label>
                            <input
                                type="text"
                                className="show-other-information-user-input"
                                value={ useData?.armCircumference}
                                readOnly
                                disabled
                            />
                        </div>
                        <div className="show-other-information-user-group col-sm-4">
                            <label className="show-other-information-user-label">
                                Dài tay
                            </label>
                            <input
                                type="text"
                                className="show-other-information-user-input"
                                value={useData?.sleeveLength}
                                readOnly
                                disabled
                            />
                        </div>
                        <div className="show-other-information-user-group col-sm-4">
                            <label className="show-other-information-user-label">
                                Cửa tay
                            </label>
                            <input
                                type="text"
                                className="show-other-information-user-input"
                                value={useData?.cuffCircumference}
                                readOnly
                                disabled
                            />
                        </div>
                    </div>
                    <div className="row row-css">
                        <div className="show-other-information-user-group col-sm-4">
                            <label className="show-other-information-user-label">
                                Dài áo
                            </label>
                            <input
                                type="text"
                                className="show-other-information-user-input"
                                value={useData?.shirtLength}
                                readOnly
                                disabled
                            />
                        </div>
                    </div>
                    <div className="row row-css row-down">
                        <div className="show-other-information-user-group col-sm-4">
                            <label className="show-other-information-user-label">
                                Vòng đùi
                            </label>
                            <input
                                type="text"
                                className="show-other-information-user-input"
                                value={useData?.thighCircumference}
                                readOnly
                                disabled
                            />
                        </div>
                        <div className="show-other-information-user-group col-sm-4">
                            <label className="show-other-information-user-label">
                                Vòng đáy
                            </label>
                            <input
                                type="text"
                                className="show-other-information-user-input"
                                value={useData?.bottomCircumference}
                                readOnly
                                disabled
                            />
                        </div>
                        <div className="show-other-information-user-group col-sm-4">
                            <label className="show-other-information-user-label">
                                Dài quần
                            </label>
                            <input
                                type="text"
                                className="show-other-information-user-input"
                                value={useData?.pantLength}
                                readOnly
                                disabled
                            />
                        </div>
                    </div>
                    <div className="row row-css">
                        <div className="show-other-information-user-group col-sm-4">
                            <label className="show-other-information-user-label">
                                Hạ gối
                            </label>
                            <input
                                type="text"
                                className="show-other-information-user-input"
                                value={useData?.kneeHeight}
                                readOnly
                                disabled
                            />
                        </div>
                        <div className="show-other-information-user-group col-sm-4">
                            <label className="show-other-information-user-label">
                                Ống quần
                            </label>
                            <input
                                type="text"
                                className="show-other-information-user-input"
                                value={useData?.pantLegWidth}
                                readOnly
                                disabled
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Edit;
