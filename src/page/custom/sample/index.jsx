import React, { useState,useEffect } from 'react';
import axios from 'axios';
import "../../../assets/style/custom/sample/sample.scss"
import Carousel from 'react-grid-carousel'
import { useNavigate } from 'react-router-dom';

function SampleProduct()
{
    const navigation = useNavigate();
    const userAuth = JSON.parse(localStorage.getItem("userAuth"));
    const baseURL = import.meta.env.VITE_API_URL;
    const [listSamples,setListSamples]=useState([]);
    const [listSamplesIdLike,setListSamplesIdLike]=useState([]);
    const [listSampleProduct,setListSampleProduct]=useState([]);
    const [isShowLineMale, setIsShowLineMale]=useState(true);
    const yourConfig = {
        headers: {
        Authorization: "Bearer " + userAuth?.token
        }
    };
    const [category, setCategory]=useState([]);
    useEffect(() => { 
        let listLike=null;
        
        axios.get(baseURL+`api/ProductCategory/GetAllProductCategory`,yourConfig).then((res) => {
            setCategory(res.data);
            const productCategoryId= res.data[0].id;
            if(userAuth===null) {
                axios.get(baseURL+`api/Sample/GetSamples`,yourConfig).then((res) => {
                    setListSamples(res.data);
                    setListSampleProduct(res.data.filter((item)=>item.productCategoryId === productCategoryId && item.isMale==isShowLineMale).map((item, index) => ({
                        id: item.id,
                        productCategoryId: item.productCategoryId,
                        img: item.images,
                        name: item.name,
                        price: item.price,
                        isMale: item.isMale,
                        like: false
                    })));
                    }).catch((err) => {
                        console.log(err);
                    });
                return;
            }
            axios.get(baseURL+`api/UserSample/GetUserSampleByUserQuery?userId=${userAuth.id}`,yourConfig).then((res) => {
                listLike=res.data;
                axios.get(baseURL+`api/Sample/GetSamples`,yourConfig).then((res) => {
                    setListSamples(res.data);
                    setListSampleProduct(res.data.filter((item)=>item.productCategoryId === productCategoryId && item.isMale==isShowLineMale).map((item, index) => ({
                        id: item.id,
                        productCategoryId: item.productCategoryId,
                        img: item.images,
                        name: item.name,
                        price: item.price,
                        isMale: item.isMale,
                        like: listLike.some((itemLike) => itemLike.sampleId === item.id)
                    })));
                    }).catch((err) => {
                        console.log(err);
                    });
                setListSamplesIdLike(res.data);
            }).catch((err) => {
                console.log(err);
            });
            }).catch((err) => {
                console.log(err);
            });
    },[]);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleDivClick = (index) => {
        setActiveIndex(index);
        const productCategoryId= category[index].id;
        const newSample=listSamples.map((item, index) => ({
            id: item.id,
            productCategoryId: item.productCategoryId,
            img: item.images,
            name: item.name,
            price: item.price,
            isMale: item.isMale,
            like: listSamplesIdLike.some((itemLike) => itemLike.sampleId === item.id)
        })).filter((item) => item.productCategoryId === productCategoryId && item.isMale===isShowLineMale);
        setListSampleProduct(newSample);
    };
    const handleSexMale = () => {
        setIsShowLineMale(true);
        console.log(listSamples);
        const productCategoryId= category[activeIndex].id;
        setListSampleProduct(listSamples.filter((item)=>item.isMale && item.productCategoryId === productCategoryId).map((item, index) => ({
            id: item.id,
            productCategoryId: item.productCategoryId,
            img: item.images,
            name: item.name,
            price: item.price,
            isMale: item.isMale,
            like: listSamplesIdLike.some((itemLike) => itemLike.sampleId === item.id)
        })));
    };
    const handleSexFemale = () => {
        setIsShowLineMale(false);
        const productCategoryId= category[activeIndex].id;
        setListSampleProduct(listSamples.filter((item)=>!item.isMale && item.productCategoryId === productCategoryId).map((item, index) => ({
            id: item.id,
            productCategoryId: item.productCategoryId,
            img: item.images,
            name: item.name,
            price: item.price,
            isMale: item.isMale,
            like: listSamplesIdLike.some((itemLike) => itemLike.sampleId === item.id)
        })));
    };
    const MyDot = ({ isActive }) => (
        <span
        style={{
        marginTop: '10px',
        display: 'inline-block',
        height: isActive ? '8px' : '5px',
        width: isActive ? '20px' : '5px',
        background: '#5449a4',
        borderRadius: 50,
        }}
        ></span>
    )
    const handleIcon=(index)=>{
        if(userAuth===null) return;
        const updatedList = [...listSampleProduct];

        // Cập nhật trạng thái "thích" của phần tử tại chỉ mục index
        updatedList[index].like = !updatedList[index].like;

        // Sử dụng setListSampleProduct để cập nhật mảng
        setListSampleProduct(updatedList);
        if(updatedList[index].like){
            const body=
            {
                userId: userAuth.id,
                sampleId: updatedList[index].id
            }
            axios.post(baseURL+`api/UserSample/CreateUserSample`,body,yourConfig).then((res) => {
                axios.get(baseURL+`api/UserSample/GetUserSampleByUserQuery?userId=${userAuth.id}`,yourConfig).then((res) => {
                    setListSamplesIdLike(res.data);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        }
        else{
            const idDelete=listSamplesIdLike.find((item) => item.sampleId === updatedList[index].id).id;
            const config={
                headers: {
                Authorization: "Bearer " + userAuth?.token
                },
                data: {
                    "id": idDelete
                }
            };
            axios.delete(baseURL+`api/UserSample/DeleteUserSample`,config).then((res) => {
                let updateListSampleIdLike=listSamplesIdLike.filter((item) => item.sampleId !== idDelete);
                console.log(res);
            }).catch((err) => {
                console.log(err);
            });
        }
    };
    return (
        <div className='sample'>
            <div className='sample-type'>
                <div className='sample-type-sex text-center'>
                    <div>
                        <div className='sample-type-sex-male' onClick={handleSexMale}>Dành cho nam</div>
                        {isShowLineMale &&<div className='sample-type-sex-thin-line'></div>}
                    </div>
                    <div>
                        <div className='sample-type-sex-female' onClick={handleSexFemale}>Dành cho nữ</div>
                        {!isShowLineMale &&<div className='sample-type-sex-thin-line-female'></div>}
                    </div>
                </div>
                <div className='sample-type-clothe text-center'>
                {category.map((content, index) => (
                        <div
                        key={index}
                        className={`sample-type-clothe-label text-center ${activeIndex === index ? 'active-index' : ''}`}
                        onClick={() => handleDivClick(index)}
                        >
                            {content.name}
                        </div>
                        )
                    )
                }
                </div>
            </div>
            <div className='sample-product'>
                <div className="container sample-product-container text-center">
                    {
                    listSampleProduct.length>0?<Carousel cols={4} rows={1} gap={20} loop dot={MyDot} dotColorActive="true" showDots>
                        { listSampleProduct.map((item, index) => (
                            <Carousel.Item key={index}>
                                <div className="col sample-product-product text-center">
                                    <div className='sample-product-icon'>
                                        <i className="fas fa-heart heart-icon" id={`${item?.like ? "like-index" : ""}`} onClick={()=>{handleIcon(index)}}></i>
                                        <span className="like-text">{item.like?"Bỏ thích":"Thích"}</span>
                                    </div>                        
                                    <div className='sample-product-img'  onClick={()=>navigation(`/sample/${item.id}`)}>
                                        <img className='sample-product-img-img' src={item?.img} alt="sample-product-img"/>
                                    </div>                        
                                    <div className='sample-product-name'  onClick={()=>navigation(`/sample/${item.id}`)}>
                                        <p className='two-line-ellipsis name-sample'>{item?.name}</p>
                                    </div>                        
                                    <div className='sample-product-information'  onClick={()=>navigation(`/sample/${item.id}`)}>{item?.price.toLocaleString('vi-VN')} đ</div>                        
                                </div>
                            </Carousel.Item>
                        ))
                        }
                        
                    </Carousel>
                    :<div className="sample-product-no-product">Không có sản phẩm nào</div>}
                </div>
            </div>
        </div>
    );
}
export default SampleProduct;