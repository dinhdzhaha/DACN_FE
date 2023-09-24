import React from "react";
import { Link } from "react-router-dom";

import "../../../assets/style/admin/account/acount.scss";
import "../../../assets/style/admin/account/update.scss";

import plus from "../../../assets/icon/plus.svg";
function Update() {
  return (
    <div className="account">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link
              to="/account"
              className="breadcrumb-account text-decoration-none p-0"
            >
              Công việc
            </Link>
          </li>
          <li
            className="breadcrumb-item breadcrumb-account p-0"
            aria-current="page"
          >
            <strong className="text-dark">May tây đồng phục - Công Định</strong>
          </li>
        </ol>
      </nav>
      <div className="update">
        <div className="container">
          <div className="row">
            <div className="col-4">
              <div className="update-job-information mb-2">
                <div className="account-info p-2 m-0">
                  <h2 className="update-job-information-title">
                    Thông tin công việc
                  </h2>
                  <div className="account-info-avatar-name">
                    <div className="account-info-avatar text-center">
                      <img
                        src="https://i.pinimg.com/564x/b0/cf/3b/b0cf3b04914df89156c87c3131fce153.jpg"
                        className="account-info-photo"
                        alt=""
                      />
                      <div className="account-info-name">Quần tây</div>
                    </div>
                  </div>
                  <div className="account-info-detail">
                    <h4 className="account-info-text">
                      Quần tây đồng phục - Công Định
                    </h4>
                    <div className="account-info-gach"></div>
                    <p className="account-info-personal-information">
                      <strong>Loại:</strong> Quần tây xanh đen đồng phục
                    </p>
                    <p className="account-info-personal-information">
                      <strong>Thời gian thực hiện:</strong> 01/05/2023 -
                      30/07/2023
                    </p>
                    <p className="account-info-personal-information">
                      <strong>Giá:</strong>{" "}
                      <span className="price"> 199.000đ</span>
                    </p>
                    <p className="account-info-personal-information">
                      <strong>Sử dụng vải:</strong> Của khách hàng đem tới
                    </p>
                    <p className="account-info-personal-information">
                      <strong>Trạng thái: :</strong>{" "}
                      <span className="status"> Chưa thực hiện</span>
                    </p>
                  </div>
                  <div className="account-other-information-btn text-end">
                    <button className="account-other-information-btn-update">
                      Cập nhập
                    </button>
                  </div>
                </div>
              </div>
              <div className="update-user-information mb-2">
                <div className="account-info p-2 m-0">
                  <h2 className="update-job-information-title">
                    Thông tin người dùng
                  </h2>
                  <div className="account-info-avatar-name">
                    <div className="account-info-avatar text-center">
                      <img
                        src="https://i.pinimg.com/564x/b0/cf/3b/b0cf3b04914df89156c87c3131fce153.jpg"
                        className="account-info-photo"
                        alt=""
                      />
                      <div className="account-info-name">Công định</div>
                    </div>
                  </div>
                  <div className="account-info-detail">
                    <h4 className="account-info-text">Chi tiết</h4>
                    <div className="account-info-gach w-100"></div>
                    <p className="account-info-personal-information">
                      <strong>Họ và Tên:</strong> Lưu Công Định
                    </p>
                    <p className="account-info-personal-information">
                      <strong>Số điện thoại:</strong> 0987654321
                    </p>
                    <p className="account-info-personal-information">
                      <strong>Địa chỉ:</strong> Mễ Trì, Từ Liêm, Hà Nội, Việt
                      Nam
                    </p>
                    <p className="account-info-personal-information">
                      <strong>Mật khẩu:</strong> 0987654321
                    </p>
                    <p className="account-info-personal-information">
                      <strong>Ngày sinh: </strong> 01/02/2023
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-8">
              <div className="account-other-information-top bg-white p-1">
                <h2 className="account-other-information-measurements ps-3">
                  Số cơ thể <span className="text-span">(May quần)</span>
                </h2>
                <form action="#" className="from h-100">
                  <div className="from-top">
                    <div className="container-fluid h-100">
                      <div className="row h-100">
                        <div className="col-6 ps-0">
                          <div className="dasheds d-flex flex-column h-100 justify-content-between">
                            <div className="account-other-information-ring align-items-center">
                              <div className="account-other-information-group">
                                <label className="account-other-information-ring-label">
                                  vòng cổ
                                </label>
                                <input
                                  type="text"
                                  className="account-other-information-input"
                                  value={70}
                                  readOnly
                                />
                              </div>
                              <div className="account-other-information-group">
                                <label className="account-other-information-ring-label">
                                  vòng mông
                                </label>
                                <input
                                  type="text"
                                  className="account-other-information-input"
                                  value={70}
                                  readOnly
                                />
                              </div>
                              <div className="account-other-information-group">
                                <label className="account-other-information-ring-label">
                                  Bắp tay
                                </label>
                                <input
                                  type="text"
                                  className="account-other-information-input"
                                  value={70}
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-6 ps-0">
                          <div className=" d-flex flex-column h-100 justify-content-between">
                            <div className="account-other-information-ring align-items-center">
                              <div className="account-other-information-group">
                                <label className="account-other-information-ring-label">
                                  vòng ngực
                                </label>
                                <input
                                  type="text"
                                  className="account-other-information-input"
                                  value={70}
                                  readOnly
                                />
                              </div>
                              <div className="account-other-information-group">
                                <label className="account-other-information-ring-label">
                                  vòng nách
                                </label>
                                <input
                                  type="text"
                                  className="account-other-information-input"
                                  value={70}
                                  readOnly
                                />
                              </div>
                              <div className="account-other-information-group">
                                <label className="account-other-information-ring-label">
                                  Dài tay
                                </label>
                                <input
                                  type="text"
                                  className="account-other-information-input"
                                  value={70}
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="account-other-information-btn text-end mt-5 me-3 mb-3">
                    <button className="account-other-information-btn-update">
                      Cập nhập
                    </button>
                  </div>
                </form>
              </div>
              <div className="update-sample bg-white mt-3 p-3 site">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="update-sample-left d-flex align-items-center gap-3">
                    <p className="update-sample-left-text m-0">Sử dụng mẫu</p>
                    <h3 className="update-sample-left-status">Không</h3>
                  </div>
                  <div className="update-sample-right">
                    <button className="update-sample-left-btn">Cập nhập</button>
                  </div>
                </div>
              </div>
              <div className="update-note bg-white mt-3 p-3 site">
                <div className="update-note-top d-flex justify-content-between">
                  <div className="update-note-top-text">Ghi chú:</div>
                  <div className="update-note-top-add">
                    <img src={plus} alt="" />
                  </div>
                </div>
                <div className="update-note-content">
                  <ul className="update-note-menu">
                    <li className="update-note-item">
                      May ống quần ôm, sử dụng dây kéo đồng
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Update;
