import React, { useState } from "react";
import "../css/registration.css";
import { Link } from "react-router-dom";
import ToastMessage from "../components/ToastMessage";
import OTPInput from "react-otp-input";

function RegisterUser() {
  const [step, setStep] = useState(3);
  const [mobile, setMobile] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    const isFullNameValid = validateFullName(fullName);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

    if (
      isFullNameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid
    ) {
      ToastMessage({
        message: "Registration successful!",
        type: "success",
      });
    }
  };

  const validateFullName = (value) => {
    if (value.trim() === "") {
      setFullNameError("Full Name is required.");
      return false;
    } else if (/^[a-zA-Z\s]*$/.test(value)) {
      setFullNameError("");
      return true;
    } else {
      setFullNameError(
        "Invalid characters in the full name. Use only letters and spaces."
      );
      return false;
    }
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value.trim() === "") {
      setEmailError("Email is required.");
      return false;
    } else if (!emailRegex.test(value)) {
      setEmailError("Invalid email address.");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = (value) => {
    if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const validateConfirmPassword = (value) => {
    if (value !== password) {
      setConfirmPasswordError("Passwords do not match.");
      return false;
    } else {
      setConfirmPasswordError("");
      return true;
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
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
            <h2>Registration</h2>
            {/* Full Name */}
            <label htmlFor="full name">Full Name:</label>
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  validateFullName(e.target.value);
                }}
              />
              {fullNameError && <span className="error">{fullNameError}</span>}
            </div>
            {/* Email */}
            <label htmlFor="email">Email:</label>
            <div>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
              />
              {emailError && <span className="error">{emailError}</span>}
            </div>
            {/* Passwords */}
            <label htmlFor="password">Password:</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
              />
              <span className="toggle-password" onClick={handleTogglePassword}>
                {showPassword ? (
                  <i className="material-icons">visibility_off</i>
                ) : (
                  <i className="material-icons">visibility</i>
                )}
              </span>
            </div>
            {passwordError && <span className="error">{passwordError}</span>}
            <label htmlFor="confirm-password">Confirm Password:</label>
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  validateConfirmPassword(e.target.value);
                }}
              />
              {confirmPasswordError && (
                <span className="error">{confirmPasswordError}</span>
              )}
            </div>
            {/* submit */}
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
