import React, { useState } from "react";
import "../../css/documentfields.css";
import { LazyLoadComponent } from "react-lazy-load-image-component";

function DocumentFields({ fields }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errorsObj = {};
    Object.entries(fields).forEach(([label, inputType]) => {
      if (!formData[label]) {
        errorsObj[label] = `${label} is required`;
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
              <label>{label}</label>{" "}
              {errors[label] && (
                <div className="error-message">{errors[label]}</div>
              )}
              <input
                type={inputType}
                name={label}
                onChange={handleChange}
                value={formData[label] || ""}
                className={errors[label] ? "error" : ""}
              />
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
