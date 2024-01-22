import React from "react";
import ToastMessage from "../ToastMessage";
import OTPInput from "react-otp-input";
import { LazyLoadComponent } from "react-lazy-load-image-component";

function OTPComponent({ otp, setOtp, verificationCode, setStep }) {
  const handleVerifyCode = () => {
    if (otp === verificationCode) {
      setStep(3);
      ToastMessage({
        message: "Verification successful!",
        type: "success",
      });
    } else {
      ToastMessage({
        message: "OTP not valid!",
        type: "error",
      });
    }
  };
  return (
    <>
      <LazyLoadComponent>
        <h2>Enter the verification code</h2>
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
