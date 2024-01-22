import React,{useState,useEffect} from "react";
import ToastMessage from "../ToastMessage";
import OTPInput from "react-otp-input";
import { LazyLoadComponent } from "react-lazy-load-image-component";

function OTPComponent({ otp, setOtp, verificationCode, setStep }) {
  const [seconds, setSeconds] = useState(60);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    setTimer(setInterval(() => setSeconds((prevSeconds) => prevSeconds - 1), 1000));
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
    verificationCode.confirm(otp).then((result) => {
      clearInterval(timer);
        setStep(3);
        ToastMessage({
          message: "Verification successful!",
          type: "success",
        });
    }).catch((error) => {
        ToastMessage({
          message: "OTP not valid!",
          type: "error",
        });
    });
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
      </LazyLoadComponent>
    </>
  );
}

export default OTPComponent;
