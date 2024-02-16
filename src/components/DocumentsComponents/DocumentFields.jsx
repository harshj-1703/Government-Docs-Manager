import React, { useEffect, useState } from "react";
import "../../css/documentfields.css";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import CircularLoading from "../CircularLoading";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import uploadedByUsersDocumentService from "../../services/uploadedDocByUser.services";
import ToastMessage from "../ToastMessage";
import { useNavigate } from "react-router-dom";
import dataCenterServices from "../../services/data-center.services";

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

function DocumentFields({ fields, docId, verificationType }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;
    const inputType = fields[name];

    let error = "";

    if (type === "file") {
      const file = files[0];
      if (file) {
        if (inputType === "image") {
          if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
            error =
              "Only .jpeg, .jpg, and .png file types are allowed for image";
          } else if (file.size > 500 * 1024) {
            error = "Image size exceeds 500kb limit";
          }
        } else if (inputType === "file") {
          if (file.type !== "application/pdf") {
            error = "Only .pdf file type is allowed for PDF";
          } else if (file.size > 1024 * 1024) {
            error = "PDF size exceeds 1MB limit";
          }
        } else if (inputType === "video") {
          if (!["video/mp4", "video/mkv"].includes(file.type)) {
            error = "Only .mp4 and .mkv file types are allowed for video";
          } else if (file.size > 5 * 1024 * 1024) {
            error = "Video size exceeds 5MB limit";
          }
        }
      }
    }

    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorsObj = {};
    Object.entries(fields).forEach(([name, inputType]) => {
      const file = formData[name];
      if (
        (inputType === "file" ||
          inputType === "image" ||
          inputType === "video") &&
        file &&
        errors[name]
      ) {
        errorsObj[name] = errors[name];
      } else if (!file) {
        errorsObj[name] = `${name} is required`;
      }
    });
    setErrors(errorsObj);
    if (Object.keys(errorsObj).length === 0) {
      setIsLoading(true);
      try {
        for (const x in formData) {
          if (formData[x] instanceof File) {
            const fileRef = ref(
              storage,
              `UserUploadedDocs/${formData[x].name + v4()}`
            );
            const snapshotFile = await uploadBytes(fileRef, formData[x]);
            const urlFile = await getDownloadURL(snapshotFile.ref);
            formData[x] = urlFile;
          }
        }
        formData["docId"] = docId;
        const mobile = localStorage.getItem("mobile");
        formData["userMobile"] = mobile;
        formData["verifyRatio"] = 0;
        if (verificationType === "random") {
          formData["randomDataCenterId"] =
            await dataCenterServices.getRandomDataCenterId();
        }
        formData["status"] = "Pending";
        formData["createdAt"] = new Date().toLocaleString(
          "en-US",
          timestampOptions
        );
        formData["updatedAt"] = new Date().toLocaleString(
          "en-US",
          timestampOptions
        );
        await uploadedByUsersDocumentService.addUploadedByUsersDocument(
          formData
        );
        ToastMessage({
          message: "Document Uploaded Successfully!",
          type: "success",
        });
        navigate("/user-dashboard");
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="document-page-fields">
      <LazyLoadComponent>
        <div className="title">Apply For Document</div>
        <hr />
        <form className="fields" onSubmit={handleSubmit}>
          {Object.entries(fields).map(([label, inputType]) => (
            <div key={label} className="each-field-input-label">
              <label>
                {" "}
                {label + "(" + (inputType === "file" ? "PDF" : inputType) + ")"}
                *
              </label>{" "}
              {errors[label] && (
                <div className="error-message">{errors[label]}</div>
              )}
              {inputType === "file" ||
              inputType === "image" ||
              inputType === "video" ? (
                <>
                  <input
                    type="file"
                    name={label}
                    onChange={handleChange}
                    accept={
                      inputType === "image"
                        ? ".jpg,.jpeg,.png"
                        : inputType === "video"
                        ? ".mp4,.mkv"
                        : ".pdf"
                    }
                    className={errors[label] ? "error" : ""}
                  />
                </>
              ) : (
                <input
                  type={inputType}
                  name={label}
                  onChange={handleChange}
                  value={formData[label] || ""}
                  className={errors[label] ? "error" : ""}
                />
              )}
            </div>
          ))}
          <button type="submit" className="login-button">
            Submit Documents
          </button>
        </form>
      </LazyLoadComponent>
      {isLoading && <CircularLoading />}
    </div>
  );
}

export default DocumentFields;
