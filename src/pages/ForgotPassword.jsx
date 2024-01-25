import React, { useState } from "react";
import MobileNumberComponentForgotPassword from "../components/ForgotPasswordComponents/MobileNumberComponentForgotPassword";
import OTPComponentForgotPassword from "../components/ForgotPasswordComponents/OTPComponent";
import CircularLoading from "../components/CircularLoading";
import { Link } from "react-router-dom";
import NewPasswordUpdate from "../components/ForgotPasswordComponents/NewPasswordUpdate";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState({});
  const [verificationCode, setVerificationCode] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="registration-container">
      <form className="registration-form" onSubmit={(e) => e.preventDefault()}>
        {/* Mobile number */}
        {step === 1 && (
          <MobileNumberComponentForgotPassword
            setVerificationCode={setVerificationCode}
            setStep={setStep}
            mobile={mobile}
            setMobile={setMobile}
            errors={errors}
            setErrors={setErrors}
          />
        )}
        {/* OTP */}
        {step === 2 && (
          <OTPComponentForgotPassword
            otp={otp}
            setOtp={setOtp}
            setStep={setStep}
            verificationCode={verificationCode}
          />
        )}
        {step === 3 && (
          <NewPasswordUpdate
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            mobile={mobile}
          />
        )}
        {step <= 3 && (
          <div id="back-login">
            <Link to="/user-login" className="register-link">
              Back to Login
            </Link>
          </div>
        )}
        {step == 1 && (
          <div className="new-user">
            <Link to="/" className="register-link" style={{ color: "white" }}>
              Home
            </Link>
          </div>
        )}
      </form>
    </div>
  );
}

export default ForgotPassword;
