import React, { useState, useEffect } from "react";
import "../css/registration.css";
import { Link } from "react-router-dom";
import ToastMessage from "../components/ToastMessage";
import OTPInput from "react-otp-input";
import * as data from "../assets/state and cities.json";
import { LazyLoadComponent } from "react-lazy-load-image-component";

function RegisterUser() {
  const [step, setStep] = useState(5);
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
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [stateError, setStateError] = useState("");
  const [cityError, setCityError] = useState("");
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const statesData = Object.keys(data).map((state) => ({
      value: state,
      label: state,
    }));
    setStateOptions(statesData);
  }, []);

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

  const handleRegister1 = () => {
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
      setStep(4);
      // ToastMessage({
      //   message: "Registration successful!",
      //   type: "success",
      // });
    }
  };

  const handleRegister2 = () => {
    const isAddressValid = validateAddress(address);
    const isPincodeValid = validatePincode(pincode);
    const isStateValid = validateState(selectedState);
    const isCityValid = validateCity(selectedCity);
    if (isAddressValid && isPincodeValid && isStateValid && isCityValid) {
      setStep(5);
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

  const validateAddress = (value) => {
    if (value.trim() === "") {
      setAddressError("Address is required.");
      return false;
    } else {
      setAddressError("");
      return true;
    }
  };

  const validatePincode = (value) => {
    const pincodeRegex = /^\d{6}$/;

    if (value.trim() === "") {
      setPincodeError("Pin code is required.");
      return false;
    } else if (!pincodeRegex.test(value)) {
      setPincodeError("Invalid pin code. It should be exactly 6 digits.");
      return false;
    } else {
      setPincodeError("");
      return true;
    }
  };

  const validateState = (value) => {
    if (!value) {
      setStateError("State is required.");
      return false;
    } else {
      setStateError("");
      return true;
    }
  };

  const validateCity = (value) => {
    if (!value) {
      setCityError("City is required.");
      return false;
    } else {
      setCityError("");
      return true;
    }
  };

  const handleStateChange = (e) => {
    const selectedStateValue = e.target.value;
    setSelectedState(selectedStateValue);

    if (data[selectedStateValue]) {
      setCityOptions(
        data[selectedStateValue].map((city) => ({ value: city, label: city }))
      );
      setCityError(null);
    } else {
      setCityOptions([]);
      setCityError("No cities found for the selected state");
    }

    setSelectedCity(null);
  };

  const handleCityChange = (e) => {
    const selectedCityValue = e.target.value;
    setSelectedCity(selectedCityValue);
  };

  return (
    <div className="container">
      <form className="registration-form" onSubmit={(e) => e.preventDefault()}>
        {/* Mobile number */}
        {step === 1 && (
          <LazyLoadComponent>
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
                {errors.mobile && (
                  <span className="error">{errors.mobile}</span>
                )}
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
          </LazyLoadComponent>
        )}
        {/* OTP */}
        {step === 2 && (
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
        )}
        {/* Register Details */}
        {step === 3 && (
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
                {fullNameError && (
                  <span className="error">{fullNameError}</span>
                )}
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
                <span
                  className="toggle-password"
                  onClick={handleTogglePassword}
                >
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
                  handleRegister1();
                }}
                className="registration-button"
              >
                Submit Details
              </button>
          </LazyLoadComponent>
        )}
        {/* Address */}
        {step === 4 && (
          <LazyLoadComponent>
              <h2>Address Details</h2>
              {/* Address */}
              <div>
                <label htmlFor="address">Address:</label>
                <textarea
                  type="text"
                  placeholder="Address"
                  value={address}
                  rows={3}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    validateAddress(e.target.value);
                  }}
                />
                {addressError && <span className="error">{addressError}</span>}
              </div>
              {/* Pincode */}
              <label htmlFor="pincode">PinCode:</label>
              <div>
                <input
                  type="text"
                  placeholder="Pin Code"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value);
                    validatePincode(e.target.value);
                  }}
                />
                {pincodeError && <span className="error">{pincodeError}</span>}
              </div>
              {/* State & City */}
              <div>
                <label htmlFor="state">State:</label>
                <div>
                  <select
                    value={selectedState || ""}
                    onChange={handleStateChange}
                  >
                    <option value="" disabled>
                      Select State
                    </option>
                    {stateOptions.map((state) => (
                      <option key={state.value} value={state.value}>
                        {state.label}
                      </option>
                    ))}
                  </select>
                  {stateError && <span className="error">{stateError}</span>}
                </div>

                <label htmlFor="city">City:</label>
                <div>
                  <select
                    value={selectedCity || ""}
                    onChange={handleCityChange}
                  >
                    <option value="" style={{ color: "#bbb" }} disabled>
                      Select City
                    </option>
                    {cityOptions
                      .filter(
                        (city, index, self) =>
                          index ===
                          self.findIndex((c) => c.value === city.value)
                      )
                      .map((city) => (
                        <option key={city.value} value={city.value}>
                          {city.label}
                        </option>
                      ))}
                  </select>
                  {cityError && <span className="error">{cityError}</span>}
                </div>
              </div>
              {/* submit */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleRegister2();
                }}
                className="registration-button"
              >
                Add Address
              </button>
          </LazyLoadComponent>
        )}
        {/* Photos And Doc */}
        {step === 5 && (
          <LazyLoadComponent>

          </LazyLoadComponent>
        )}

        {step <= 3 && (
          <div id="back-login">
            <Link to="/user-login" className="register-link">
              Back to Login
            </Link>
          </div>
        )}
        {step > 3 && (
          <div id="back-login">
            <button
              id="back-login"
              onClick={() => setStep(step - 1)}
              className="register-back"
            >
              Back
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default RegisterUser;
