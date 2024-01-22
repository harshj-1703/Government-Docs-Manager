import React from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import ToastMessage from "../ToastMessage";

function MobileNumberComponent ({mobile,setMobile,errors,setErrors,setStep,setVerificationCode}){
    const validateMobile = (value) => {
        if (/^\d{10}$/.test(value)) {
          setErrors({ ...errors, mobile: "" });
          return true;
        } else {
          setErrors({
            ...errors,
            mobile: "Invalid mobile number.",
          });
          return false;
        }
      };
    
      const handleSendVerificationCode = () => {
        if (validateMobile(mobile)) {
          setVerificationCode("123456");
          setStep(2);
          setErrors({});
          ToastMessage({
            message: "Verification code sent successfully!",
            type: "success",
          });
          // Uncomment the line below if you want to display an error message
          // ToastMessage({
          //   message: "Unable to send OTP!",
          //   type: "error",
          // });
        }
      };
    return (
        <>
        <LazyLoadComponent>
            <h2>Enter Your Mobile Number</h2>
            <div>
              <input
                type="tel"
                placeholder="Enter your mobile number"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                  validateMobile(e.target.value);
                }}
                maxLength={10}
              />
              {errors.mobile && <span className="error">{errors.mobile}</span>}
            </div>
            <div id="recaptcha-container"></div>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSendVerificationCode();
              }}
              className="registration-button"
            >
              Send Code
            </button>
          </LazyLoadComponent>
        </>
    );
}

export default MobileNumberComponent;