import React, { useState,useEffect } from 'react';
import axios from 'axios';
import "../../../assets/style/custom/sample/sample.scss"
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function DetailSample()
{
    const navigation = useNavigate();
    const userAuth = JSON.parse(localStorage.getItem("userAuth"));
    const baseURL = import.meta.env.VITE_API_URL;
    const [sample, setSample]= useState(null);
    const [isLiked, setIsLiked]= useState(false);
    const yourConfig = {
        headers: {
        Authorization: "Bearer " + userAuth?.token
        }
    };
    let { id } = useParams();
    useEffect(() => { 
        axios.get(baseURL+`api/Sample/GetSample?id=${id}`,yourConfig).then((res) => {
            setSample(res.data);
            }).catch((err) => {
                console.log(err);
            });
        if(userAuth!==null) {
            axios.get(baseURL+`api/UserSample/CheckLiked?userId=${userAuth?.id}&sampleId=${id}`,yourConfig).then((res) => {
                setIsLiked(res.data);
            }).catch((err) => {
                console.log(err);
                navigation("/sample");
            });
            return;
        }
    },[]);
    const handleIcon=(isLiked)=>{
        if(userAuth!==null)
        {
            setIsLiked(isLiked);
            if(isLiked){
                const body=
                {
                    userId: userAuth.id,
                    sampleId: id
                }
                axios.post(baseURL+`api/UserSample/CreateUserSample`,body,yourConfig).then((res) => {
                }).catch((err) => {
                    console.log(err);
                });
            }
            else{
                const data={
                    "userId": userAuth?.id,
                    "sampleId": id,
                    "liked": isLiked
                };
                axios.put(baseURL+`api/UserSample/UpdateUserSample`,data,yourConfig).then((res) => {
                }).catch((err) => {
                    console.log(err);
                });
            }
        }
    };
    return (
        <div className='sample'>
            <nav aria-label="breadcrumb" className='breadcrumb-sample'>
                <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link
                    to="/sample"
                    className="breadcrumb-account text-decoration-none p-0"
                    >
                    Sản phẩm mẫu
                    </Link>
                </li>
                <li
                    className="breadcrumb-item text-decoration-none "
                    aria-current="page"
                >
                    Thông tin chi tiết
                </li>
                </ol>
            </nav>
            <div className='sample-type'>
                <div className='sample-product d-flex' >
                    <div className='width-15'>
                        <div className='sample-product-img1'>
                            <img className='sample-product-img1-detail1' src={sample?.images} alt="sample-product-img"/>
                        </div>   
                    </div>
                    <div className="container sample-product-container text-end width-35">
                        <div className='sample-product-img sample-img-detail'>
                            <img className='sample-product-img-detail' src={sample?.images} alt="sample-product-img"/>
                        </div>    
                    </div>
                    <div className="container sample-product-container text-center width-50">
                        <div className='sample-product-icon'>
                            <div className='d-flex'>
                                <p className='nameSample'>{sample?.name}</p>
                                <div className='icon-detail-sample'>
                                    <div className='icon-icon'>
                                        <i className="fas fa-heart heart-icon sample-width-icon" id={`${isLiked? "like-index1" : ""}`} onClick={()=>{handleIcon(!isLiked)}}></i>
                                    </div>
                                    <div>
                                        Yêu thích
                                    </div>
                                </div>
                            </div>
                            <div className='sample-product-information sample-price d-flex'>
                                <p className='price-title'>Giá:</p>
                                <p className='price-price'>{sample?.price.toLocaleString('vi-VN')} đ</p>
                            </div>
                            <div className='sample-note'>
                                <p className='sample-note-title'>Mô tả: </p>
                                <textarea
                                value={sample?.description}
                                placeholder="Mô tả..."
                                className="contentTask sample-note-text"
                                cols={70}
                                rows={8}
                                disabled
                                />
                                {/* <input
                                type="text" 
                                // value={sample?.description}
                                value=
                                placeholder="Mô tả" 
                                className="sample-note-text"
                                disabled
                                ></input> */}
                            </div>
                            <div className='sample-note'>
                                <p className='sample-note-title'>Note: </p>
                                <textarea
                                value={sample?.note}
                                placeholder="Chú thích..."
                                className="contentTask sample-note-text"
                                cols={70}
                                rows={2}
                                disabled
                                />
                            </div>
                        </div>   
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DetailSample;