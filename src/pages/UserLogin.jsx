import React, { useState } from "react";
import "../css/login.css";
import { Link } from "react-router-dom";
import ToastMessage from "../components/ToastMessage";

function UserLogin() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    // Validate if the entered value is a valid mobile number
    if (!/^\d*$/.test(value) || value.length > 10) {
      setErrors({ ...errors, mobile: "Invalid mobile number" });
    } else {
      setErrors({ ...errors, mobile: "" });
    }
    setMobile(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!/^\d{10}$/.test(mobile)) {
      validationErrors.mobile = "Invalid mobile number";
    }
    if (password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters";
    }

    if (Object.keys(validationErrors).length === 0) {
      ToastMessage({
        message: "Login successful!",
        type: "success",
      });
    } else {
      setErrors(validationErrors);
      ToastMessage({
        message: "Login failed. Please check your credentials.",
        type: "error",
      });
    }
  };

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>User Login</h2>
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

        <label htmlFor="password">Password:</label>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="toggle-password" onClick={handleTogglePassword}>
            {showPassword ? (
              <i className="material-icons">visibility_off</i>
            ) : (
              <i className="material-icons">visibility</i>
            )}
          </span>
        </div>
        {errors.password && <span className="error">{errors.password}</span>}

        <div className="forgot-password">
          <Link to="/forgot-password" className="forgot-password-link">
            Forgot Password?
          </Link>
        </div>

        <button type="submit" className="login-button">
          Login
        </button>

        <div className="new-user">
          <span className="new-user-text">New User?</span>
          <Link className="register-link" to="/register-user">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default UserLogin;
