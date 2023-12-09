import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import { parse, differenceInDays, format, parseISO } from "date-fns";
const TaskCard = ({ item, index }) => {
  const navigate = useNavigate();
  const handleNavigate = (id) => {
    navigate(`/updateJob/${id}`);
  };
  const handleTime=(utcDateStr) => {
    let localDate = new Date(); // Ngày hiện tại ở múi giờ cục bộ
    let utcDate = parse(utcDateStr, "yyyy-MM-dd'T'HH:mm:ss", new Date()); // Chuyển đổi ngày UTC từ chuỗi
    if(utcDateStr.includes('.')) utcDate = parse(utcDateStr, "yyyy-MM-dd'T'HH:mm:ss.SSSSSS", new Date()); // Chuyển đổi ngày UTC từ chuỗi
    const result=differenceInDays(utcDate, localDate);
    return result;
  };
  const handleTimeDone = (time1, time2) => {
  
    // Parse the input strings into Date objects using the specified format
    let utcDateEnd = parse(time1, "yyyy-MM-dd'T'HH:mm:ss", new Date());
    let utcDateDone = parse(time2, "yyyy-MM-dd'T'HH:mm:ss", new Date());
    if(time1.includes('.')) utcDateEnd = parse(time1, "yyyy-MM-dd'T'HH:mm:ss.SSSSSS", new Date()); // Chuyển đổi ngày UTC từ chuỗi
    if(time2.includes('.'))
    {
      utcDateDone = parse(time2, "yyyy-MM-dd'T'HH:mm:ss.SSSSSS", new Date()); // Chuyển đổi ngày UTC từ chuỗi
    }
    // Calculate the difference in days between the two dates
    const result = differenceInDays(utcDateEnd, utcDateDone);
    // Return the calculated difference in days
    return result;
  };
  //text-1:remainingTimeLong >7 ngày
  //text-2:approachingDeadline <7 ngày
  //text-3:reachedDeadline
  const handleStatusChange=(status)=>{
    if(status ==="text-1"){
      return "background-1"
    }else if(status ==="text-2"){
      return "background-2"
    }else if(status ==="text-3"){
      return "background-3"
    }
  }
  const status= (result, flag=false)=>
  {
    if(!flag)
    {
      if(result>7)
        return "text-3";
      else if(result>=0)
        return "text-2";
      else
        return "text-1";
    }
    else
    {
      if(result>=0)
        return "text-3";
      else
        return "text-1";
    }
  }
  const handleDate=(time)=>
  {
    if(time==="" || time===null) return "";
    const date = parseISO(time);
    return format(date, 'dd/MM/yyyy');
  }
  return (
    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={()=>
            handleNavigate(item.id)
          }
          className="hover-scss"
        >
              <div className="jobs-box">
                <div className="jobs-top d-flex width-name align-items-center">
                  <div className="width-avatar">
                    <img
                    className="width-avatar"
                    src={item.sample.images}
                    alt=""
                    />
                  </div>
                  <div className=" m-2">
                    <h3 className="jobs-top-name two-line-ellipsis">{item.product.name}</h3>
                  </div>
                </div>
                <div className="d-flex gap-3">
                  <div className="jobs-staff">
                    <img
                      src={item.user.avatar}
                      alt=""
                    />
                  </div>
                  <div className="width-field jobs-staff-name-name d-flex align-items-center">
                  <strong className="two-line-ellipsis">{item.user.firstName} {item.user.lastName} - {item.user.phone}</strong>
                  </div>
                </div>
                <div className="d-flex gap-3">
                  <div className="jobs-staff">
                    {
                      item.sample&&<img
                        src={item.sample.images}
                        alt=""
                      />
                    }
                  </div>
                  <div className="">
                    <div className="width-field jobs-staff-name-name align-middle d-flex align-items-center">
                      <p className="jobs-staff-name two-line-ellipsis">
                        May theo mẫu:{" "}
                        {
                          item.sample !=null? <strong>{item.sample.name}</strong>:<strong>Không</strong>
                        }
                      </p>
                    </div>
                    <div className="width-field jobs-staff-name-name align-middle d-flex align-items-center">
                      <p className="jobs-staff-name two-line-ellipsis">Note: {" "}
                      <strong>{item.note}</strong>
                      </p>
                    </div>
                    <div className="width-field">
                      <p className="jobs-staff-name">
                        Sử dụng vải cơ sở   may: <strong>Không</strong>
                      </p>
                    </div>
                    <div className=" d-flex jobs-time">
                      <p className="jobs-staff-name-time">
                        Thời gian:{" "}
                      </p>
                      <div>
                        <div className="text-dark css-text-dark">
                          {handleDate(item.startTime)} 
                        </div>
                        <div className="icon d-flex align-items-center justify-content-center">
                          <i className="fa-solid fa-arrow-down"></i>
                        </div>
                        <div className="text-dark css-text-dark">
                          {handleDate(item.endTime)}
                        </div>
                      </div>
                    </div>
                    <div className="jobs-status d-flex font-size">
                      <p className="jobs-staff-status">Trạng thái:</p>
                      <div className="status">
                        {
                        (item.status!="done" && item.status!="complete")?<div className={"jobs-status-one "+ handleStatusChange(status(handleTime(item.endTime)))}>
                          {
                            handleTime(item.endTime)>7?"Thời gian còn dài":
                            handleTime(item.endTime)>=0?"Gần tới hạn":
                            "Trễ hạn"
                          }
                        </div>
                        :
                        item.status=="done"?
                        <div className={"jobs-status-one "+ handleStatusChange(status(handleTimeDone(item.endTime,item .doneDate),true))}>
                          {
                            handleTimeDone(item.endTime,item.doneDate)>0?"Trước thời hạn":handleTimeDone(item.endTime,item.doneDate)==0? "Đúng thời hạn": "Trễ hạn"
                          }
                        </div>:
                        <div className={"jobs-status-one "+ handleStatusChange(status(handleTimeDone(item.endTime,item .completeDate),true))}>
                        {
                          handleTimeDone(item.endTime,item.completeDate)>0?"Trước thời hạn": handleTimeDone(item.endTime,item.completeDate)==0? "Đúng thời hạn": "Trễ hạn"
                        }
                        </div>
                        }
                      </div>
                    </div>
                    <div className={`width-field font-size-12 ${(item.status!="done" && item.status!="complete")?status(handleTime(item.endTime)):item.status=="done"? status(handleTimeDone(item.endTime,item .doneDate),true):status(handleTimeDone(item.endTime,item .completeDate),true)}`}>
                      {
                        (item.status!="done" && item.status!="complete")?
                        handleTime(item.endTime)>0?<span>(Thời gian còn lại: {handleTime(item.endTime)} ngày)</span>:
                        <span>(Đã quá hạn: {Math.abs(handleTime(item.endTime))} ngày)</span>
                        :item.status=="done"?<span>(Đã hoàn thành ngày {handleDate(item .doneDate)})</span>:<span>(Đã giao hàng ngày {handleDate(item.completeDate)})</span>
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="line"></div>
            </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
