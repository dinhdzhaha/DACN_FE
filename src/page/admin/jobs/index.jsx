import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import iconjobs from "../../../assets/icon/icon-jobs.svg";
import icondot from "../../../assets/icon/icondot.svg";

import "../../../assets/style/admin/jobs/job.scss";
function Jobs() {
  return (
    <div className="jobs">
      <DragDropContext>
        <div className="container">
          <div className="row">
            <div className="col-3">
              <div className="d-flex justify-content-between mt-3">
                <h2 className="jobs-title">Chưa thực hiện (03)</h2>
                <img src={iconjobs} alt="" />
              </div>
              <div className="jobs-box">
                <div className="jobs-top d-flex  justify-content-between">
                  <h3 className="jobs-top-name">May quần tây - Công Định</h3>
                  <img src={icondot} alt="" />
                </div>
                <div className="d-flex gap-3">
                  <div className="jobs-staff">
                    <img
                      src="https://i.pinimg.com/564x/ef/fe/49/effe49ec61109cdc67491b6c56503eab.jpg"
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="jobs-staff-name">Công Định - 0346936427</p>
                    <p className="jobs-staff-name">
                      Sử dụng vải cơ sở may: <strong>Không</strong>
                    </p>
                  </div>
                </div>
                <div className="d-flex gap-3">
                  <div className="jobs-staff">
                    <img
                      src="https://i.pinimg.com/564x/d3/c5/c1/d3c5c1f6cb8a52a6a76cac36b24f9c2d.jpg"
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="jobs-staff-name">
                      May theo mẫu:{" "}
                      <strong> Quần tây nam dáng baggy suông đen</strong>
                    </p>
                    <p className="jobs-staff-name">Note:</p>
                    <p className="jobs-staff-name">
                      Thời gian:{" "}
                      <strong className="text-dark">
                        {" "}
                        01/04/2023 - 01/05/2023
                      </strong>
                    </p>
                    <div className="jobs-status d-flex">
                      <p className="jobs-staff-name">Trạng thái:</p>
                      <div className="status">
                        <div className="jobs-status-one" >Trễ hạn</div>
                        <div className="jobs-status-one work-status">
                          Chưa thực hiện
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="d-flex justify-content-between mt-3">
                <h2 className="jobs-title">Đang thực hiện (03)</h2>
                <img src={iconjobs} alt="" />
              </div>
              <div className="jobs-box">
                <div className="jobs-top d-flex  justify-content-between">
                  <h3 className="jobs-top-name">May quần tây - Công Định</h3>
                  <img src={icondot} alt="" />
                </div>
                <div className="d-flex gap-3">
                  <div className="jobs-staff">
                    <img
                      src="https://i.pinimg.com/564x/ef/fe/49/effe49ec61109cdc67491b6c56503eab.jpg"
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="jobs-staff-name">Công Định - 0346936427</p>
                    <p className="jobs-staff-name">
                      Sử dụng vải cơ sở may: <strong>Không</strong>
                    </p>
                  </div>
                </div>
                <div className="d-flex gap-3">
                  <div className="jobs-staff">
                    <img
                      src="https://i.pinimg.com/564x/d3/c5/c1/d3c5c1f6cb8a52a6a76cac36b24f9c2d.jpg"
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="jobs-staff-name">
                      May theo mẫu:{" "}
                      <strong> Quần tây nam dáng baggy suông đen</strong>
                    </p>
                    <p className="jobs-staff-name">Note:</p>
                    <p className="jobs-staff-name">
                      Thời gian:{" "}
                      <strong className="text-dark">
                        {" "}
                        01/04/2023 - 01/05/2023
                      </strong>
                    </p>
                    <div className="jobs-status d-flex">
                      <p className="jobs-staff-name">Trạng thái:</p>
                      <div className="status">
                        <div className="jobs-status-one">Trễ hạn</div>
                        <div className="jobs-status-one work-status">
                          Chưa thực hiện
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="d-flex justify-content-between mt-3">
                <h2 className="jobs-title">Đã hoàn thành (03)</h2>
                <img src={iconjobs} alt="" />
              </div>
              <div className="jobs-box">
                <div className="jobs-top d-flex  justify-content-between">
                  <h3 className="jobs-top-name">May quần tây - Công Định</h3>
                  <img src={icondot} alt="" />
                </div>
                <div className="d-flex gap-3">
                  <div className="jobs-staff">
                    <img
                      src="https://i.pinimg.com/564x/ef/fe/49/effe49ec61109cdc67491b6c56503eab.jpg"
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="jobs-staff-name">Công Định - 0346936427</p>
                    <p className="jobs-staff-name">
                      Sử dụng vải cơ sở may: <strong>Không</strong>
                    </p>
                  </div>
                </div>
                <div className="d-flex gap-3">
                  <div className="jobs-staff">
                    <img
                      src="https://i.pinimg.com/564x/d3/c5/c1/d3c5c1f6cb8a52a6a76cac36b24f9c2d.jpg"
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="jobs-staff-name">
                      May theo mẫu:{" "}
                      <strong> Quần tây nam dáng baggy suông đen</strong>
                    </p>
                    <p className="jobs-staff-name">Note:</p>
                    <p className="jobs-staff-name">
                      Thời gian:{" "}
                      <strong className="text-dark">
                        {" "}
                        01/04/2023 - 01/05/2023
                      </strong>
                    </p>
                    <div className="jobs-status d-flex">
                      <p className="jobs-staff-name">Trạng thái:</p>
                      <div className="status">
                        <div className="jobs-status-one">Trễ hạn</div>
                        <div className="jobs-status-one work-status">
                          Chưa thực hiện
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="d-flex justify-content-between mt-3">
                <h2 className="jobs-title">Đã nhận (03)</h2>
                <img src={iconjobs} alt="" />
              </div>
              <div className="jobs-box">
                <div className="jobs-top d-flex  justify-content-between">
                  <h3 className="jobs-top-name">May quần tây - Công Định</h3>
                  <img src={icondot} alt="" />
                </div>
                <div className="d-flex gap-3">
                  <div className="jobs-staff">
                    <img
                      src="https://i.pinimg.com/564x/ef/fe/49/effe49ec61109cdc67491b6c56503eab.jpg"
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="jobs-staff-name">Công Định - 0346936427</p>
                    <p className="jobs-staff-name">
                      Sử dụng vải cơ sở may: <strong>Không</strong>
                    </p>
                  </div>
                </div>
                <div className="d-flex gap-3">
                  <div className="jobs-staff">
                    <img
                      src="https://i.pinimg.com/564x/d3/c5/c1/d3c5c1f6cb8a52a6a76cac36b24f9c2d.jpg"
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="jobs-staff-name">
                      May theo mẫu:{" "}
                      <strong> Quần tây nam dáng baggy suông đen</strong>
                    </p>
                    <p className="jobs-staff-name">Note:</p>
                    <p className="jobs-staff-name">
                      Thời gian:{" "}
                      <strong className="text-dark">
                        {" "}
                        01/04/2023 - 01/05/2023
                      </strong>
                    </p>
                    <div className="jobs-status d-flex">
                      <p className="jobs-staff-name">Trạng thái:</p>
                      <div className="status">
                        <div className="jobs-status-one">Trễ hạn</div>
                        <div className="jobs-status-one work-status">
                          Chưa thực hiện
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}

export default Jobs;
