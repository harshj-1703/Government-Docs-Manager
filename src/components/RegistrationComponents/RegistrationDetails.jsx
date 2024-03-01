import React, { useState } from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";

function RegistrationDetails({
  setStep,
  fullName,
  setFullName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  dob,
  setDob,
}) {
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [dobError, setDobError] = useState("");

  const handleRegister1 = () => {
    const isFullNameValid = validateFullName(fullName);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);
    const isDobValid = validateDob(dob);

    if (
      isFullNameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      isDobValid
    ) {
      setStep(4);
      // ToastMessage({
      //   message: "Registration successful!",
      //   type: "success",
      // });
    }
  };

  const validateFullName = (value) => {
    if (value.trim() === "") {
      setFullNameError("Full Name is required.");
      return false;
    } else if (value.length > 35) {
      setFullNameError("Full Name Length Must Less Then 35 letters");
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
    } else if (value.length > 35) {
      setEmailError("Email Length Must Less Then 35 letters");
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
    } else if (value.length > 35) {
      setPasswordError("Password Length Must Less Then 35 letters");
      return false;
    } else if (!/[A-Z]/.test(value)) {
      setPasswordError("Password must contain at least one uppercase letter.");
      return false;
    } else if (!/[a-z]/.test(value)) {
      setPasswordError("Password must contain at least one lowercase letter.");
      return false;
    } else if (!/\d/.test(value)) {
      setPasswordError("Password must contain at least one digit.");
      return false;
    } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
      setPasswordError("Password must contain at least one special character.");
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

  const validateDob = (value) => {
    const birthYearLimit = 2010;
    const afterYear = 1950;

    if (value.trim() === "") {
      setDobError("Date of Birth is required.");
      return false;
    } else {
      const inputDate = new Date(value);
      const inputYear = inputDate.getFullYear();

      if (inputYear >= birthYearLimit) {
        setDobError(`Must be born before ${birthYearLimit}.`);
        return false;
      }

      if (inputYear <= afterYear) {
        setDobError(`Must be born after ${afterYear}.`);
        return false;
      }

      setDobError("");
      return true;
    }
  };

  const handleDobChange = (e) => {
    const newValue = e.target.value;
    setDob(newValue);
    validateDob(newValue);
  };

  return (
    <>
      <LazyLoadComponent>
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
        {/* DOB */}
        <label htmlFor="dob">Date of Birth:</label>
        <div>
          <input type="date" id="dob" value={dob} onChange={handleDobChange} />
          {dobError && <span className="error">{dobError}</span>}
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
        <div id="passwords-div">
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
        </div>
        {/* submit */}
        <button
          onClick={(e) => {
            e.preventDefault();
            handleRegister1();
          }}
          className="registration-button"
        >
          Submit Details
        </button>
      </LazyLoadComponent>
    </>
  );
}

export default RegistrationDetails;
