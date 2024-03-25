import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import "../../css/user-query.css";
import CircularLoading from "../CircularLoading";
import ToastMessage from "../ToastMessage";
import { useNavigate } from "react-router-dom";
import documentService from "../../services/document.services";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../firebase";

function AddDocumentByAdmin() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [ministry, setMinistry] = useState("");
  const [ministryError, setMinistryError] = useState("");
  const [banner, setBanner] = useState(null);
  const [bannerError, setBannerError] = useState("");
  const [photoExample, setPhotoExample] = useState(null);
  const [photoExampleError, setPhotoExampleError] = useState("");
  const [requiredDocs, setRequiredDocs] = useState([
    { title: "", type: "file" },
  ]);
  const [requiredDocsErrors, setRequiredDocsErrors] = useState([{}]);
  const [checkingProcess, setCheckingProcess] = useState("vote");

  const validateDescription = (value) => {
    if (value.trim() === "") {
      setDescriptionError("Description is required.");
      return false;
    } else if (value.length > 5000) {
      setDescriptionError("Description Length Must Less Then 2000 letters");
      return false;
    } else {
      setDescriptionError("");
      return true;
    }
  };

  const validateTitle = (value) => {
    if (value.trim() === "") {
      setTitleError("Title is required.");
      return false;
    } else if (value.length > 35) {
      setTitleError("Title Length Must Less Then 35 letters");
      return false;
    } else if (/^[a-zA-Z\s]*$/.test(value)) {
      setTitleError("");
      return true;
    } else {
      setTitleError(
        "Invalid characters in the Title. Use only letters and spaces."
      );
      return false;
    }
  };

  const validateMinistry = (value) => {
    if (value.trim() === "") {
      setMinistryError("Ministry Name is required.");
      return false;
    } else if (value.length > 35) {
      setMinistryError("Ministry Name Length Must Less Then 35 letters");
      return false;
    } else if (/^[a-zA-Z\s]*$/.test(value)) {
      setMinistryError("");
      return true;
    } else {
      setMinistryError(
        "Invalid characters in the Ministry. Use only letters and spaces."
      );
      return false;
    }
  };

  const validateBanner = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSizeInBytes = 500 * 1024;

    if (!file) {
      setBannerError("Banner is required.");
      return false;
    }

    if (!allowedTypes.includes(file.type)) {
      setBannerError("Invalid file type. Please upload a JPG, PNG, or GIF.");
      return false;
    }

    if (file.size > maxSizeInBytes) {
      setBannerError("File size exceeds 500 KB limit.");
      return false;
    }

    setBannerError("");
    return true;
  };

  const handleBannerChange = (e) => {
    const selectedPhoto = e.target.files[0];
    validateBanner(selectedPhoto);
    setBanner(selectedPhoto);
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

  const addRequiredDoc = () => {
    if (requiredDocs.length < 8) {
      setRequiredDocs([...requiredDocs, { title: "", type: "file" }]);
    }
  };

  const removeRequiredDoc = (index) => {
    const updatedDocs = [...requiredDocs];
    updatedDocs.splice(index, 1);
    setRequiredDocs(updatedDocs);
  };

  const handleRequiredDocChange = (index, key, value) => {
    const updatedDocs = [...requiredDocs];
    updatedDocs[index][key] = value;
    setRequiredDocs(updatedDocs);
  };

  const validateRequiredDocs = () => {
    const errors = [];
    let isValid = true;

    requiredDocs.forEach((doc, index) => {
      const docErrors = {};
      if (doc.title.trim() === "") {
        docErrors.title = "Document Title is required.";
        isValid = false;
      }
      errors[index] = docErrors;
    });

    setRequiredDocsErrors(errors);
    return isValid;
  };

  const submitDocument = async () => {
    const isDescriptionValid = validateDescription(content);
    const isTitlevalid = validateTitle(title);
    const isMinistryValid = validateMinistry(ministry);
    const isBannerValid = validateBanner(banner);
    const isPhotoExamplevalid = validatePhotoExample(photoExample);
    const isRequiredDocsValid = validateRequiredDocs();

    if (
      isDescriptionValid &&
      isTitlevalid &&
      isMinistryValid &&
      isBannerValid &&
      isPhotoExamplevalid &&
      isRequiredDocsValid
    ) {
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
        //banner
        const bannerRef = ref(storage, `DocumentsPhotos/${banner.name + v4()}`);
        const snapshotBanner = await uploadBytes(bannerRef, banner);
        const urlBanner = await getDownloadURL(snapshotBanner.ref);

        //photo example
        const photoExampleRef = ref(
          storage,
          `DocumentsPhotos/${photoExample.name + v4()}`
        );
        const snapshotPhotoExample = await uploadBytes(
          photoExampleRef,
          photoExample
        );
        const urlPhotoExample = await getDownloadURL(snapshotPhotoExample.ref);

        const requiredDocsObject = requiredDocs.reduce((acc, doc) => {
          acc[doc.title] = doc.type;
          return acc;
        }, {});

        await documentService.addDocument({
          title,
          description: content,
          fields: requiredDocsObject,
          ministry,
          banner: urlBanner,
          photoExample: urlPhotoExample,
          state: "india",
          status: 1,
          uploadedBy: "Users",
          verification: checkingProcess,
          createdAt: new Date().toLocaleString("en-US", timestampOptions),
        });
        ToastMessage({
          message: "Document Added Successfully!",
          type: "success",
        });
        setLoading(false);
        navigate("../admin-all-document");
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="user-query-content-main">
      <div className={"user-query-main-content"}>
        <h2 style={{ textDecoration: "underline" }}>Add Document</h2>

        <div className="title-and-ministry-form">
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <div>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              {titleError && <span className="error">{titleError}</span>}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="ministry">Ministry:</label>
            <div>
              <input
                type="text"
                placeholder="Ministry"
                value={ministry}
                onChange={(e) => {
                  setMinistry(e.target.value);
                }}
              />
              {ministryError && <span className="error">{ministryError}</span>}
            </div>
          </div>
        </div>

        <label htmlFor="description">Description:</label>
        <div className="joi-editor-container">
          <JoditEditor
            className="joi-editor-Description"
            ref={editor}
            value={content}
            tabIndex={1}
            onChange={(newContent) => {
              setContent(newContent);
            }}
          />
        </div>
        {descriptionError && <span className="error">{descriptionError}</span>}

        <div className="title-and-ministry-form">
          <div
            className="form-group"
            style={{ marginTop: "20px", textAlign: "center" }}
          >
            <label htmlFor="photo">Upload Banner:</label>
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
                onChange={handleBannerChange}
                style={{
                  maxWidth: "300px",
                }}
              />
              {bannerError && <span className="error">{bannerError}</span>}
              {banner && (
                <div className="banner-container">
                  <img
                    src={URL.createObjectURL(banner)}
                    alt="Banner"
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
            <label htmlFor="photo">Document Example Photo:</label>
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
                <div className="banner-container">
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

        <div className="form-group-doc">
          <label htmlFor="documents-required">Documents Required:</label>
          <div>
            {requiredDocs.map((doc, index) => (
              <div key={index}>
                {requiredDocsErrors[index]?.title && (
                  <span className="error">
                    {requiredDocsErrors[index].title}
                  </span>
                )}
                <div key={index} className="required-docs-div">
                  <input
                    type="text"
                    placeholder="Document Title"
                    value={doc.title}
                    onChange={(e) =>
                      handleRequiredDocChange(index, "title", e.target.value)
                    }
                  />
                  <div className="file-types-select-menu-div" key={index}>
                    <select
                      value={doc.type}
                      onChange={(e) =>
                        handleRequiredDocChange(index, "type", e.target.value)
                      }
                      style={{ width: "120px" }}
                    >
                      <option value="file">File</option>
                      <option value="image">Image</option>
                      <option value="text">Text</option>
                      <option value="number">Number</option>
                    </select>
                    {index === 0 && (
                      <i
                        className="material-icons add-icon"
                        onClick={addRequiredDoc}
                        title="Add Document"
                      >
                        add
                      </i>
                    )}
                    {index > 0 && (
                      <i
                        className="material-icons remove-icon"
                        onClick={() => removeRequiredDoc(index)}
                      >
                        delete
                      </i>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <label htmlFor="checking-process">Checking Process:</label>
        <select
          defaultValue={"vote"}
          onChange={(e) => setCheckingProcess(e.target.value)}
        >
          <option value={"vote"}>Vote Based</option>
          <option value={"random"}>Random Type</option>
        </select>
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

export default AddDocumentByAdmin;
