import React, { useState } from "react";
import { Link } from "react-router-dom";
import ToastMessage from "../components/ToastMessage";
import CircularLoading from "../components/CircularLoading";
import { auth } from "../firebase";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import VerifyOTPDataCenter from "../components/DataCenterComponents/VerifyOTPDataCenter";
import dataCenterServices from "../services/data-center.services";

function DatacenterLogin() {
  const [mobile, setMobile] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
      size: "invisible",
      callback: (response) => {},
    });
  };

  const mobileAvailableOrNot = async (mobile) => {
    const available = await dataCenterServices.getDataCenterFromMobile(mobile);
    if (available) {
      if (available.user.status === 0) {
        return false;
      }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!/^\d{10}$/.test(mobile)) {
      validationErrors.mobile = "Invalid mobile number";
    }
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      const available = await mobileAvailableOrNot(mobile);
      if (!available) {
        setErrors({
          ...errors,
          mobile: "Mobile Number not registered!",
        });
        setLoading(false);
        return;
      }
      if (available && validateMobile(mobile)) {
        generateRecaptcha();
        let appVerifier = window.recaptchaVerifier;
        let phoneNumber = "+91" + mobile;

        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
          .then((result) => {
            // console.log(result);
            setVerificationCode(result);
            setStep(() => step + 1);
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
            mobile={mobile}
            otp={otp}
            setOtp={setOtp}
            verificationCode={verificationCode}
            setStep={setStep}
          />
        )}
        {loading && <CircularLoading />}
        <div id="recaptcha" style={{ display: "none" }}></div>
      </div>
    </>
  );
}

export default DatacenterLogin;
