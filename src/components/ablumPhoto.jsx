import React, { useState } from 'react';
import { PhotoAlbum } from "react-photo-album";
import { Photo } from '@mui/icons-material';
import axios from "axios";
import { ConfirmToast } from 'react-confirm-toast';
import { showToastMessageError,showToastMessageSuccess } from "../components/toast";
import "../assets/style/components/ablumPhoto.scss";

const renderContainer = ({ containerProps, children, containerRef }) => (
<div
style={{
    border: "2px solid #eee",
    borderRadius: "10px",
    paddingLeft: "30px",
    paddingBottom: "20px",
    paddingTop: "20px"
}}
>
    <div ref={containerRef} {...containerProps}>
        {children}
    </div>
</div>
);

const renderRowContainer = ({ rowContainerProps, rowIndex, rowsCount, children }) => (
<>
    <div  {...rowContainerProps}>{children}</div>
        

</>
);


export default function Album(props) {
    const userAuth = JSON.parse(localStorage.getItem("userAuth"));
    const baseURL = import.meta.env.VITE_API_URL;
    
    const renderPhoto = ({ layout, layoutOptions, imageProps: { alt, style, key, ...restImageProps } }) =>{
        const [isHovered, setIsHovered] = useState(false);
        const myFunction = (image) => {
            if(image.title!=null && image.title !='')
            {
                const yourConfig = {
                    headers: {
                        Authorization: "Bearer " + userAuth?.token
                    },
                    data: {
                        id:image.title
                    }
                };
                const config = yourConfig;
                axios.delete(baseURL+`api/ImageProductControl/DeleteImage`,config).then((res) => {
                    props.setPhotos(props.photos.filter((photo) => photo.title !== image.title));
                    showToastMessageSuccess("Đã xóa thành công!");
                }).catch((err) => {
                    console.log(err);
                });
            }
            else
            {
                props.setPhotos(props.photos.filter((photo) => photo.src !== image.src));
            }
        }
    return(
    <div
    style={{
        boxSizing: "content-box",
        display: "flex",
    }}
    >
        <img alt={alt} style={{ ...style, width: "220px",height:"200px", padding: 0 }} {...restImageProps} />
        {
            <div
            style={{
            marginLeft: "-25px",
            alignItems: "start",
            }}
            >
                <ConfirmToast
                asModal={true}
                customCancel={'Hủy'}
                customConfirm={'Xóa'}
                customFunction={()=>myFunction(restImageProps)}
                message={'Bạn có chắc xóa các tài khoản đã chọn?'}
                position={'top-left'}
                showCloseIcon={true}
                theme={'light'}
                >
                <button
                    className="closes"
                    style={{
                        padding: "2px 5px",
                        backgroundColor: isHovered ? "rgba(255, 255, 255)" : "rgba(255, 255, 255, 0.4)",
                        borderRadius:"7px 0px 0px 7px"
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <i className="fa-regular fa-circle-xmark"></i>
                </button>
                </ConfirmToast>
                {isHovered&&<div className="hovered-span"><span>Xóa ảnh</span></div>}
            </div>
        }
    </div>
    );
    }
return (
<PhotoAlbum
    layout="masonry"
    photos={props.photos}
    columns={3}
    renderContainer={renderContainer}
    renderRowContainer={renderRowContainer}
    renderPhoto={renderPhoto}
/>
);
}
