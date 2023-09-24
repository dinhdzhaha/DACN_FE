import React, { useState } from "react";

import "../../../assets/style/admin/warehouse/warehouse.scss";
import icondot from "../../../assets/icon/icondot.svg";
function Warehouse() {
  const [value, setValue] = useState(0);
  const [values, setValues] = useState(0);
  const increaseValue = () => {
    setValue(value + 1);
  };

  const reduceValue = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };
  const increaseValues = () => {
    setValues(values + 1);
  };

  const reduceValues = () => {
    if (values > 0) {
      setValues(values - 1);
    }
  };
  return (
    <div className="warehouse">
      <div className="warehouse-select">
        <ul className="nav nav-pills gap-3" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active warehouse-text"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              Tất cả
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link warehouse-text"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              Chỉ
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link warehouse-text"
              id="pills-contact-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-contact"
              type="button"
              role="tab"
              aria-controls="pills-contact"
              aria-selected="false"
            >
              Vải
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link warehouse-text"
              id="pills-knot-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-knot"
              type="button"
              role="tab"
              aria-controls="pills-knot"
              aria-selected="false"
            >
              Nút
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link warehouse-text"
              id="pills-zipper-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-zipper"
              type="button"
              role="tab"
              aria-controls="pills-zipper"
              aria-selected="false"
            >
              Dây kéo
            </button>
          </li>
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
              <div className="warehouse-content-box bg-white">
                <div className="warehouse-content-top d-flex  justify-content-between">
                  <div className="warehouse-content-top-left">
                    <h2 className="warehouse-content-top-name">Nút sơ mi</h2>
                    <p className="warehouse-content-top-price">2.000đ</p>
                    <div className="warehouse-content-top-quantity">
                      <div className="d-flex justify-content-between">
                        <div className="warehouse-content-top-group d-flex justify-content-between align-items-center">
                          <div>
                            <label className="warehouse-content-top-used">
                              Đã sử dụng
                            </label>
                            <input
                              type="number"
                              id="warehouse-content-top-useds"
                              className="warehouse-content-top-number"
                              value={value}
                              onChange={(e) => setValue(e.target.value)}
                            />
                          </div>
                          <div className="d-flex flex-column ">
                            <button
                              className="warehouse-content-top-increase"
                              onClick={increaseValue}
                            >
                              <i className="fa-solid fa-chevron-up"></i>
                            </button>
                            <button
                              className="warehouse-content-top-reduce"
                              onClick={reduceValue}
                            >
                              <i className="fa-solid fa-chevron-down"></i>
                            </button>
                          </div>
                        </div>
                        <div className="warehouse-content-top-group-total d-flex justify-content-between align-items-center ">
                          <label className="warehouse-content-top-total">
                            Tổng
                          </label>
                          <input
                            type="number"
                            id="warehouse-content-top-total"
                            className="warehouse-content-top-number total"
                            value={values}
                          />
                          <div className="d-flex flex-column ">
                            <button
                              className="warehouse-content-top-increase"
                              onClick={increaseValues}
                            >
                              <i className="fa-solid fa-chevron-up"></i>
                            </button>
                            <button
                              className="warehouse-content-top-reduce"
                              onClick={reduceValues}
                            >
                              <i className="fa-solid fa-chevron-down"></i>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="warehouse-content-top-group-remaining">
                        <label className="warehouse-content-top-remaining-id">
                          Còn lại
                        </label>
                        <input
                          type="number"
                          id="warehouse-content-top-remaining-id"
                          className="warehouse-content-top-remaining-input warehouse-content-top-number text-white"
                          value={5}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="warehouse-content-top-center">
                    <img
                      src="https://i.pinimg.com/564x/10/ee/98/10ee98130fcb4261135dce02f701518a.jpg"
                      alt=""
                      className="warehouse-content-top-center-image"
                    />
                  </div>
                  <div
                    className="warehouse-content-top-dot"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <img src={icondot} alt="" />
                  </div>
                </div>
                <div className="warehouse-content-bottom">
                  Thời gian cập nhật gần nhất 14:30, 05 tháng 05, 2023
                </div>
              </div>
              <div className="warehouse-content-box bg-white">
                <div className="warehouse-content-top d-flex  justify-content-between">
                  <div className="warehouse-content-top-left">
                    <h2 className="warehouse-content-top-name">Nút sơ mi</h2>
                    <p className="warehouse-content-top-price">2.000đ</p>
                    <div className="warehouse-content-top-quantity">
                      <div className="d-flex justify-content-between">
                        <div className="warehouse-content-top-group d-flex justify-content-between align-items-center">
                          <div>
                            <label className="warehouse-content-top-used">
                              Đã sử dụng
                            </label>
                            <input
                              type="number"
                              id="warehouse-content-top-useds"
                              className="warehouse-content-top-number"
                              value={value}
                              onChange={(e) => setValue(e.target.value)}
                            />
                          </div>
                          <div className="d-flex flex-column ">
                            <button
                              className="warehouse-content-top-increase"
                              onClick={increaseValue}
                            >
                              <i className="fa-solid fa-chevron-up"></i>
                            </button>
                            <button
                              className="warehouse-content-top-reduce"
                              onClick={reduceValue}
                            >
                              <i className="fa-solid fa-chevron-down"></i>
                            </button>
                          </div>
                        </div>
                        <div className="warehouse-content-top-group-total d-flex justify-content-between align-items-center ">
                          <label className="warehouse-content-top-total">
                            Tổng
                          </label>
                          <input
                            type="number"
                            id="warehouse-content-top-total"
                            className="warehouse-content-top-number total"
                            value={values}
                          />
                          <div className="d-flex flex-column ">
                            <button
                              className="warehouse-content-top-increase"
                              onClick={increaseValues}
                            >
                              <i className="fa-solid fa-chevron-up"></i>
                            </button>
                            <button
                              className="warehouse-content-top-reduce"
                              onClick={reduceValues}
                            >
                              <i className="fa-solid fa-chevron-down"></i>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="warehouse-content-top-group-remaining">
                        <label className="warehouse-content-top-remaining-id">
                          Còn lại
                        </label>
                        <input
                          type="number"
                          id="warehouse-content-top-remaining-id"
                          className="warehouse-content-top-remaining-input warehouse-content-top-number text-white"
                          value={5}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="warehouse-content-top-center">
                    <img
                      src="https://i.pinimg.com/564x/10/ee/98/10ee98130fcb4261135dce02f701518a.jpg"
                      alt=""
                      className="warehouse-content-top-center-image"
                    />
                  </div>
                  <div className="warehouse-content-top-dot">
                    <img src={icondot} alt="" />
                  </div>
                </div>
                <div className="warehouse-content-bottom">
                  Thời gian cập nhật gần nhất 14:30, 05 tháng 05, 2023
                </div>
              </div>
              <div className="warehouse-content-box bg-white">
                <div className="warehouse-content-top d-flex  justify-content-between">
                  <div className="warehouse-content-top-left">
                    <h2 className="warehouse-content-top-name">Nút sơ mi</h2>
                    <p className="warehouse-content-top-price">2.000đ</p>
                    <div className="warehouse-content-top-quantity">
                      <div className="d-flex justify-content-between">
                        <div className="warehouse-content-top-group d-flex justify-content-between align-items-center">
                          <div>
                            <label className="warehouse-content-top-used">
                              Đã sử dụng
                            </label>
                            <input
                              type="number"
                              id="warehouse-content-top-useds"
                              className="warehouse-content-top-number"
                              value={value}
                              onChange={(e) => setValue(e.target.value)}
                            />
                          </div>
                          <div className="d-flex flex-column ">
                            <button
                              className="warehouse-content-top-increase"
                              onClick={increaseValue}
                            >
                              <i className="fa-solid fa-chevron-up"></i>
                            </button>
                            <button
                              className="warehouse-content-top-reduce"
                              onClick={reduceValue}
                            >
                              <i className="fa-solid fa-chevron-down"></i>
                            </button>
                          </div>
                        </div>
                        <div className="warehouse-content-top-group-total d-flex justify-content-between align-items-center ">
                          <label className="warehouse-content-top-total">
                            Tổng
                          </label>
                          <input
                            type="number"
                            id="warehouse-content-top-total"
                            className="warehouse-content-top-number total"
                            value={values}
                          />
                          <div className="d-flex flex-column ">
                            <button
                              className="warehouse-content-top-increase"
                              onClick={increaseValues}
                            >
                              <i className="fa-solid fa-chevron-up"></i>
                            </button>
                            <button
                              className="warehouse-content-top-reduce"
                              onClick={reduceValues}
                            >
                              <i className="fa-solid fa-chevron-down"></i>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="warehouse-content-top-group-remaining">
                        <label className="warehouse-content-top-remaining-id">
                          Còn lại
                        </label>
                        <input
                          type="number"
                          id="warehouse-content-top-remaining-id"
                          className="warehouse-content-top-remaining-input warehouse-content-top-number text-white"
                          value={5}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="warehouse-content-top-center">
                    <img
                      src="https://i.pinimg.com/564x/10/ee/98/10ee98130fcb4261135dce02f701518a.jpg"
                      alt=""
                      className="warehouse-content-top-center-image"
                    />
                  </div>
                  <div className="warehouse-content-top-dot">
                    <img src={icondot} alt="" />
                  </div>
                </div>
                <div className="warehouse-content-bottom">
                  Thời gian cập nhật gần nhất 14:30, 05 tháng 05, 2023
                </div>
              </div>
              <div className="warehouse-content-box bg-white">
                <div className="warehouse-content-top d-flex  justify-content-between">
                  <div className="warehouse-content-top-left">
                    <h2 className="warehouse-content-top-name">Nút sơ mi</h2>
                    <p className="warehouse-content-top-price">2.000đ</p>
                    <div className="warehouse-content-top-quantity">
                      <div className="d-flex justify-content-between">
                        <div className="warehouse-content-top-group d-flex justify-content-between align-items-center">
                          <div>
                            <label className="warehouse-content-top-used">
                              Đã sử dụng
                            </label>
                            <input
                              type="number"
                              id="warehouse-content-top-useds"
                              className="warehouse-content-top-number"
                              value={value}
                              onChange={(e) => setValue(e.target.value)}
                            />
                          </div>
                          <div className="d-flex flex-column ">
                            <button
                              className="warehouse-content-top-increase"
                              onClick={increaseValue}
                            >
                              <i className="fa-solid fa-chevron-up"></i>
                            </button>
                            <button
                              className="warehouse-content-top-reduce"
                              onClick={reduceValue}
                            >
                              <i className="fa-solid fa-chevron-down"></i>
                            </button>
                          </div>
                        </div>
                        <div className="warehouse-content-top-group-total d-flex justify-content-between align-items-center ">
                          <label className="warehouse-content-top-total">
                            Tổng
                          </label>
                          <input
                            type="number"
                            id="warehouse-content-top-total"
                            className="warehouse-content-top-number total"
                            value={values}
                          />
                          <div className="d-flex flex-column ">
                            <button
                              className="warehouse-content-top-increase"
                              onClick={increaseValues}
                            >
                              <i className="fa-solid fa-chevron-up"></i>
                            </button>
                            <button
                              className="warehouse-content-top-reduce"
                              onClick={reduceValues}
                            >
                              <i className="fa-solid fa-chevron-down"></i>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="warehouse-content-top-group-remaining">
                        <label className="warehouse-content-top-remaining-id">
                          Còn lại
                        </label>
                        <input
                          type="number"
                          id="warehouse-content-top-remaining-id"
                          className="warehouse-content-top-remaining-input warehouse-content-top-number text-white"
                          value={5}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="warehouse-content-top-center">
                    <img
                      src="https://i.pinimg.com/564x/10/ee/98/10ee98130fcb4261135dce02f701518a.jpg"
                      alt=""
                      className="warehouse-content-top-center-image"
                    />
                  </div>
                  <div className="warehouse-content-top-dot">
                    <img src={icondot} alt="" />
                  </div>
                </div>
                <div className="warehouse-content-bottom">
                  Thời gian cập nhật gần nhất 14:30, 05 tháng 05, 2023
                </div>
              </div>
              <div className="warehouse-content-box bg-white">
                <div className="warehouse-content-top d-flex  justify-content-between">
                  <div className="warehouse-content-top-left">
                    <h2 className="warehouse-content-top-name">Nút sơ mi</h2>
                    <p className="warehouse-content-top-price">2.000đ</p>
                    <div className="warehouse-content-top-quantity">
                      <div className="d-flex justify-content-between">
                        <div className="warehouse-content-top-group d-flex justify-content-between align-items-center">
                          <div>
                            <label className="warehouse-content-top-used">
                              Đã sử dụng
                            </label>
                            <input
                              type="number"
                              id="warehouse-content-top-useds"
                              className="warehouse-content-top-number"
                              value={value}
                              onChange={(e) => setValue(e.target.value)}
                            />
                          </div>
                          <div className="d-flex flex-column ">
                            <button
                              className="warehouse-content-top-increase"
                              onClick={increaseValue}
                            >
                              <i className="fa-solid fa-chevron-up"></i>
                            </button>
                            <button
                              className="warehouse-content-top-reduce"
                              onClick={reduceValue}
                            >
                              <i className="fa-solid fa-chevron-down"></i>
                            </button>
                          </div>
                        </div>
                        <div className="warehouse-content-top-group-total d-flex justify-content-between align-items-center ">
                          <label className="warehouse-content-top-total">
                            Tổng
                          </label>
                          <input
                            type="number"
                            id="warehouse-content-top-total"
                            className="warehouse-content-top-number total"
                            value={values}
                          />
                          <div className="d-flex flex-column ">
                            <button
                              className="warehouse-content-top-increase"
                              onClick={increaseValues}
                            >
                              <i className="fa-solid fa-chevron-up"></i>
                            </button>
                            <button
                              className="warehouse-content-top-reduce"
                              onClick={reduceValues}
                            >
                              <i className="fa-solid fa-chevron-down"></i>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="warehouse-content-top-group-remaining">
                        <label className="warehouse-content-top-remaining-id">
                          Còn lại
                        </label>
                        <input
                          type="number"
                          id="warehouse-content-top-remaining-id"
                          className="warehouse-content-top-remaining-input warehouse-content-top-number text-white"
                          value={5}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="warehouse-content-top-center">
                    <img
                      src="https://i.pinimg.com/564x/10/ee/98/10ee98130fcb4261135dce02f701518a.jpg"
                      alt=""
                      className="warehouse-content-top-center-image"
                    />
                  </div>
                  <div className="warehouse-content-top-dot">
                    <img src={icondot} alt="" />
                  </div>
                </div>
                <div className="warehouse-content-bottom">
                  Thời gian cập nhật gần nhất 14:30, 05 tháng 05, 2023
                </div>
              </div>
              <div className="warehouse-content-box bg-white">
                <div className="warehouse-content-top d-flex  justify-content-between">
                  <div className="warehouse-content-top-left">
                    <h2 className="warehouse-content-top-name">Nút sơ mi</h2>
                    <p className="warehouse-content-top-price">2.000đ</p>
                    <div className="warehouse-content-top-quantity">
                      <div className="d-flex justify-content-between">
                        <div className="warehouse-content-top-group d-flex justify-content-between align-items-center">
                          <div>
                            <label className="warehouse-content-top-used">
                              Đã sử dụng
                            </label>
                            <input
                              type="number"
                              id="warehouse-content-top-useds"
                              className="warehouse-content-top-number"
                              value={value}
                              onChange={(e) => setValue(e.target.value)}
                            />
                          </div>
                          <div className="d-flex flex-column ">
                            <button
                              className="warehouse-content-top-increase"
                              onClick={increaseValue}
                            >
                              <i className="fa-solid fa-chevron-up"></i>
                            </button>
                            <button
                              className="warehouse-content-top-reduce"
                              onClick={reduceValue}
                            >
                              <i className="fa-solid fa-chevron-down"></i>
                            </button>
                          </div>
                        </div>
                        <div className="warehouse-content-top-group-total d-flex justify-content-between align-items-center ">
                          <label className="warehouse-content-top-total">
                            Tổng
                          </label>
                          <input
                            type="number"
                            id="warehouse-content-top-total"
                            className="warehouse-content-top-number total"
                            value={values}
                          />
                          <div className="d-flex flex-column ">
                            <button
                              className="warehouse-content-top-increase"
                              onClick={increaseValues}
                            >
                              <i className="fa-solid fa-chevron-up"></i>
                            </button>
                            <button
                              className="warehouse-content-top-reduce"
                              onClick={reduceValues}
                            >
                              <i className="fa-solid fa-chevron-down"></i>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="warehouse-content-top-group-remaining">
                        <label className="warehouse-content-top-remaining-id">
                          Còn lại
                        </label>
                        <input
                          type="number"
                          id="warehouse-content-top-remaining-id"
                          className="warehouse-content-top-remaining-input warehouse-content-top-number text-white"
                          value={5}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="warehouse-content-top-center">
                    <img
                      src="https://i.pinimg.com/564x/10/ee/98/10ee98130fcb4261135dce02f701518a.jpg"
                      alt=""
                      className="warehouse-content-top-center-image"
                    />
                  </div>
                  <div className="warehouse-content-top-dot">
                    <img src={icondot} alt="" />
                  </div>
                </div>
                <div className="warehouse-content-bottom">
                  Thời gian cập nhật gần nhất 14:30, 05 tháng 05, 2023
                </div>
              </div>
              <div className="warehouse-content-box bg-white">
                <div className="warehouse-content-top d-flex  justify-content-between">
                  <div className="warehouse-content-top-left">
                    <h2 className="warehouse-content-top-name">Nút sơ mi</h2>
                    <p className="warehouse-content-top-price">2.000đ</p>
                    <div className="warehouse-content-top-quantity">
                      <div className="d-flex justify-content-between">
                        <div className="warehouse-content-top-group d-flex justify-content-between align-items-center">
                          <div>
                            <label className="warehouse-content-top-used">
                              Đã sử dụng
                            </label>
                            <input
                              type="number"
                              id="warehouse-content-top-useds"
                              className="warehouse-content-top-number"
                              value={value}
                              onChange={(e) => setValue(e.target.value)}
                            />
                          </div>
                          <div className="d-flex flex-column ">
                            <button
                              className="warehouse-content-top-increase"
                              onClick={increaseValue}
                            >
                              <i className="fa-solid fa-chevron-up"></i>
                            </button>
                            <button
                              className="warehouse-content-top-reduce"
                              onClick={reduceValue}
                            >
                              <i className="fa-solid fa-chevron-down"></i>
                            </button>
                          </div>
                        </div>
                        <div className="warehouse-content-top-group-total d-flex justify-content-between align-items-center ">
                          <label className="warehouse-content-top-total">
                            Tổng
                          </label>
                          <input
                            type="number"
                            id="warehouse-content-top-total"
                            className="warehouse-content-top-number total"
                            value={values}
                          />
                          <div className="d-flex flex-column ">
                            <button
                              className="warehouse-content-top-increase"
                              onClick={increaseValues}
                            >
                              <i className="fa-solid fa-chevron-up"></i>
                            </button>
                            <button
                              className="warehouse-content-top-reduce"
                              onClick={reduceValues}
                            >
                              <i className="fa-solid fa-chevron-down"></i>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="warehouse-content-top-group-remaining">
                        <label className="warehouse-content-top-remaining-id">
                          Còn lại
                        </label>
                        <input
                          type="number"
                          id="warehouse-content-top-remaining-id"
                          className="warehouse-content-top-remaining-input warehouse-content-top-number text-white"
                          value={5}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="warehouse-content-top-center">
                    <img
                      src="https://i.pinimg.com/564x/10/ee/98/10ee98130fcb4261135dce02f701518a.jpg"
                      alt=""
                      className="warehouse-content-top-center-image"
                    />
                  </div>
                  <div className="warehouse-content-top-dot">
                    <img src={icondot} alt="" />
                  </div>
                </div>
                <div className="warehouse-content-bottom">
                  Thời gian cập nhật gần nhất 14:30, 05 tháng 05, 2023
                </div>
              </div>
              <div className="warehouse-content-box bg-white">
                <div className="warehouse-content-top d-flex  justify-content-between">
                  <div className="warehouse-content-top-left">
                    <h2 className="warehouse-content-top-name">Nút sơ mi</h2>
                    <p className="warehouse-content-top-price">2.000đ</p>
                    <div className="warehouse-content-top-quantity">
                      <div className="d-flex justify-content-between">
                        <div className="warehouse-content-top-group d-flex justify-content-between align-items-center">
                          <div>
                            <label className="warehouse-content-top-used">
                              Đã sử dụng
                            </label>
                            <input
                              type="number"
                              id="warehouse-content-top-useds"
                              className="warehouse-content-top-number"
                              value={value}
                              onChange={(e) => setValue(e.target.value)}
                            />
                          </div>
                          <div className="d-flex flex-column ">
                            <button
                              className="warehouse-content-top-increase"
                              onClick={increaseValue}
                            >
                              <i className="fa-solid fa-chevron-up"></i>
                            </button>
                            <button
                              className="warehouse-content-top-reduce"
                              onClick={reduceValue}
                            >
                              <i className="fa-solid fa-chevron-down"></i>
                            </button>
                          </div>
                        </div>
                        <div className="warehouse-content-top-group-total d-flex justify-content-between align-items-center ">
                          <label className="warehouse-content-top-total">
                            Tổng
                          </label>
                          <input
                            type="number"
                            id="warehouse-content-top-total"
                            className="warehouse-content-top-number total"
                            value={values}
                          />
                          <div className="d-flex flex-column ">
                            <button
                              className="warehouse-content-top-increase"
                              onClick={increaseValues}
                            >
                              <i className="fa-solid fa-chevron-up"></i>
                            </button>
                            <button
                              className="warehouse-content-top-reduce"
                              onClick={reduceValues}
                            >
                              <i className="fa-solid fa-chevron-down"></i>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="warehouse-content-top-group-remaining">
                        <label className="warehouse-content-top-remaining-id">
                          Còn lại
                        </label>
                        <input
                          type="number"
                          id="warehouse-content-top-remaining-id"
                          className="warehouse-content-top-remaining-input warehouse-content-top-number text-white"
                          defaultValue={5}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="warehouse-content-top-center">
                    <img
                      src="https://i.pinimg.com/564x/10/ee/98/10ee98130fcb4261135dce02f701518a.jpg"
                      alt=""
                      className="warehouse-content-top-center-image"
                    />
                  </div>
                  <div className="warehouse-content-top-dot">
                    <img src={icondot} alt="" />
                  </div>
                </div>
                <div className="warehouse-content-bottom">
                  Thời gian cập nhật gần nhất 14:30, 05 tháng 05, 2023
                </div>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
            tabIndex="0"
          >
            2
          </div>
          <div
            className="tab-pane fade"
            id="pills-contact"
            role="tabpanel"
            aria-labelledby="pills-contact-tab"
            tabIndex="0"
          >
            3
          </div>
          <div
            className="tab-pane fade"
            id="pills-knot"
            role="tabpanel"
            aria-labelledby="pills-knot-tab"
            tabIndex="0"
          >
            4
          </div>
          <div
            className="tab-pane fade"
            id="pills-zipper"
            role="tabpanel"
            aria-labelledby="pills-zipper-tab"
            tabIndex="0"
          >
            5
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <h3 className="warehouse-model-title">Thông tin mẫu</h3>
              <div className="warehouse-model-img">
                <img
                  src="https://vulcano.sgp1.digitaloceanspaces.com/media/5497/ao-so-mi-dai-tay-1059.jpg"
                  alt=""
                  className="warehouse-model-photo"
                />
              </div>
              <div className="warehouse-model-name">
                <input
                  type="text"
                  className="warehouse-model-input"
                  defaultValue={"Áo Sơ Mi Đồng Phục Cấp 2"}
                />
              </div>
              <div className="warehouse-model-line"></div>
              <ul className="warehouse-model-menu">
                <li className="warehouse-model-item">
                  <strong className="text-dark"> Loại: </strong>{" "}
                  <input
                    type="text"
                    className="warehouse-model-input"
                    placeholder="Nhập loại"
                  />
                </li>
                <li className="warehouse-model-item">
                  <strong className="text-dark"> Giá: </strong>{" "}
                  <span>
                    {" "}
                    <input
                      type="text"
                      className="warehouse-model-input"
                      placeholder="nhập tiền"
                      defaultValue={"199đ"}
                    />
                  </span>
                </li>
                <li className="warehouse-model-item">
                  <strong className="text-dark"> Mô tả: </strong>{" "}
                  <input
                    type="text"
                    className="warehouse-model-input"
                    placeholder="nhập mô tả"
                  />
                </li>
                <li className="warehouse-model-item">
                  <strong className="text-dark"> Note: </strong>{" "}
                  <input
                    type="text"
                    className="warehouse-model-input"
                    placeholder="nhập chú ý"
                  />
                </li>
                <li className="warehouse-model-item">
                  <strong className="text-dark"> Vải cơ sở may: </strong>{" "}
                  <input
                    type="text"
                    className="warehouse-model-input"
                    placeholder="nhập vải cơ sở may"
                  />
                </li>
              </ul>
              <div className="text-end">
                <button type="button" className="warehouse-model-btn">
                  Cập nhập
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Warehouse;
