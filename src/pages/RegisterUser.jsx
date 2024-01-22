import React, { useState} from "react";
import "../css/registration.css";
import { Link } from "react-router-dom";
import MobileNumberComponent from "../components/RegistrationComponents/MobileNumberComponent";
import OTPComponent from "../components/RegistrationComponents/OTPComponent";
import RegistrationDetails from "../components/RegistrationComponents/RegistrationDetails";
import AddressDetails from "../components/RegistrationComponents/AddressDetails";
import OtherDetails from "../components/RegistrationComponents/OtherDetails";

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

  return (
    <div className="registration-container">
      <form className="registration-form" onSubmit={(e) => e.preventDefault()}>
        {/* Mobile number */}
        {step === 1 && (
          <MobileNumberComponent setVerificationCode={setVerificationCode} setStep={setStep} mobile={mobile} setMobile={setMobile} errors={errors} setErrors={setErrors}/>
        )}
        {/* OTP */}
        {step === 2 && (
          <OTPComponent otp={otp} setOtp={setOtp} setStep={setStep} verificationCode={verificationCode} />
        )}
        {/* Register Details */}
        {step === 3 && (
          <RegistrationDetails setStep={setStep} fullName={fullName} setFullName={setFullName} email={email} setEmail={setEmail} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} dob={dob} setDob={setDob}/>
        )}
        {/* Address */}
        {step === 4 && (
          <AddressDetails setStep={setStep} address={address} setAddress={setAddress} pincode={pincode} setPincode={setPincode} selectedState={selectedState} setSelectedState={setSelectedState} selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
        )}
        {/* Photos And Doc */}
        {step === 5 && (
          <OtherDetails profession={profession} setProfession={setProfession} photo={photo} setPhoto={setPhoto} selectedFile={selectedFile} setSelectedFile={setSelectedFile}/>
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
