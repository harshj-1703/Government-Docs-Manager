import React, { useState } from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import ToastMessage from "../ToastMessage";
import CircularLoading from "../CircularLoading";
import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { auth } from "../../firebase";
import userService from "../../services/user.services";
import CryptoJS from "crypto-js";

function NewPasswordUpdate({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  mobile,
}) {
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

  const handleSetPassword = async () => {
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

    if (isPasswordValid && isConfirmPasswordValid) {
      setLoading(true);
      let user = "";
      try {
        const userData = await userService.getUserFromMobile(mobile);
        const decryptedBytes = CryptoJS.AES.decrypt(
          userData.password,
          process.env.ENCRYPT_HJ_KEY
        );
        const oldPassword = decryptedBytes.toString(CryptoJS.enc.Utf8);
        // console.log(mobile,password);
        await signInWithEmailAndPassword(auth, mobile + "@hj.com", oldPassword)
          .then((userCredential) => {
            user = userCredential.user;
            updatePassword(user, password)
              .then(() => {})
              .catch((error) => {
                console.log(error);
              });
            const newPassword = CryptoJS.AES.encrypt(
              password,
              process.env.ENCRYPT_HJ_KEY
            ).toString();
            userService.updateUser(userData.id, { password: newPassword });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
        ToastMessage({
          message: "Password Updated Succesfully",
          type: "success",
        });
      } catch (error) {
        console.error("Error updating password:", error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    } else {
      console.log("User Problem");
    }
    setLoading(false);
  };

  return (
    <LazyLoadComponent>
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
    </LazyLoadComponent>
  );
}

export default NewPasswordUpdate;
