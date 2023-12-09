import React from "react";
import axios from "axios";
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../assets/style/login/login/login.scss';
import "react-toastify/dist/ReactToastify.css";
import { Circles  } from 'react-loading-icons'
import { showToastMessageError,showToastMessageSuccess } from "../../../components/toast";

function ResetPassword() {
    const [isLoad, setLoad] = useState(false);
    const [userName, setUserName] = useState('');
    const [isShowRequireUserName, setIsShowRequireUserName] = useState(false);
    const navigate=useNavigate();
    const handleCancel=(e) => {
        navigate('/login');
    }

    const handleKeyDown = event => {
        if(userName.length > 0) 
            setIsShowRequireUserName(false);
        if (event.key === 'Enter' || event.keyCode === 13) {
            if(userName.length === 0) {
                setIsShowRequireUserName(true);
                return;
            }
            else setIsShowRequireUserName(false);
                handleSubmit();
        }
    };

    const baseURL = import.meta.env.VITE_API_URL;
    const handleSubmit = () => {
        setLoad(true);
        if(userName.length === 0) {
            setIsShowRequireUserName(true);
            return;
        }
        else setIsShowRequireUserName(false);

        const user = {
            userName: userName
        };
    
        axios.put(baseURL+"api/Users/SendOTPToMail", user)
        .then(res => {
            if(res.data === true) {
                localStorage.setItem("userName", userName);
                showToastMessageSuccess("Mã OTP đã được gửi tới email của bạn");
                navigate('otpCode');
            }
            else showToastMessageError("Tài khoản không tồn tại!")
            setLoad(false);
        })
        .catch(err => {
            setLoad(false);
            showToastMessageError(err.message);
            console.log(err.message);
        });
    };
    return (
        <div className='login'>
            <div className='login-label'>Quên mật khẩu</div>
            <div className='login-information text-center'>
                <div className='login-information-text'>
                    <span>
                        Vui lòng nhập Tài khoản của bạn để
                        <br/>tiến hành lấy lại mật khẩu!
                    </span>
                </div>
            </div>
            <div className="login-form-password d-flex align-items-center justify-content-center">
                <div className='login-form-username text-center '>
                    {isShowRequireUserName && (
                    <div className="login-require">
                        <span>*Vui lòng nhập Tài khoản</span>
                    </div>
                    )}
                    <input type="text"
                    className='login-username' 
                    placeholder='Tài khoản'
                    value={userName}
                    onChange={(event) => setUserName(event.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    />
                </div>
            </div>
            <div className='login-form-submit-reset'>
                <div className='login-form-submit-reset-right'>
                    <button className='login-submit-cancel' type="submit" onClick={handleCancel}>Hủy</button>
                    <button className={isLoad?'login-submit-reset-disabled':'login-submit-reset'} disabled={isLoad} type="submit" onKeyDown={handleKeyDown} onClick={handleSubmit}>Lấy mã OTP {isLoad&&<Circles  className={"loader"}/>}</button>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;