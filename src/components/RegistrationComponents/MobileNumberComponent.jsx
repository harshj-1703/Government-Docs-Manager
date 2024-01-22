import React, { useRef } from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import ToastMessage from "../ToastMessage";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from "../../firebase";

function MobileNumberComponent({
  mobile,
  setMobile,
  errors,
  setErrors,
  setStep,
  setVerificationCode,
}) {
  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
      size: "invisible",
      callback: (response) => {},
    });
  };

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
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      let phoneNumber = "+91" + mobile;
      console.log(phoneNumber);

      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((result) => {
          // console.log(result);
          setVerificationCode(result);
          setStep(2);
          setErrors({});
          ToastMessage({
            message: "Verification code sent successfully!",
            type: "success",
          });
        })
        .catch((err) => {
          ToastMessage({
            message: "Unable to send OTP!",
            type: "error",
          });
          alert(err.message);
        });
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
        <button
          onClick={(e) => {
            e.preventDefault();
            handleSendVerificationCode();
          }}
          className="registration-button"
        >
          Send Code
        </button>
        <div id="recaptcha" style={{display:"none"}}></div>
      </LazyLoadComponent>
    </>
  );
}

export default MobileNumberComponent;
