import React, { useState } from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import ToastMessage from "../ToastMessage";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from "../../firebase";
import CircularLoading from "../CircularLoading";
import userService from "../../services/user.services";

function MobileNumberComponentForgotPassword({
  mobile,
  setMobile,
  errors,
  setErrors,
  setStep,
  setVerificationCode,
}) {
  const [loading, setLoading] = useState(false);

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
      size: "invisible",
      callback: (response) => {},
    });
  };

  const mobileAvailableOrNot = async (mobile) => {
    const available = await userService.getUserFromMobile(mobile);
    if (available) {
      return true;
    } else {
      return false;
    }
  };

  const validateMobile = async (value) => {
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

  const handleSendVerificationCode = async () => {
    const checkMobile = await validateMobile(mobile);
    if (!checkMobile) {
      return;
    }
    setLoading(true);
    const available = await mobileAvailableOrNot(mobile);
    if (!available) {
      setErrors({
        ...errors,
        mobile: "Mobile Number Not Available!",
      });
      setLoading(false);
      return;
    }
    if (available && validateMobile(mobile)) {
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      let phoneNumber = "+91" + mobile;
      // console.log(phoneNumber);

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
          // console.error("OTP sending error:", error);
          ToastMessage({
            message: "Unable to send OTP!",
            type: "error",
          });
          alert(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <LazyLoadComponent>
        <h2>Forgot Password</h2>
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
          disabled={loading}
        >
          Send Code
        </button>
        {loading && <CircularLoading />}
        <div id="recaptcha" style={{ display: "none" }}></div>
      </LazyLoadComponent>
    </>
  );
}

export default MobileNumberComponentForgotPassword;
