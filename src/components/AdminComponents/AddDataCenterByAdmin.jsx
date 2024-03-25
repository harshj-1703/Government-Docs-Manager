import React, { useEffect, useState } from "react";
import "../../css/user-query.css";
import CircularLoading from "../CircularLoading";
import ToastMessage from "../ToastMessage";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../firebase";
import userService from "../../services/user.services";
import dataCenterServices from "../../services/data-center.services";
import * as data from "../../assets/state and cities.json";

function AddDataCenterByAdmin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [p1, setP1] = useState("");
  const [p1Error, setP1Error] = useState("");
  const [p2, setP2] = useState("");
  const [p2Error, setP2Error] = useState("");
  const [p1Photo, setP1Photo] = useState("");
  const [p1PhotoError, setP1PhotoError] = useState("");
  const [p2Photo, setP2Photo] = useState("");
  const [p2PhotoError, setP2PhotoError] = useState("");
  const [photoExample, setPhotoExample] = useState(null);
  const [photoExampleError, setPhotoExampleError] = useState("");
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [stateError, setStateError] = useState("");
  const [cityError, setCityError] = useState("");

  useEffect(() => {
    const statesData = Object.keys(data).map((state) => ({
      value: state,
      label: state,
    }));
    setStateOptions(statesData);
  }, []);

  const mobileAvailableOrNot = async (mobile) => {
    const available1 = await userService.getUserFromMobile(mobile);
    const available2 = await dataCenterServices.getDataCenterFromMobile(mobile);
    if (available1 || available2) {
      return true;
    } else {
      return false;
    }
  };

  const validateMobile = async (value) => {
    setLoading(true);
    if (!/^\d{10}$/.test(value)) {
      setMobileError("Invalid mobile number.");
      setLoading(false);
      return false;
    } else if (await mobileAvailableOrNot(value)) {
      setMobileError("Mobile Number Already Taken.");
      setLoading(false);
      return false;
    } else {
      setMobileError("");
      setLoading(false);
      return true;
    }
  };

  const validateP1 = (value) => {
    if (value.trim() === "") {
      setP1Error("Person 1 is required.");
      return false;
    } else if (value.length > 35) {
      setP1Error("Person 1 Length Must Less Then 35 letters");
      return false;
    } else if (/^[a-zA-Z\s]*$/.test(value)) {
      setP1Error("");
      return true;
    } else {
      setP1Error(
        "Invalid characters in the Person 1. Use only letters and spaces."
      );
      return false;
    }
  };

  const validateP2 = (value) => {
    if (value.trim() === "") {
      setP2Error("Person 2 is required.");
      return false;
    } else if (value.length > 35) {
      setP2Error("Person 2 Length Must Less Then 35 letters");
      return false;
    } else if (/^[a-zA-Z\s]*$/.test(value)) {
      setP2Error("");
      return true;
    } else {
      setP2Error(
        "Invalid characters in the Person 2. Use only letters and spaces."
      );
      return false;
    }
  };

  const validatePhotoExample = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSizeInBytes = 500 * 1024;

    if (!file) {
      setPhotoExampleError("Photo is required.");
      return false;
    }

    if (!allowedTypes.includes(file.type)) {
      setPhotoExampleError(
        "Invalid file type. Please upload a JPG, PNG, or GIF."
      );
      return false;
    }

    if (file.size > maxSizeInBytes) {
      setPhotoExampleError("File size exceeds 500 KB limit.");
      return false;
    }

    setPhotoExampleError("");
    return true;
  };

  const handlePhotoExampleChange = (e) => {
    const selectedPhoto = e.target.files[0];
    validatePhotoExample(selectedPhoto);
    setPhotoExample(selectedPhoto);
  };

  const validateP1Photo = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSizeInBytes = 500 * 1024;

    if (!file) {
      setP1PhotoError("Photo is required.");
      return false;
    }

    if (!allowedTypes.includes(file.type)) {
      setP1PhotoError("Invalid file type. Please upload a JPG, PNG, or GIF.");
      return false;
    }

    if (file.size > maxSizeInBytes) {
      setP1PhotoError("File size exceeds 500 KB limit.");
      return false;
    }

    setP1PhotoError("");
    return true;
  };

  const validateP2Photo = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSizeInBytes = 500 * 1024;

    if (!file) {
      setP2PhotoError("Photo is required.");
      return false;
    }

    if (!allowedTypes.includes(file.type)) {
      setP2PhotoError("Invalid file type. Please upload a JPG, PNG, or GIF.");
      return false;
    }

    if (file.size > maxSizeInBytes) {
      setP2PhotoError("File size exceeds 500 KB limit.");
      return false;
    }

    setP2PhotoError("");
    return true;
  };

  const handleP1PhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    validateP1Photo(selectedPhoto);
    setP1Photo(selectedPhoto);
  };

  const handleP2PhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    validateP2Photo(selectedPhoto);
    setP2Photo(selectedPhoto);
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

  const submitDocument = async () => {
    const isValidP1 = validateP1(p1);
    const isValidP2 = validateP2(p2);
    const isValidP1Photo = validateP1Photo(p1Photo);
    const isValidP2Photo = validateP2Photo(p2Photo);
    const isValidUploadImage = validatePhotoExample(photoExample);
    const isValidState = validateState(selectedState);
    const isValidCity = validateCity(selectedCity);
    if (
      isValidP1 &&
      isValidP2 &&
      isValidP1Photo &&
      isValidP2Photo &&
      isValidUploadImage &&
      isValidState &&
      isValidCity
    ) {
      const isMobileValid = await validateMobile(mobile);
      if (isMobileValid) {
        setLoading(true);
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
        try {
          //p1 Photo
          const p1PhotoRef = ref(storage, `DataCenters/${p1Photo.name + v4()}`);
          const snapshotP1Photo = await uploadBytes(p1PhotoRef, p1Photo);
          const urlP1Photo = await getDownloadURL(snapshotP1Photo.ref);

          //p2 Photo
          const p2PhotoRef = ref(storage, `DataCenters/${p2Photo.name + v4()}`);
          const snapshotP2Photo = await uploadBytes(p2PhotoRef, p2Photo);
          const urlP2Photo = await getDownloadURL(snapshotP2Photo.ref);

          //photo example
          const photoExampleRef = ref(
            storage,
            `DataCenters/${photoExample.name + v4()}`
          );
          const snapshotPhotoExample = await uploadBytes(
            photoExampleRef,
            photoExample
          );
          const urlPhotoExample = await getDownloadURL(
            snapshotPhotoExample.ref
          );

          const newDataCenter = {
            mobile,
            imageurl: urlPhotoExample,
            p1,
            p2,
            p1Photo: urlP1Photo,
            p2Photo: urlP2Photo,
            city: selectedCity,
            state: selectedState,
            status: 1,
            createdAt: new Date().toLocaleString("en-US", timestampOptions),
          };

          await dataCenterServices.addDataCenter(newDataCenter);

          ToastMessage({
            message: "DataCenter Added Successfully!",
            type: "success",
          });
          setLoading(false);
          navigate("../admin-all-datacenters");
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  return (
    <div className="user-query-content-main">
      <div className={"user-query-main-content"}>
        <h2 style={{ textDecoration: "underline" }}>Add Document</h2>
        <div className="form-group">
          <label htmlFor="mobile">Mobile Number:</label>
          <div>
            <input
              type="text"
              maxLength={10}
              minLength={10}
              placeholder="Mobile"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
              }}
            />
            {mobileError && <span className="error">{mobileError}</span>}
          </div>
        </div>
        <div className="title-and-ministry-form">
          <div className="form-group">
            <label htmlFor="p1">Person 1:</label>
            <div>
              <input
                type="text"
                placeholder="Person 1"
                value={p1}
                onChange={(e) => {
                  setP1(e.target.value);
                }}
              />
              {p1Error && <span className="error">{p1Error}</span>}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="p2">Person 2:</label>
            <div>
              <input
                type="text"
                placeholder="Person 2"
                value={p2}
                onChange={(e) => {
                  setP2(e.target.value);
                }}
              />
              {p2Error && <span className="error">{p2Error}</span>}
            </div>
          </div>
        </div>

        <div className="title-and-ministry-form">
          <div
            className="form-group"
            style={{ marginTop: "20px", textAlign: "center" }}
          >
            <label htmlFor="photo">Upload P1 Image:</label>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                type="file"
                id="photo"
                accept=".jpg, .jpeg, .png, .gif"
                onChange={handleP1PhotoChange}
                style={{
                  maxWidth: "300px",
                }}
              />
              {p1PhotoError && <span className="error">{p1PhotoError}</span>}
              {p1Photo && (
                <div className="p-banner-container">
                  <img
                    src={URL.createObjectURL(p1Photo)}
                    alt="Photo Example"
                    className="avatar-preview"
                  />
                </div>
              )}
            </div>
          </div>
          <div
            className="form-group"
            style={{ marginTop: "20px", textAlign: "center" }}
          >
            <label htmlFor="photo">Upload P2 Image:</label>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                type="file"
                id="photo"
                accept=".jpg, .jpeg, .png, .gif"
                onChange={handleP2PhotoChange}
                style={{
                  maxWidth: "300px",
                }}
              />
              {p2PhotoError && <span className="error">{p2PhotoError}</span>}
              {p2Photo && (
                <div className="p-banner-container">
                  <img
                    src={URL.createObjectURL(p2Photo)}
                    alt="Photo Example"
                    className="avatar-preview"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mobile-and-ministry-form">
          <div
            className="form-group"
            style={{ marginTop: "20px", textAlign: "center" }}
          >
            <label htmlFor="photo">Upload Image:</label>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                type="file"
                id="photo"
                accept=".jpg, .jpeg, .png, .gif"
                onChange={handlePhotoExampleChange}
                style={{
                  maxWidth: "300px",
                }}
              />
              {photoExampleError && (
                <span className="error">{photoExampleError}</span>
              )}
              {photoExample && (
                <div className="p-banner-container">
                  <img
                    src={URL.createObjectURL(photoExample)}
                    alt="Photo Example"
                    className="avatar-preview"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <label htmlFor="state">Select State:</label>
        <div>
          <select value={selectedState || ""} onChange={handleStateChange}>
            <option value="" disabled>
              Select State
            </option>
            {stateOptions.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
        </div>
        {stateError && <span className="error">{stateError}</span>}

        <label htmlFor="city" style={{ marginTop: "10px" }}>
          Select City:
        </label>
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
        </div>
        {cityError && <span className="error">{cityError}</span>}

        {!loading ? (
          <>
            <button
              onClick={submitDocument}
              className="login-button"
              style={{ maxWidth: "300px" }}
            >
              Submit Document
            </button>
          </>
        ) : (
          <CircularLoading />
        )}
      </div>
    </div>
  );
}

export default AddDataCenterByAdmin;
