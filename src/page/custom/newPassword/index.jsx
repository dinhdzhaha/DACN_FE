import React, { useEffect, useRef  } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../../../assets/style/login/login/login.scss';
import { Circles  } from 'react-loading-icons';
import { showToastMessageError,showToastMessageSuccess } from "../../../components/toast";

function NewPassword() {
    const [isLoad, setLoad] = useState(false);
    const confirmPassRef = useRef();
    const userName= localStorage.getItem("userName");
    const otpCode = localStorage.getItem('otpCode');
    useEffect(() => {
        if(!otpCode && !userName)
        {
            navigate('/resetPassword');
            return;
        }
        if(!otpCode) {
            navigate('/resetPassword/otpCode');
            return;
        }
    });
    const [NewPwd,setNewPwd] = useState('');
    const [ConfirmPwd, setConfirmPwd] = useState('');
    const [isShowNewPwd,setIsShowNewPwd] = useState(false);
    const [isShowConfirmPwd,setIsShowConfirmPwd] = useState(false);
    const [isShowRequirePwd,setIsShowRequirePwd] = useState(false);
    const [isShowRequireConfirmPwd,setIsShowRequireConfirmPwd] = useState(false);
    const navigate=useNavigate();
    const handleCancel=(e) => {
        navigate('/login');
        showToastMessage();
    }

    const handleKeyDownNewPasswordChange = event => {
        if(NewPwd.length > 0)
        {
            setIsShowRequirePwd(false);
        }
        if (event.key === 'Enter' || event.keyCode === 13) {
            if(NewPwd.length === 0) {
                setIsShowRequirePwd(true);
                return;
            }
            confirmPassRef.current.focus();
        }
    };
    const validatePassword = (password) => {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (passwordPattern.test(password)) {
            setPasswordError('');
        } else {
            setPasswordError('Mật khẩu mới phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số.');
        }
    };
    const handleKeyDownConfirmPasswordChange = event => {
        if(ConfirmPwd.length > 0) setIsShowRequireConfirmPwd(false);
        if (event.key === 'Enter' || event.keyCode === 13) {
            if(ConfirmPwd.length === 0) {
                setIsShowRequireConfirmPwd(true);
                return;
            }
            else setIsShowRequireConfirmPwd(false);
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        setLoad(true);
        const baseURL = import.meta.env.VITE_API_URL;
        if(ConfirmPwd.length === 0 && NewPwd.length === 0)
        {
            setIsShowRequirePwd(true);
            setIsShowRequireConfirmPwd(true);
            return;
        }
        if(NewPwd.length === 0) {
            setIsShowRequirePwd(true);
            return;
        }
        if(ConfirmPwd.length === 0) {
            setIsShowRequireConfirmPwd(true);
            return;
        }
        if(ConfirmPwd !== NewPwd)
        {
            setConfirmPwd('');
            showToastMessageError("Mật khẩu mới và Xác nhận mật khẩu mới không khớp");
            confirmPassRef.current.focus();
            return;
        }
        const content={
            "userName": userName,
            "newPassword": NewPwd,
            "confirmNewPassword": ConfirmPwd,
            "otpCode": otpCode
        }
        axios.put(baseURL+"api/Users/ResetPassword", content)
        .then(res => {
            setLoad(false);
            console.log(res);
            if(res.data === true) {
                localStorage.clear();
                showToastMessageSuccess("Mật khẩu mới đã được cập nhật!");
                navigate('/login');
            }
            else showToastMessageError("Tài khoản không tồn tại!")
        })
        .catch(err => {
            setLoad(false);
            showToastMessageError(err.message);
            console.log(err.message);
        })
    };
    return (
        <div className='login'>
            <div className='login-label'>Nhập mật khẩu mới</div>

            <div className='login-information text-center'>
                <div className='login-information-text'>
                <span>
                    Mật khẩu mới phải có ít nhất 8
                    <br/>
                    ký tự, bao gồm chữ hoa,
                    <br/>
                    chữ thường và số
                    </span>
                </div>
            </div>
            <div className='login-form-password d-flex align-items-center justify-content-center'>
                <div className='login-password-form'>
                    {isShowRequirePwd && (
                        <div className="login-require">
                            <span>*Vui lòng nhập Mật khẩu mới</span>
                        </div>
                    )}
                <input type={isShowNewPwd?"text":"password"}
                className={NewPwd.length > 0 ? 'login-password': 'login-username'}
                placeholder='Mật khẩu mới'
                value={NewPwd}
                onChange={(event) => setNewPwd(event.target.value)}
                autoFocus
                onKeyDown={handleKeyDownNewPasswordChange}
                />
                </div>
                {
                    NewPwd.length > 0 &&
                    <div className='login-icon-eye opacity-75'>
                        <i className= {isShowNewPwd ? " fa fa-eye opacity-75" : "fa fa-eye-slash opacity-75"} aria-hidden="true" onClick={()=>{setIsShowNewPwd(!isShowNewPwd)}}></i>
                    </div>
                }           
            </div>
            <div className='login-form-password d-flex align-items-center justify-content-center'>
                <div className='login-password-form'>
                    {isShowRequireConfirmPwd && (
                        <div className="login-require">
                            <span>*Vui lòng nhập Xác nhận mật khẩu mới</span>
                        </div>
                    )}
                <input type={isShowConfirmPwd?"text":"password"}
                className={ConfirmPwd.length > 0 ? 'login-password': 'login-username'}
                placeholder='Xác nhận mật khẩu mới'
                value={ConfirmPwd}
                onChange={(event) => setConfirmPwd(event.target.value)}
                ref={confirmPassRef}
                onKeyDown={handleKeyDownConfirmPasswordChange}
                />
                </div>
                {
                    ConfirmPwd.length > 0 &&
                    <div className='login-icon-eye opacity-75'>
                        <i className= {isShowConfirmPwd ? " fa fa-eye opacity-75" : "fa fa-eye-slash opacity-75"} aria-hidden="true" onClick={()=>{setIsShowConfirmPwd(!isShowConfirmPwd)}}></i>
                    </div>
                }           
            </div>

            <div className='login-form-submit-reset'>
                <div className='login-form-submit-reset-right'>
                    <button className='login-submit-cancel' type="submit" onClick={handleCancel}>Hủy</button>
                    <button className={isLoad?'login-submit-reset-disabled':'login-submit-reset'} type="submit" disabled={isLoad} onClick={handleSubmit}>Xác nhận {isLoad&&<Circles  className={"loader"}/>}</button>
                </div>
            </div>
        </div>
    );
}

export default NewPassword;