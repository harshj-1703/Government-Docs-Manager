import React, { useEffect, useState } from "react";
import "../../css/user-query.css";
import CircularLoading from "../CircularLoading";
import ToastMessage from "../ToastMessage";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../firebase";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

function AddPostersByAdmin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [p1Photo, setP1Photo] = useState("");
  const [p1PhotoError, setP1PhotoError] = useState("");
  const [p2Photo, setP2Photo] = useState("");
  const [p2PhotoError, setP2PhotoError] = useState("");
  const [p3Photo, setP3Photo] = useState("");
  const [p3PhotoError, setP3PhotoError] = useState("");
  const [p4Photo, setP4Photo] = useState("");
  const [p4PhotoError, setP4PhotoError] = useState("");

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

  const handleP1PhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    validateP1Photo(selectedPhoto);
    setP1Photo(selectedPhoto);
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

  const handleP2PhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    validateP2Photo(selectedPhoto);
    setP2Photo(selectedPhoto);
  };

  const validateP3Photo = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSizeInBytes = 500 * 1024;

    if (!file) {
      setP3PhotoError("Photo is required.");
      return false;
    }

    if (!allowedTypes.includes(file.type)) {
      setP3PhotoError("Invalid file type. Please upload a JPG, PNG, or GIF.");
      return false;
    }

    if (file.size > maxSizeInBytes) {
      setP3PhotoError("File size exceeds 500 KB limit.");
      return false;
    }

    setP3PhotoError("");
    return true;
  };

  const handleP3PhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    validateP3Photo(selectedPhoto);
    setP3Photo(selectedPhoto);
  };

  const validateP4Photo = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSizeInBytes = 500 * 1024;

    if (!file) {
      setP4PhotoError("Photo is required.");
      return false;
    }

    if (!allowedTypes.includes(file.type)) {
      setP4PhotoError("Invalid file type. Please upload a JPG, PNG, or GIF.");
      return false;
    }

    if (file.size > maxSizeInBytes) {
      setP4PhotoError("File size exceeds 500 KB limit.");
      return false;
    }

    setP4PhotoError("");
    return true;
  };

  const handleP4PhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    validateP4Photo(selectedPhoto);
    setP4Photo(selectedPhoto);
  };

  const submitDocument = async () => {
    const validateP1 = validateP1Photo(p1Photo);
    const validateP2 = validateP2Photo(p2Photo);
    const validateP3 = validateP3Photo(p3Photo);
    const validateP4 = validateP4Photo(p4Photo);
    if (validateP1 && validateP2 && validateP3 && validateP4) {
      try {
        setLoading(true);
        //p1 Photo
        const p1PhotoRef = ref(storage, `Posters/${p1Photo.name + v4()}`);
        const snapshotP1Photo = await uploadBytes(p1PhotoRef, p1Photo);
        const urlP1Photo = await getDownloadURL(snapshotP1Photo.ref);

        //p2 Photo
        const p2PhotoRef = ref(storage, `Posters/${p2Photo.name + v4()}`);
        const snapshotP2Photo = await uploadBytes(p2PhotoRef, p2Photo);
        const urlP2Photo = await getDownloadURL(snapshotP2Photo.ref);

        //p3 Photo
        const p3PhotoRef = ref(storage, `Posters/${p3Photo.name + v4()}`);
        const snapshotP3Photo = await uploadBytes(p3PhotoRef, p3Photo);
        const urlP3Photo = await getDownloadURL(snapshotP3Photo.ref);

        //p2 Photo
        const p4PhotoRef = ref(storage, `Posters/${p4Photo.name + v4()}`);
        const snapshotP4Photo = await uploadBytes(p4PhotoRef, p4Photo);
        const urlP4Photo = await getDownloadURL(snapshotP4Photo.ref);

        const addPosters = async () => {
          try {
            const postersRef = collection(db, "Posters");
            await addDoc(postersRef, {
              urlP1Photo,
              urlP2Photo,
              urlP3Photo,
              urlP4Photo,
              createdAt: new Date(),
            });
          } catch (error) {
            console.log(error);
            throw error;
          }
        };
        await addPosters();
        ToastMessage({
          message: "Added New Posters Successfully!",
          type: "success",
        });
        setLoading(false);
        navigate("../");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="user-query-content-main">
      <div className={"user-query-main-content"}>
        <h2 style={{ textDecoration: "underline" }}>Add Posters</h2>
        <div className="title-and-ministry-form">
          <div
            className="form-group"
            style={{ marginTop: "20px", textAlign: "center" }}
          >
            <label htmlFor="photo">Upload Poster 1:</label>
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
                <div className="banner-container">
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
            <label htmlFor="photo">Upload Poster 2:</label>
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
                <div className="banner-container">
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

        <div className="title-and-ministry-form">
          <div
            className="form-group"
            style={{ marginTop: "20px", textAlign: "center" }}
          >
            <label htmlFor="photo">Upload Poster 3:</label>
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
                onChange={handleP3PhotoChange}
                style={{
                  maxWidth: "300px",
                }}
              />
              {p3PhotoError && <span className="error">{p3PhotoError}</span>}
              {p3Photo && (
                <div className="banner-container">
                  <img
                    src={URL.createObjectURL(p3Photo)}
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
            <label htmlFor="photo">Upload Poster 4:</label>
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
                onChange={handleP4PhotoChange}
                style={{
                  maxWidth: "300px",
                }}
              />
              {p4PhotoError && <span className="error">{p4PhotoError}</span>}
              {p4Photo && (
                <div className="banner-container">
                  <img
                    src={URL.createObjectURL(p4Photo)}
                    alt="Photo Example"
                    className="avatar-preview"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

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

export default AddPostersByAdmin;
