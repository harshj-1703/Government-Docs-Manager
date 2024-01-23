import React, { useState } from "react";
import "../css/registration.css";
import { Link } from "react-router-dom";
import MobileNumberComponent from "../components/RegistrationComponents/MobileNumberComponent";
import OTPComponent from "../components/RegistrationComponents/OTPComponent";
import RegistrationDetails from "../components/RegistrationComponents/RegistrationDetails";
import AddressDetails from "../components/RegistrationComponents/AddressDetails";
import OtherDetails from "../components/RegistrationComponents/OtherDetails";
import userService from "../services/user.services";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";
import CryptoJS from "crypto-js";

function RegisterUser() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [otp, setOtp] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [profession, setProfession] = useState("");
  const [photo, setPhoto] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});

  const addUser = async () => {
    //hash password
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    //image
    const imageRef = ref(storage, `ProfilePhotos/${photo.name + v4()}`);
    const snapshot = await uploadBytes(imageRef, photo);
    const urlImage = await getDownloadURL(snapshot.ref);

    //file
    const fileRef = ref(
      storage,
      `UserProfileProofs/${selectedFile.name + v4()}`
    );
    const snapshotFile = await uploadBytes(fileRef, selectedFile);
    const urlFile = await getDownloadURL(snapshotFile.ref);

    const timestampOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
      timeZone: "Asia/Kolkata",
    };

    const newUser = {
      fullName: fullName,
      email: email,
      mobile: mobile,
      password: hashedPassword,
      dob: dob,
      address: address,
      pincode: pincode,
      selectedState: selectedState,
      selectedCity: selectedCity,
      profession: profession,
      profilePhotoUrl: urlImage,
      profileProof: urlFile,
      timestamp: new Date().toLocaleString("en-US", timestampOptions),
    };
    await userService.addUser(newUser);
  };

  return (
    <div className="registration-container">
      <form className="registration-form" onSubmit={(e) => e.preventDefault()}>
        {/* Mobile number */}
        {step === 1 && (
          <MobileNumberComponent
            setVerificationCode={setVerificationCode}
            setStep={setStep}
            mobile={mobile}
            setMobile={setMobile}
            errors={errors}
            setErrors={setErrors}
          />
        )}
        {/* OTP */}
        {step === 2 && (
          <OTPComponent
            otp={otp}
            setOtp={setOtp}
            setStep={setStep}
            verificationCode={verificationCode}
          />
        )}
        {/* Register Details */}
        {step === 3 && (
          <RegistrationDetails
            setStep={setStep}
            fullName={fullName}
            setFullName={setFullName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            dob={dob}
            setDob={setDob}
          />
        )}
        {/* Address */}
        {step === 4 && (
          <AddressDetails
            setStep={setStep}
            address={address}
            setAddress={setAddress}
            pincode={pincode}
            setPincode={setPincode}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
          />
        )}
        {/* Photos And Doc */}
        {step === 5 && (
          <OtherDetails
            profession={profession}
            setProfession={setProfession}
            photo={photo}
            setPhoto={setPhoto}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            addUser={addUser}
          />
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
        {step == 1 && (
          <div className="new-user">
            <Link to="/" className="register-link" style={{ color: "white" }}>
              Home
            </Link>
          </div>
        )}
      </form>
    </div>
  );
}

export default RegisterUser;
