import React, { useState } from "react";
import ToastMessage from "../ToastMessage";
import CircularLoading from "../CircularLoading";
import "../../css/change-password.css";
import { updatePassword } from "firebase/auth";
import userService from "../../services/user.services";
import CryptoJS from "crypto-js";
import { auth } from "../../firebase";

function ChangePassword({ isMenuShow }) {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleOldPassword = () => {
    setShowOldPassword(!showOldPassword);
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

  const validateOldPassword = (value) => {
    if (value.length < 8) {
      setOldPasswordError("Old Password must be at least 8 characters long.");
      return false;
    } else if (value.length > 35) {
      setOldPasswordError("Old Password Length Must Less Then 35 letters");
      return false;
    } else {
      setOldPasswordError("");
      return true;
    }
  };

  const changePasswordSubmitted = async () => {
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);
    const isOldPasswordValid = validateOldPassword(oldPassword);
    if (isPasswordValid && isConfirmPasswordValid && isOldPasswordValid) {
      setLoading(true);
      try {
        const mobile = localStorage.getItem("mobile");
        const userData = await userService.getUserFromMobile(mobile);
        const user = auth.currentUser;
        const decryptedBytes = CryptoJS.AES.decrypt(
          userData.password,
          process.env.ENCRYPT_HJ_KEY
        );
        const fetchedPassword = decryptedBytes.toString(CryptoJS.enc.Utf8);
        if (fetchedPassword === oldPassword) {
          await updatePassword(user, password)
            .then(() => {
              const newPassword = CryptoJS.AES.encrypt(
                password,
                process.env.ENCRYPT_HJ_KEY
              ).toString();
              userService
                .updateUser(userData.id, { password: newPassword })
                .then(() => {
                  ToastMessage({
                    message: "Password Updated Succesfully",
                    type: "success",
                  });
                  setConfirmPassword("");
                  setOldPassword("");
                  setPassword("");
                });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          ToastMessage({
            message: "Wrong Old Password!",
            type: "error",
          });
        }
      } catch (error) {
        console.error("Error updating password:", error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      className={
        !isMenuShow ? "change-password-user" : "change-password-user-blur"
      }
    >
      <form className="registration-form">
        <h2>Set New Password</h2>
        {/* Old Password */}
        <label htmlFor="password">Old Password:</label>
        <div id="passwords-div">
          <div className="password-container">
            <input
              type={showOldPassword ? "text" : "password"}
              placeholder="Password"
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
                validateOldPassword(e.target.value);
              }}
            />
            <span className="toggle-password" onClick={handleToggleOldPassword}>
              {showOldPassword ? (
                <i className="material-icons">visibility_off</i>
              ) : (
                <i className="material-icons">visibility</i>
              )}
            </span>
          </div>
          {oldPasswordError && (
            <span className="error">{oldPasswordError}</span>
          )}
        </div>
        {/* Passwords */}
        <label htmlFor="password">New Password:</label>
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
            changePasswordSubmitted();
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
