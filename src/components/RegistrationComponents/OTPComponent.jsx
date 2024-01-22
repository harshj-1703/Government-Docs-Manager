import React, { useState, useEffect } from "react";
import ToastMessage from "../ToastMessage";
import OTPInput from "react-otp-input";
import { LazyLoadComponent } from "react-lazy-load-image-component";

function OTPComponent({ otp, setOtp, verificationCode, setStep }) {
  const [seconds, setSeconds] = useState(150);
  const [timer, setTimer] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimer(
      setInterval(() => setSeconds((prevSeconds) => prevSeconds - 1), 1000)
    );
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(timer);
      setStep(1);
      ToastMessage({
        message: "OTP timeout. Please request a new code.",
        type: "error",
      });
    }
  }, [seconds, timer, setStep]);

  const handleVerifyCode = () => {
    setLoading(true);
    clearInterval(timer);
    verificationCode
      .confirm(otp)
      .then((result) => {
        setStep(3);
        ToastMessage({
          message: "Verification successful!",
          type: "success",
        });
      })
      .catch((error) => {
        // console.error("OTP verification error:", error);
        ToastMessage({
          message: "OTP not valid!",
          type: "error",
        });
      }).finally(() => {
        setLoading(false);
      });;
  };
  return (
    <>
      <LazyLoadComponent>
        <h2>Enter the verification code</h2>
        <div className="time-out">Time left: {seconds} seconds</div>
        <div id="otp-input">
          <OTPInput
            value={otp}
            onChange={(code) => {
              setOtp(code);
            }}
            numInputs={6}
            inputType={"number"}
            isInputNum={true}
            skipDefaultStyles={true}
            // renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleVerifyCode();
          }}
          className="registration-button"
        >
          Verify Code
        </button>
        {loading && <div className="loading-spinner">xyz</div>}
      </LazyLoadComponent>
    </>
  );
}

export default OTPComponent;
