import React, { useState } from "react";
import "../css/login.css";
import { Link, useNavigate } from "react-router-dom";
import ToastMessage from "../components/ToastMessage";
import CircularLoading from "../components/CircularLoading";
import { auth } from "../firebase";
import { signInWithPhoneNumber } from "firebase/auth";
import VerifyOTPDataCenter from "../components/DataCenterComponents/VerifyOTPDataCenter";

function DatacenterLogin() {
  const [mobile, setMobile] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  const handleSubmit = async (e) => {
    // setLoading(true);
    e.preventDefault();
    const validationErrors = {};
    if (!/^\d{10}$/.test(mobile)) {
      validationErrors.mobile = "Invalid mobile number";
    }
    if (Object.keys(validationErrors).length === 0) {
      setStep(() => step + 1);
      ToastMessage({
        message: "OTP Sended.",
        type: "success",
      });
    } else {
      setErrors(validationErrors);
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value) || value.length > 10 || value.length < 10) {
      setErrors({ ...errors, mobile: "Invalid mobile number" });
    } else {
      setErrors({ ...errors, mobile: "" });
    }
    setMobile(value);
  };

  return (
    <>
      <div className="container">
        {step === 0 && (
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Data Center Login</h2>
            <label htmlFor="mobile">Mobile:</label>
            <input
              type="tel"
              id="mobile"
              placeholder="Enter your mobile number"
              value={mobile}
              maxLength={10}
              onChange={handleMobileChange}
            />
            {errors.mobile && <span className="error">{errors.mobile}</span>}

            <button type="submit" className="login-button">
              Login
            </button>

            <div className="new-user">
              <Link to="/" className="register-link" style={{ color: "white" }}>
                Home
              </Link>
            </div>
          </form>
        )}
        {step === 1 && (
          <VerifyOTPDataCenter
            otp={otp}
            setOtp={setOtp}
            verificationCode={"123456"}
            setStep={setStep}
          />
        )}
        {loading && <CircularLoading />}
      </div>
    </>
  );
}

export default DatacenterLogin;
