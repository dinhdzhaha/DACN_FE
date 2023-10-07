import React from "react";
import { toast } from "react-toastify";


const showToastMessageError = (mess) => {
    toast.error(mess, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
});
};
const showToastMessageSuccess = (mess) => {
toast.success(mess, {
    duration: 1500,
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light"
});
};
export {showToastMessageError,showToastMessageSuccess};