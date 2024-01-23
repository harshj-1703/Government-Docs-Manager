import React, { useState } from "react";
import "../css/login.css";
import { Link } from "react-router-dom";
import ToastMessage from "../components/ToastMessage";
import userService from "../services/user.services";
import CircularLoading from "../components/CircularLoading";
import CryptoJS from "crypto-js";

function UserLogin() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const validationErrors = {};
    if (!/^\d{10}$/.test(mobile)) {
      validationErrors.mobile = "Invalid mobile number";
    }
    if (password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters";
    }

    if (Object.keys(validationErrors).length === 0) {
      const available = await userService.getUserFromMobile(mobile);
      if (!available) {
        ToastMessage({
          message: "User Not Registered",
          type: "error",
        });
      } else {
        const hashedPassword = CryptoJS.SHA256(password).toString(
          CryptoJS.enc.Hex
        );
        if (hashedPassword === available.password) {
          ToastMessage({
            message: "Login Succesful",
            type: "success",
          });
        }
        else{
          ToastMessage({
            message: "Wrong Password",
            type: "error",
          });
        }
      }
    } else {
      setErrors(validationErrors);
    }
    setLoading(false);
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
        <div className="new-user">
          <Link to="/" className="register-link" style={{ color: "white" }}>
            Home
          </Link>
        </div>
      </form>
      {loading && <CircularLoading />}
    </div>
  );
}

export default UserLogin;
