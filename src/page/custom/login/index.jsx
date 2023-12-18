import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../assets/style/login/login/login.scss";
import { UserContext } from "../../../context/UserContext";
import { Circles  } from 'react-loading-icons';
import { showToastMessageError,showToastMessageSuccess } from "../../../components/toast";

function Login() {
  const btnRef = useRef();
  const inputPasswordRef = useRef();
  const inputUserNameRef = useRef();

  useEffect(() => {
    const userAuth = JSON.parse(localStorage.getItem("userAuth"));
    if (userAuth) {
      navigate("/");
    }
  }, []);
  const [isLoad, setLoad] = useState(false);
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isShowRequireUserName, setIsShowRequireUserName] = useState(false);
  const [isShowRequirePassword, setIsShowRequirePassword] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const baseURL = import.meta.env.VITE_API_URL;
  const handleSubmit = () => {
    if (userName.length === 0 || password.length === 0) {
      if (userName.length === 0) {
        setIsShowRequireUserName(true);
      } else {
        setIsShowRequireUserName(false);
      }
      if (password.length === 0) {
        setIsShowRequirePassword(true);
      } else {
        setIsShowRequirePassword(false);
      }
      return;
    }
    setLoad(true);
    axios
      .get(baseURL + `api/Users/Auth?userName=${userName}&pwd=${password}`)
      .then((response) => {
        login(response.data);
        setLoad(false);
        showToastMessageSuccess("Đăng nhập thành công!");
        if (response.data.isAdmin) navigate("/admin");
        else
          navigate("/");
      })
      .catch((err) => {
        setPassword("");
        inputPasswordRef.current.focus();
        showToastMessageError("Tài khoản hoặc mật khẩu không đúng!");
        setLoad(false);
        setIsShowRequireUserName(false);
        setIsShowRequirePassword(false);
        inputUserNameRef.current.focus();
        console.log(err.message);
      });
  };

  const handleKeyDownUserName = event => {
    if (userName.length > 0) setIsShowRequireUserName(false);
    if (event.key === 'Enter' || event.keyCode === 13) {
      if (userName.length === 0) {
        setIsShowRequireUserName(true);
        return;
      }
      else {
        setIsShowRequireUserName(false);
      }
      inputPasswordRef.current.focus();
    }
  };
  const handleKeyDownPassword = event => {
    if (password.length > 0) setIsShowRequirePassword(false);
    if (event.key === 'Enter' || event.keyCode === 13) {
      if (password.length === 0) {
        setIsShowRequirePassword(true);
      } else {
        setIsShowRequirePassword(false);
      }
      btnRef.current.focus();
    }
  };

  const handleKeyDownBtn = event => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      handleSubmit();
    }
  };


  return (
    <div className="login">
      <div className="login-label">Đăng nhập</div>
      <div className="login-form-password d-flex align-items-center justify-content-center">
        <div className="login-form-username text-center">
          {isShowRequireUserName && (
            <div className="login-require">
              <span>*Vui lòng nhập Tài khoản</span>
            </div>
          )}
          <input
            type="text"
            className="login-username"
            placeholder="Tài khoản"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            autoFocus 
            ref={inputUserNameRef}
            onKeyDown={handleKeyDownUserName}
          />
        </div>
      </div>
      <div className="login-form-password d-flex align-items-center justify-content-center">
        <div className="login-password-form">
          {isShowRequirePassword && (
            <div className="login-require">
              <span>*Vui lòng nhập Mật khẩu</span>
            </div>
          )}
          <input
            type={isShowPassword ? "text" : "password"}
            className={
              password.length > 0 ? "login-password" : "login-username"
            }
            placeholder="Mật khẩu"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            ref={inputPasswordRef}
            onKeyDown={handleKeyDownPassword}
          />
        </div>
        {password.length > 0 && (
          <div className="login-icon-eye opacity-75">
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
      <div className="login-reset text-center">
        <div className="login-reset-link">
          <a href="/resetPassword" className="login-reset-text">
            Quên mật khẩu?
          </a>
        </div>
      </div>
      <div className="login-form-submit text-center">
        <button
          className={isLoad?"login-submit-disabled":"login-submit"}
          type="submit"
          onClick={handleSubmit}
          onKeyDown={handleKeyDownBtn}
          ref={btnRef}
          disabled={isLoad}
        >
          Đăng nhập
          {isLoad&&<Circles  className={"loader"}/>}
        </button>
      </div>
      <div className="login-information text-center">
        <div className="login-information-text">
          <span>
            Chưa có tài khoản, xin hãy liên hệ với
            <br />
            chung tôi qua số điện thoại
            <br />
            0977792807
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
