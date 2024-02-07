import React, { useState } from "react";
import ToastMessage from "../ToastMessage";
import CircularLoading from "../CircularLoading";
import "../../css/change-password.css";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = (value) => {
    if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return false;
    } else if (value.length > 35) {
      setPasswordError("Password Length Must Less Then 35 letters");
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

  const changePasswordSubmitted = (e) => {
    e.preventDefault();
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);
    if(isPasswordValid && isConfirmPasswordValid){
        setLoading(true);
    }
  };

  return (
    <div className="change-password-user">
      <form className="registration-form" onSubmit={changePasswordSubmitted}>
        <h2>Set New Password</h2>
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
            handleSetPassword();
            e.preventDefault();
          }}
          className="registration-button"
        >
          Set Password
        </button>
        {loading && <CircularLoading />}
      </form>
    </div>
  );
}

export default ChangePassword;
