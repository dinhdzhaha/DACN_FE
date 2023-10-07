import React, { useState } from 'react';
import "../../../assets/style/custom/sample/sample.scss"
import Carousel from 'react-grid-carousel'

function SampleProduct()
{
    const [sex, setSex]=useState("male")
    const [type, setType]=useState("Quần tây")
    const [isShowLineMale, setIsShowLineMale]=useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleDivClick = (index) => {
        setActiveIndex(index);
    };
    const handleSexMale = () => {
        setSex("male");
        setIsShowLineMale(true);
    };
    const handleSexFemale = () => {
        setSex("female");
        setIsShowLineMale(false);
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
    const divs = ['Quần tây', 'Áo sơ mi', 'Áo khoác', 'Áo thun'];
    const [listSampleProduct,set]=useState([{
        like:true,
        img:"https://picsum.photos/800/600?random=1",
        information:"100.000đ"
    },{
        like:true,
        img:"https://picsum.photos/800/600?random=1",
        information:"100.000đ"
    },{
        like:true,
        img:"https://picsum.photos/800/600?random=1",
        information:"100.000đ"
    },{
        like:false,
        img:"https://picsum.photos/800/600?random=1",
        information:"100.000đ"
    }]);
    const handleIcon=(index)=>{
        const updatedList = [...listSampleProduct];
  
  // Cập nhật trạng thái "thích" của phần tử tại chỉ mục index
        updatedList[index].like = !updatedList[index].like;

        // Sử dụng setListSampleProduct để cập nhật mảng
        set(updatedList);
    };
    console.log(listSampleProduct);
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
                {divs.map((content, index) => (
                        <div
                        key={index}
                        className={`sample-type-clothe-label text-center ${activeIndex === index ? 'active-index' : ''}`}
                        onClick={() => handleDivClick(index)}
                        >
                            {content}
                        </div>
                        )
                    )
                }
                </div>
            </div>
            <div className='sample-product'>
                <div className="container sample-product-container text-center">
                    {/* <div className='sample-product-icon-left'>
                        <img className='sample-product-icon' src={leftIcon} alt="left-icon"/>
                    </div>
                    <div className="row">
                        <div className="col sample-product-product">
                            <div className='sample-product-icon'></div>                        
                            <div className='sample-product-img'></div>                        
                            <div className='sample-product-img'></div>                        
                        </div>
                        <div className="col sample-product-product">
                        Col sample-product-productumn
                        </div>
                        <div className="col sample-product-product">
                        Col sample-product-productumn
                        </div>
                        <div className="col sample-product-product">
                        Col sample-product-productumn
                        </div>
                    </div>
                    <div className='sample-product-icon-right'>
                        <img className='sample-product-icon' src={rightIcon} alt="right-icon"/>
                    </div> */}
                    <Carousel cols={4} rows={1} gap={50} loop dot={MyDot} dotColorActive="true" showDots>
                        { listSampleProduct.map((item, index) => (
                            <Carousel.Item key={index}>
                                <div className="col sample-product-product text-center">
                                    <div className='sample-product-icon'>
                                        <i className="fas fa-heart heart-icon" id={`${item.like ? "like-index" : ""}`} onClick={()=>{handleIcon(index)}}></i>
                                        <span className="like-text">{item.like?"Bỏ thích":"Thích"}</span>
                                    </div>                        
                                    <div className='sample-product-img'>
                                        <img className='sample-product-img-img' src={item.img} alt="sample-product-img"/>
                                    </div>                        
                                    <div className='sample-product-information'>{item.information}</div>                        
                                </div>
                            </Carousel.Item>
                        ))
                        }
                        
                    </Carousel>
                </div>
            </div>
        </div>
    );
}
export default SampleProduct;