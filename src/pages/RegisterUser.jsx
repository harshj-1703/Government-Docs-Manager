import React, { useState } from "react";
import "../css/registration.css";
import { Link } from "react-router-dom";
import ToastMessage from "../components/ToastMessage";
import OTPInput from "react-otp-input";

function RegisterUser() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState("");

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

  const handleVerifyCode = () => {
    setStep(3);
    console.log(otp);
    ToastMessage({
      message: "Verification successful!",
      type: "success",
    });
  };

  const handleRegister = () => {
    ToastMessage({
      message: "Registration successful!",
      type: "success",
    });
  };

  return (
    <div className="container">
      <form className="registration-form" onSubmit={(e) => e.preventDefault()}>
        {step === 1 && (
          <>
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
          </>
        )}
        {step === 2 && (
          <>
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
          </>
        )}

        {step === 3 && (
          <>
            <h2>Complete Registration</h2>
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleRegister();
              }}
              className="registration-button"
            >
              Register
            </button>
          </>
        )}
        <div id="back-login">
          <Link to="/user-login" className="register-link">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterUser;
