import React, { useState } from "react";
import ToastMessage from "../ToastMessage";
import { LazyLoadComponent } from "react-lazy-load-image-component";

function OtherDetails({
  profession,
  setProfession,
  photo,
  setPhoto,
  selectedFile,
  setSelectedFile,
}) {
  const [professionError, setProfessionError] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [fileError, setFileError] = useState("");

  const handleRegister3 = () => {
    const isProfessionValid = validateProfession(profession);
    const isPhotoValid = validatePhoto(photo);
    const isFileValid = validateFile(selectedFile);

    if (isProfessionValid && isPhotoValid && isFileValid) {
      // setStep(5);
      ToastMessage({
        message: "Registration successful!",
        type: "success",
      });
    }
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
    setPhoto(selectedPhoto);
    validatePhoto(selectedPhoto);
  };

  const validateFile = (file) => {
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

  return (
    <>
      <LazyLoadComponent>
        <h2>Other Details</h2>
        {/* Profession */}
        <div>
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
        <label htmlFor="photo">Upload Profile Photo:</label>
        <div>
          <input
            type="file"
            id="photo"
            accept=".jpg, .jpeg, .png, .gif"
            onChange={handlePhotoChange}
          />
          {photoError && <span className="error">{photoError}</span>}
          {photo && (
            <div className="avatar-container">
              <img
                src={URL.createObjectURL(photo)}
                alt="Preview"
                className="avatar-preview"
              />
            </div>
          )}
        </div>
        {/* File Upload */}
        <div>
          <label htmlFor="file">Upload Doc File Proof:</label>
          <input
            type="file"
            id="file"
            accept=".jpg, .jpeg, .png, .gif, .pdf"
            onChange={handleFileChange}
          />
          {fileError && <span className="error">{fileError}</span>}
        </div>
        {/* submit */}
        <button
          onClick={(e) => {
            e.preventDefault();
            handleRegister3();
          }}
          className="registration-button"
        >
          Register
        </button>
      </LazyLoadComponent>
    </>
  );
}

export default OtherDetails;
