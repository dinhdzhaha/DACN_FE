import React from "react";
import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../../../assets/style/login/login/login.scss';
import { Circles  } from 'react-loading-icons';
import { showToastMessageError,showToastMessageSuccess } from "../../../components/toast";

function OTPCode() {
    const [isLoad, setLoad] = useState(false);
    const userName= localStorage.getItem("userName");
    const [optCode, setOptCode] = useState('');
    const navigate=useNavigate();
    useEffect(() => {
        if(!userName) {
            navigate('/resetPassword');
        }
    },[]);
    const [isShowRequireOtp, setIsShowRequireOtp] = useState(false);
    const handleCancel=(e) => {
        navigate('/resetPassword');
    }
    const handleSubmit=(e) => {
        setLoad(true);
        if(optCode.length === 0) {
            setIsShowRequireOtp(true);
            return;
        }
        else setIsShowRequireOtp(false);
        const baseURL = import.meta.env.VITE_API_URL;
        const user = {
            userName: userName,
            otpCode: optCode
        };


        axios.get(baseURL+`api/Users/CheckOTP/?oTP=${optCode}&userName=${userName}`)
        .then(res => {
            if(res.data === true) {
                setLoad(false);
                localStorage.setItem('otpCode', optCode);
                navigate('newPassword');
            }
            else {
                showToastMessageError("Mã OTP không đúng. Vui lòng check lại Emai");
            }
        })
        .catch(err => {
            setLoad(false);
            console.log(err);
            if(err.response.data.detail==="OTP Code  is not correct")
            {
                showToastMessageError("Mã OTP không đúng. Vui lòng check lại Email");
                
            }
            else if(err.response.data.detail==="OTP Code had expired")
            {
                showToastMessageError("Mã OTP hết hạn. Vui lòng nhấn lấy lại mã OTP");
                
            }
            else showToastMessageError(err.mess);

        })
    };
    const handleKeyDown = event => {
        if(optCode.length > 0) 
            setIsShowRequireOtp(false);
        if (event.key === 'Enter' || event.keyCode === 13) {
            if(optCode.length === 0) {
                setIsShowRequireOtp(true);
                return;
            }
            else setIsShowRequireOtp(false);
            handleSubmit();
        }
    };
    const sendOTPToMail = () => {
        const baseURL = import.meta.env.VITE_API_URL;
        const userName= localStorage.getItem("userName");
        const user = {
            userName: userName
        };
    
        axios.put(baseURL+"api/Users/SendOTPToMail", user)
        .then(res => {
            showToastMessageSuccess("Mã OTP đã được gửi tới email của bạn");
        })
        .catch(err => {
            showToastMessageError(err.message);
            console.log(err);
        })
    };
    return (
        <div className='login'>
            <div className='login-label'>Nhập mã bảo mật</div>
            <div className='login-information text-center'>
                <div className='login-information-text'>
                <span>
                    Vui lòng kiểm tra mail đã đăng ký với
                    <br/>tài khoản <u><b>{userName}</b></u>
                    {" "}để lấy mã OTP!
                    </span>
                </div>
            </div>

            <div className="login-form-password d-flex align-items-center justify-content-center">
                <div className='login-form-username text-center '>
                    {isShowRequireOtp && (
                    <div className="login-require">
                        <span>*Vui lòng nhập Mã Otp</span>
                    </div>
                    )}
                    <input type="text"
                    className='login-username' 
                    placeholder='Mã OTP'
                    value={optCode}
                    onChange={(event) => setOptCode(event.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    />
                </div>
            </div>
            <div className='login-form-submit-reset'>
                <div className='login-form-submit-reset-right'>
                    <div className='login-reset-otp text-start'>
                        <span className='login-reset-text' onClick={sendOTPToMail}>Bạn chưa có mã?</span>
                    </div>
                    <button className='login-submit-cancel' type="submit" onClick={handleCancel}>Hủy</button>
                    <button className={isLoad?'login-submit-otp-disabled':'login-submit-otp'} type="submit" disabled={isLoad} onClick={handleSubmit}>Tiếp tục {isLoad&&<Circles  className={"loader"}/>}</button>
                </div>
            </div>
        </div>
    );
}

export default OTPCode;