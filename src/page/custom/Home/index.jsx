import React from "react";
import "../../../assets/style/custom/home/home .scss";
import main from "../../../assets/img/main.svg";
import group1 from "../../../assets/img/Group1.svg";
import group2 from "../../../assets/img/Group2.svg";
import group3 from "../../../assets/img/Group3.svg";
function Home() {
  return (
    <div className="home">
      <div className="home d-flex justify-content-center align-items-center">
        <div className="home-text">
          May mặc thời trang - biểu tượng cho phong cách của bạn
        </div>
        <div className="home-vector">
          <img src={main} alt="" className="home-vector-img" />
        </div>
      </div>
      <div className="home-advantage">
        <h2 className="home-advantage-title text-center">
          Lợi thế của chúng tôi
        </h2>
        <p className="home-advantage-content text-center">
          Chúng tôi có một số lợi thế mà các cơ sở may khác không có
        </p>
        <div className="home-advantage-center d-flex justify-content-center align-items-center" >
          <div className="home-advantage-ingredient text-center">
            <div className="home-advantage-ingredient-box">
              <div className="home-advantage-ingredient-photo">
                <img
                  src={group1}
                  alt=""
                  className="home-advantage-ingredient-img"
                />
              </div>
              <div className="home-advantage-ingredient-text">
                <div className="home-advantage-ingredient-text-big">
                  Thợ may chuyên nghiệp
                </div>
                <div className="home-advantage-ingredient-text-small">
                  Thợ may của chúng tôi có nhiều năm kinh nghiệm
                </div>
              </div>
            </div>
          </div>
          <div className="home-advantage-ingredient text-center">
            <div className="home-advantage-ingredient-box">
              <div className="home-advantage-ingredient-photo">
                <img
                  src={group2}
                  alt=""
                  className="home-advantage-ingredient-img"
                />
              </div>
              <div className="home-advantage-ingredient-text">
                <div className="home-advantage-ingredient-text-big">
                  Nguyên liệu tốt nhất
                </div>
                <div className="home-advantage-ingredient-text-small">
                  sử dụng các nguyên liệu tốt nhất có thể để tạo ra sản phẩm may
                  mặc chất lượng
                </div>
              </div>
            </div>
          </div>
          <div className="home-advantage-ingredient text-center">
            <div className="home-advantage-ingredient-box">
              <div className="home-advantage-ingredient-photo">
                <img
                  src={group3}
                  alt=""
                  className="home-advantage-ingredient-img"
                />
              </div>
              <div className="home-advantage-ingredient-text">
                <div className="home-advantage-ingredient-text-big">
                  Các mẫu thiết kế hiện đại
                </div>
                <div className="home-advantage-ingredient-text-small">
                  Các mẫu thiết kế của chúng tôi luôn đáp ứng được xu hướng mới
                  nhất
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
