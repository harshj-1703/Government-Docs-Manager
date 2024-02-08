import React, { useState } from "react";
import "../../css/documentfields.css";
import { LazyLoadComponent } from "react-lazy-load-image-component";

function DocumentFields({ fields }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    let errorsObj = {};
    Object.entries(fields).forEach(([name, inputType]) => {
      const file = formData[name];
      if (inputType === "file" && file && errors[name]) {
        errorsObj[name] = errors[name];
      } else if (!file) {
        errorsObj[name] = `${name} is required`;
      }
    });
    setErrors(errorsObj);
    if (Object.keys(errorsObj).length === 0) {
      console.log("Form submitted successfully:", formData);
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
              {inputType === "file" || inputType === "image" ? (
                <>
                  <input
                    type="file"
                    name={label}
                    onChange={handleChange}
                    accept={inputType === "image" ? ".jpg,.jpeg,.png" : ".pdf"}
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
    </div>
  );
}

export default DocumentFields;
