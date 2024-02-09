import React, { useState, useEffect } from "react";
import "../../css/edit-profile.css";
import * as data from "../../assets/state and cities.json";
import CircularLoading from "../CircularLoading";
import ToastMessage from "../ToastMessage";
import userService from "../../services/user.services";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";

function EditProfile({ isMenuShow }) {
  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [dob, setDob] = useState("");
  const [dobError, setDobError] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [profession, setProfession] = useState("");
  const [photo, setPhoto] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [addressError, setAddressError] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [stateError, setStateError] = useState("");
  const [cityError, setCityError] = useState("");
  const [professionError, setProfessionError] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [fileError, setFileError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [defaultImage, setDefaultImage] = useState(null);
  const [defaultFile, setDefaultFile] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const mobile = localStorage.getItem("mobile");
    getUserData(mobile);
    setIsLoading(false);
  }, []);

  const getUserData = async (mobile) => {
    const userData = await userService.getUserFromMobile(mobile);
    // console.log(userData.user);
    setFullName(userData.user.fullName);
    setDob(userData.user.dob);
    setEmail(userData.user.email);
    setAddress(userData.user.address);
    setPincode(userData.user.pincode);
    setSelectedState(userData.user.selectedState);
    setCityOptions(
      data[userData.user.selectedState].map((city) => ({
        value: city,
        label: city,
      }))
    );
    setSelectedCity(userData.user.selectedCity);
    setProfession(userData.user.profession);
    setDefaultImage(userData.user.profilePhotoUrl);
    setDefaultFile(userData.user.profileProof);
    setPhoto(userData.user.profilePhotoUrl);
    setSelectedFile(userData.user.profileProof);
  };

  //state and cities data fetch
  useEffect(() => {
    const statesData = Object.keys(data).map((state) => ({
      value: state,
      label: state,
    }));
    setStateOptions(statesData);
  }, []);

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

  const handleDobChange = (e) => {
    const newValue = e.target.value;
    setDob(newValue);
    validateDob(newValue);
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

  const validateAddress = (value) => {
    if (value.trim() === "") {
      setAddressError("Address is required.");
      return false;
    } else if (value.length > 50) {
      setAddressError("Address Length Must Less Then 50 letters");
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

  const validateProfession = (value) => {
    if (value.trim() === "") {
      setProfessionError("Profession is required.");
      return false;
    } else if (value.length > 25) {
      setProfessionError("Profession Length Must Less Then 25 letters");
      return false;
    } else {
      setProfessionError("");
      return true;
    }
  };

  const handleProfessionChange = (e) => {
    const newValue = e.target.value;
    setProfession(newValue);
    validateProfession(newValue);
  };

  const validatePhoto = (file) => {
    if (file === defaultImage) {
      return true;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSizeInBytes = 500 * 1024;

    if (!file) {
      setPhotoError("Photo is required.");
      return false;
    }

    if (!allowedTypes.includes(file.type)) {
      setPhotoError("Invalid file type. Please upload a JPG, PNG, or GIF.");
      return false;
    }

    if (file.size > maxSizeInBytes) {
      setPhotoError("File size exceeds 500 KB limit.");
      return false;
    }

    setPhotoError("");
    return true;
  };

  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    validatePhoto(selectedPhoto);
    setPhoto(selectedPhoto);
  };

  const validateFile = (file) => {
    if (file === defaultFile) {
      return true;
    }
    const allowedFileTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
    ];
    const maxFileSize = 1000 * 1024;

    if (file) {
      if (allowedFileTypes.includes(file.type)) {
        if (file.size <= maxFileSize) {
          setSelectedFile(file);
          setFileError("");
          return true;
        } else {
          setSelectedFile(null);
          setFileError("File size exceeds the limit (500 KB).");
          return false;
        }
      } else {
        setSelectedFile(null);
        setFileError("Invalid file type. Allowed types: JPG, PNG, GIF, PDF");
        return false;
      }
    } else {
      setFileError("File proof is required!");
      return false;
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setSelectedFile(selectedFile);
    validateFile(selectedFile);
  };

  const handleEditProfileSubmit = () => {
    const isFullNameValid = validateFullName(fullName);
    const isEmailValid = validateEmail(email);
    const isDobValid = validateDob(dob);
    const isAddressValid = validateAddress(address);
    const isPincodeValid = validatePincode(pincode);
    const isStateValid = validateState(selectedState);
    const isCityValid = validateCity(selectedCity);
    const isProfessionValid = validateProfession(profession);
    const isPhotoValid = validatePhoto(photo);
    const isFileValid = validateFile(selectedFile);
    if (
      isFullNameValid &&
      isEmailValid &&
      isDobValid &&
      isAddressValid &&
      isPincodeValid &&
      isStateValid &&
      isCityValid &&
      isProfessionValid &&
      isPhotoValid &&
      isFileValid
    ) {
      const confirmation = window.confirm("Are you sure you want to proceed?");
      if (confirmation) {
        setIsLoading(true);
        const mobile = localStorage.getItem("mobile");
        updateDetails(mobile);
      }
    }
  };

  const updateDetails = async (mobile) => {
    const user = await userService.getUserFromMobile(mobile);

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

    const userData = {
      fullName: fullName,
      email: email,
      dob: dob,
      address: address,
      pincode: pincode,
      selectedState: selectedState,
      selectedCity: selectedCity,
      profession: profession,
      // profilePhotoUrl: urlImage,
      // profileProof: urlFile,
      updatedAt: new Date().toLocaleString("en-US", timestampOptions),
    };

    if (defaultImage != photo) {
      //image
      const imageRef = ref(storage, `ProfilePhotos/${photo.name + v4()}`);
      const snapshot = await uploadBytes(imageRef, photo);
      const urlImage = await getDownloadURL(snapshot.ref);
      userData.profilePhotoUrl = urlImage;
      localStorage.setItem("profileImage", urlImage);
    }
    if (defaultFile != selectedFile) {
      //file
      const fileRef = ref(
        storage,
        `UserProfileProofs/${selectedFile.name + v4()}`
      );
      const snapshotFile = await uploadBytes(fileRef, selectedFile);
      const urlFile = await getDownloadURL(snapshotFile.ref);
      userData.profileProof = urlFile;
    }

    await userService.updateUser(user.id, userData);
    localStorage.setItem("fullname", fullName);
    ToastMessage({
      message: "Profile Edited successfully!",
      type: "success",
    });
    setIsLoading(false);
  };

  return (
    <div className={!isMenuShow ? "edit-profile" : "edit-profile-blur"}>
      <div className="fields">
        <h2>Edit Profile</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="edit-profile-form">
            {/* Full Name */}
            <div className="form-group">
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
            </div>
            {/* DOB */}
            <div className="form-group">
              <label htmlFor="dob">Date of Birth:</label>
              <div>
                <input
                  type="date"
                  id="dob"
                  value={dob}
                  onChange={handleDobChange}
                />
                {dobError && <span className="error">{dobError}</span>}
              </div>
            </div>
            {/* Email */}
            <div className="form-group">
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
            </div>
            {/* Address */}
            <div className="form-group">
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
              </div>
              {addressError && <span className="error">{addressError}</span>}
            </div>
            {/* Pincode */}
            <div className="form-group">
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
            </div>
            {/* State & City */}
            <div className="form-group">
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
            </div>
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <div>
                <select value={selectedCity || ""} onChange={handleCityChange}>
                  <option value="" style={{ color: "#bbb" }} disabled>
                    Select City
                  </option>
                  {cityOptions
                    .filter(
                      (city, index, self) =>
                        index === self.findIndex((c) => c.value === city.value)
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
            {/* Profession */}
            <div className="form-group">
              <label htmlFor="profession">Profession:</label>
              <div>
                <input
                  type="text"
                  id="profession"
                  placeholder="Enter your profession"
                  value={profession}
                  onChange={handleProfessionChange}
                />
                {professionError && (
                  <span className="error">{professionError}</span>
                )}
              </div>
            </div>
            {/* Profile Photo */}
            <div className="form-group">
              <label htmlFor="photo">Upload Profile Photo:</label>
              <div>
                <input
                  type="file"
                  id="photo"
                  accept=".jpg, .jpeg, .png, .gif"
                  onChange={handlePhotoChange}
                />
                {photoError && <span className="error">{photoError}</span>}
              </div>
            </div>
            <div className="avatar-container">
              {photo && (
                <img
                  src={
                    photo !== defaultImage ? URL.createObjectURL(photo) : photo
                  }
                  alt="Preview"
                  className="avatar-preview"
                />
              )}
            </div>
            {/* File Upload */}
            <div className="form-group-last">
              <label htmlFor="file">Upload Doc File Proof:</label>
              <input
                type="file"
                id="file"
                accept=".jpg, .jpeg, .png, .gif, .pdf"
                onChange={handleFileChange}
              />
              {fileError && <span className="error">{fileError}</span>}
            </div>
            <a href={defaultFile} target="_blank" className="old-doc-link">
              Old Document&nbsp;
              <i className="material-icons" style={{ fontSize: "20px" }}>
                switch_access_shortcut
              </i>
            </a>
            {/* submit */}
          </div>
          <div className="edit-button">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleEditProfileSubmit();
              }}
              className="registration-button"
            >
              Edit Profile
            </button>
          </div>
        </form>
        {isLoading && <CircularLoading />}
      </div>
    </div>
  );
}

export default EditProfile;
