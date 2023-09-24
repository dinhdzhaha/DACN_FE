import React from "react";
import { Link } from "react-router-dom";

import timedot from "../../../assets/icon/TimelineDot.svg";
import "../../../assets/style/admin/account/acount.scss";
function Account() {
  return (
    <div className="account">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link
              to="/account"
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
                src="https://i.pinimg.com/564x/b0/cf/3b/b0cf3b04914df89156c87c3131fce153.jpg"
                className="account-info-photo"
                alt=""
              />
              <div className="account-info-name">Công định</div>
            </div>
          </div>
          <div className="account-info-detail">
            <h4 className="account-info-text">Chi tiết</h4>
            <div className="account-info-gach"></div>
            <p className="account-info-personal-information">
              <strong>Họ và Tên:</strong> Lưu Công Định
            </p>
            <p className="account-info-personal-information">
              <strong>Số điện thoại:</strong> 0987654321
            </p>
            <p className="account-info-personal-information">
              <strong>Địa chỉ:</strong> Mễ Trì, Từ Liêm, Hà Nội, Việt Nam
            </p>
            <p className="account-info-personal-information">
              <strong>Mật khẩu:</strong> 0987654321
            </p>
            <p className="account-info-personal-information">
              <strong>Ngày sinh: </strong> 01/02/2023
            </p>
            <div className="text-center">
              <button className="btn-update">Cập nhập</button>
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
                          <div className="account-other-information-group">
                            <label className="account-other-information-ring-label">
                              Dài áo
                            </label>
                            <input
                              type="text"
                              className="account-other-information-input"
                              value={70}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="account-other-information-ring align-items-center rings">
                          <div className="account-other-information-group">
                            <label className="account-other-information-ring-label">
                              Vong đùi
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
                              Hạ gối
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
                    <div className="col-4 ps-0">
                      <div className="dasheds d-flex flex-column h-100 justify-content-between">
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
                        <div className="account-other-information-ring align-items-center rings">
                          <div className="account-other-information-group">
                            <label className="account-other-information-ring-label">
                              Vòng đáy
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
                              Ống quần
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
                    <div className="col-4 p-0">
                      <div className="d-flex flex-column h-100 text-center justify-content-between">
                        <div className="account-other-information-ring align-items-center">
                          <div className="account-other-information-group">
                            <label className="account-other-information-ring-label">
                              vòng eo
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
                              Rộng vai
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
                              Cửa tay
                            </label>
                            <input
                              type="text"
                              className="account-other-information-input"
                              value={70}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="account-other-information-ring align-items-center rings">
                          <div className="account-other-information-group">
                            <label className="account-other-information-ring-label">
                              Dài quần
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
              <div className="account-other-information-btn text-end">
                <button className="account-other-information-btn-update">
                  Cập nhập
                </button>
              </div>
            </form>
          </div>

          <div className="account-other-information-product">
            <h2 className="account-other-information-measurements">
              Các sản phẩm may đã đặt may
            </h2>
            <table className="table">
              <thead className="p-3">
                <tr className="account-other-information-table-top">
                  <th scope="col" className="account-other-information-th">STT</th>
                  <th scope="col" className="account-other-information-th">Tên</th>
                  <th scope="col" className="account-other-information-th">Thời gian</th>
                  <th scope="col" className="account-other-information-th">Tổng tiền</th>
                  <th scope="col" className="account-other-information-th">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="align-middle">1</th>
                  <td className="align-middle">
                    <div className="account-other-product-sewing d-flex align-items-center gap-3">
                      <img
                        src="https://pos.nvncdn.net/778773-105877/ps/20230713_WcskjVVYHE.jpeg"
                        alt=""
                        className="account-other-product-sewing-image"
                      />
                      <div className="account-other-product-name text-start">
                        <strong>Áo sơ mi đồng phục</strong>
                        <p className="m-0">Đồng phục</p>
                      </div>
                    </div>
                  </td>
                  <td className="time align-middle">
                    04/04/2023 -<i className="fa-solid fa-chevron-right"></i>{" "}
                    15/05/2023
                  </td>
                  <td className="price align-middle">299.000đ</td>
                  <td className="status align-middle">Đã nhận</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="account-other-information-like">
            <h2 className="account-other-information-measurements">
              Sản phẩm may yêu thích
            </h2>
            <div className="account-other-information-like-product">
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
                          src="https://pos.nvncdn.net/778773-105877/ps/20230713_WcskjVVYHE.jpeg"
                          alt=""
                          className="account-other-information-image"
                        />
                        <p className="account-other-information-like-product-shirt-name m-0">
                          Áo sơ mi đồng phục 2
                        </p>
                      </div>
                      <p className="account-other-information-like-product-shirt-desp m-0 mt-2 mb-2">
                        Đồng phục
                      </p>
                      <p className="account-other-information-like-product-shirt-price chung">
                        199.000đ
                      </p>
                      <p className="account-other-information-like-product-shirt-material chung mt-2">
                        Vải cao cấp (120k)
                      </p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="account-other-information-time">
                      12:25, 25 Tháng 4, 2023
                    </div>
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

export default Account;
