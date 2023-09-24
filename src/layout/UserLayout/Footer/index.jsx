import React from "react";
import "../../../assets/style/custom/layout/footer/footer.scss";
import logo from "../../../assets/logo/logo.svg";
function Footer() {
  return (
    <div className="container">
      <div className="footer d-flex justify-content-between ">
        <div className="footer-logo">
          <img src={logo} className="footer-logo-logo" alt="" />
        </div>
        <div className="footer-center d-flex">
          <div className="footer-center-nav">
            <div className="footer-center-titlte">Sản phẩm</div>
            <ul className="footer-center-menu">
              <li className="footer-center-item">Quần tây</li>
              <li className="footer-center-item">Áo sơ mi</li>
              <li className="footer-center-item">Đồ công sở</li>
              <li className="footer-center-item">Đồng phục</li>
            </ul>
          </div>
          <div className="footer-center-nav">
            <div className="footer-center-titlte">Liên hệ</div>
            <ul className="footer-center-menu">
              <li className="footer-center-item">0977792807</li>
              <li className="footer-center-item">
                KP.Phước Thị, TT.Phú Thứ, Tây Hòa, Phú Yên
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-iframe">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15900.23006557887!2d105.79201484306058!3d20.994172905095255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135adb29ed54487%3A0xbe22035eae87b5d7!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBIw6AgTuG7mWk!5e0!3m2!1svi!2s!4v1694318490798!5m2!1svi!2s"
            width="300"
            height="157"
            style={{
              border: 0,
              allowFullScreen: true,
            }}
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Footer;
