import React from "react";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import carts from "../../../assets/cart/Rectangle7.svg";
import axios from "axios";
import "../../../assets/style/custom/cart/cart.scss";
import { parse, differenceInDays, format, parseISO } from "date-fns";
import { Progress } from 'rsuite';
import { Space, Table, Tag } from 'antd';

const handleTag=(tag)=>{

  let color_ ='';
  let tag_=''
  if(tag=='todo')
  {
    tag_='chưa thực hiện'
    color_='red'
  }
  else if(tag=='done')
  {
    tag_='đã hoàn thành'
    color_='blue'
  }
  else if(tag=='doing')
  {
    tag_='đang thực hiện'
    color_='orange'
  }
  else if(tag=='complete')
  {
    tag_='đã nhận'
    color_='green'
  }
  return (
    <Tag color={color_} key={tag}>
      {tag_.toUpperCase()}
    </Tag>
  );
}
const columns = [
  {
    title: 'Sản phẩm',
    dataIndex: 'product',
    key: 'product',
    render: (text) => (
      <div className=" d-flex align-items-center">
        <img src={text.image} width={"70px"} height={"80px"} alt=''></img>
        <div className="product-cart">
          <div className="product-cart__name">
            <p className="mb-0">{text.name}</p>
            <p className="mb-0 font-15">{text.category}</p>
          </div>
      </div>
      </div>
    ),
  },
  {
    title: 'Giá tiền',
    dataIndex: 'price',
    key: 'price',
    render: (text) => <div className="price-cart">{text}</div>,
  },
  {
    title: 'Thời gian',
    dataIndex: 'time',
    key: 'time',
    render: (text) => <div className="time-cart">{text}</div>,
  },
  {
    title: 'Trạng thái',
    key: 'tag',
    dataIndex: 'tag',
    render: (_, { tag }) => (
      <>
        {
          handleTag(tag)
        }
      </>
    ),
  },
  {
    title: '',
    key: 'action',
    render: (_, record) => (
      record.percent==0?
      <Progress.Line percent={0} strokeWidth={15} trailColor="#bababf" status="fail" />
      :record.percent==25?
      <Progress.Line percent={25} strokeWidth={15} strokeColor="#FF9F38" status="active" />
      :record.percent==50?
      <Progress.Line percent={50} strokeWidth={10} strokeColor="#FF9F38" status="active"/>
      :record.percent==75?
      <Progress.Line percent={75} strokeWidth={10} strokeColor="#FF9F38" status="active"/>
      :
      <Progress.Line percent={100} strokeWidth={10} strokeColor="#20df7f" status="success"/>
    ),
    width: "25%"
  },
];



function cart() {
  const userAuth = JSON.parse(localStorage.getItem("userAuth"));
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_URL;
  const [data,setData]= useState([]);
  const yourConfig = {
    headers: {
        Authorization: "Bearer " + userAuth?.token
    }
  };
  useEffect(() => {
      if (userAuth===null) {
          navigate("/login");
          return;
      }
      axios.get(baseURL+`api/Task/GetTasksByUserIdQuery?userId=${userAuth?.id}`,yourConfig).then((res) => {
        setData(res.data.map((c,index) => {
          const startDate = new Date(c.startTime);
          const strStartDate=format(startDate, 'yyyy-MM-dd');
          const endDate = new Date(c.endTime);
          const strEndDate=format(endDate, 'yyyy-MM-dd');
          return {
            key: index,
            product: {name:c.product.name,image:c.product.images,category:c.product.productCategory.name},
            price: c.product.price.toLocaleString('vi-VN')+ " đ",
            time: strStartDate + " -> " + strEndDate,
            tag: c.status,
            percent: c.percent
          }
        }));
      }).catch((err) => {
      });
    },[]);
  const handlePrice=(item)=>{
    if(item.isUseCloth)
    {
      return (item.product.price + item.product.priceCloth).toLocaleString('vi-VN')+" đ";
    }
    return item.product.price.toLocaleString('vi-VN')+" đ";
  }
  const handlerTime=(time)=>{
    const date = new Date(time);
    return(format(date, 'yyyy-MM-dd'));
  }
  const [task,setTask]=useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Assuming 'task' is your array of tasks
  const paginatedTasks = task.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="cart">
      <Table columns={columns} dataSource={data} rowClassName={(record, index) => 
        {
          if(record.tag=="todo" || record.tag=="done" || record.tag=="doing")
            return (index % 2 === 0 ? 'even-row' : 'odd-row')
          return (index % 2 === 0 ? 'even-row opacity' : 'odd-row opacity')
        }
        }/>
    </div>
  );
}

export default cart;
