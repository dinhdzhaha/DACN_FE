import React from "react";
import carts from "../../../assets/cart/Rectangle7.svg";
import "../../../assets/style/custom/cart/cart.scss";
function cart() {
  return (
    <div className="cart">
      <table className="cart-table bg-transparent">
        <thead>
          <tr>
            <th scope="col" className="cart-th">
              Sản phẩm
            </th>
            <th scope="col" className="cart-th"></th>
            <th scope="col" className="cart-th">
              Giá tiền
            </th>
            <th scope="col" className="cart-th">
              Trạng thái
            </th>
            <th scope="col" className="cart-th"></th>
            <th scope="col" className="cart-th"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="border border-dark ">
            <td className="cart-img">
              <img src={carts} alt="" />
            </td>
            <td className="text-start">
              <div className="cart-name">
                <strong>Áo Sơ Mi Đồng Phục Cấp 2</strong>
              </div>
              <div className="cart-name-small">Đồng phục</div>
            </td>
            <td className="cart-price">199.000đ</td>
            <td className="cart-success">Đã hoàn thành</td>
            <td>
              <div className="cart-btn">Đặt giao hàng</div>
            </td>
          </tr>
          <tr className="border border-dark ">
            <td className="cart-img">
              <img src={carts} alt="" />
            </td>
            <td className="text-start">
              <div className="cart-name">
                <strong>Áo Sơ Mi Đồng Phục Cấp 2</strong>
              </div>
              <div className="cart-name-small">Đồng phục</div>
            </td>
            <td className="cart-price">199.000đ</td>
            <td className="cart-being-made" colSpan={2}>
              <div className="cart-being-made-tilte">Đang được thực hiện</div>
              <div className="progress">
                <div
                  className="progress-bar w-50"
                  role="progressbar"
                  aria-label="Example with label"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  50%
                </div>
              </div>
            </td>
          </tr>
          <tr className="border border-dark ">
            <td className="cart-img">
              <img src={carts} alt="" />
            </td>
            <td className="text-start">
              <div className="cart-name">
                <strong>Áo Sơ Mi Đồng Phục Cấp 2</strong>
              </div>
              <div className="cart-name-small">Đồng phục</div>
            </td>
            <td className="cart-price">199.000đ</td>
            <td className="cart-success received">Đã nhận</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default cart;
