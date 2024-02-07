import React from "react";
import "../../css/documentfields.css";
import { LazyLoadComponent } from "react-lazy-load-image-component";

function DocumentFields({ fields }) {
  return (
    <div className="document-page-fields">
      <LazyLoadComponent>
        <div className="title">Apply For Document</div>
        <hr />
        <form className="fields" onSubmit={(e)=>e.preventDefault()}>
          {Object.entries(fields).map(([label, inputType]) => (
            <div key={label} className="each-field-input-label">
              <label>{label}</label>
              <input type={inputType} name={label} />
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
