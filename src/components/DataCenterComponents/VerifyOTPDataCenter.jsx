import React, { useState, useEffect } from "react";
import OTPInput from "react-otp-input";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import ToastMessage from "../ToastMessage";
import CircularLoading from "../CircularLoading";
import { useNavigate } from "react-router-dom";
import dataCenterServices from "../../services/data-center.services";

function VerifyOTPDataCenter({
  mobile,
  otp,
  setOtp,
  verificationCode,
  setStep,
}) {
  const [seconds, setSeconds] = useState(150);
  const [timer, setTimer] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimer(
      setInterval(() => setSeconds((prevSeconds) => prevSeconds - 1), 1000)
    );
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(timer);
      ToastMessage({
        message: "OTP timeout. Please request a new code.",
        type: "error",
      });
      setStep(0);
    }
  }, [seconds, timer]);

  const handleVerifyOTP = () => {
    setLoading(true);
    clearInterval(timer);
    verificationCode
      .confirm(otp)
      .then((result) => {
        ToastMessage({
          message: "Verification successful!",
          type: "success",
        });
        dataCenterServices
          .getDataCenterFromMobile(mobile)
          .then((result) => {
            localStorage.setItem("isLoggedIn", 1);
            localStorage.setItem("mobile", mobile);
            localStorage.setItem("imageurl", result.user.imageurl);
            localStorage.setItem("city", result.user.city);
            localStorage.setItem("state", result.user.state);
            localStorage.setItem("person1", result.user.p1);
            localStorage.setItem("person2", result.user.p2);
            localStorage.setItem("p1Photo", result.user.p1Photo);
            localStorage.setItem("p2Photo", result.user.p2Photo);
            navigate("/datacenter-dashboard");
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((error) => {
        ToastMessage({
          message: "OTP not valid!",
          type: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className="login-form">
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
            handleVerifyOTP();
          }}
          className="registration-button"
        >
          Verify Code
        </button>
        {loading && <CircularLoading />}
      </LazyLoadComponent>
    </form>
  );
}

export default VerifyOTPDataCenter;
