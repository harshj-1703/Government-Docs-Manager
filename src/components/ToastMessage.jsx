import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastMessage = ({ message, type, closeTime = 5000 }) => {
  const showToast = () => {
    toast[type](message, {
      position: "bottom-right",
      autoClose: closeTime,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return <div>{showToast()}</div>;
};

export default ToastMessage;
