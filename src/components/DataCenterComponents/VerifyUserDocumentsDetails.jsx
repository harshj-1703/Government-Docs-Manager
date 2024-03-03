import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import uploadedByUsersDocumentService from "../../services/uploadedDocByUser.services";
import "../../css/verifyuserdocumentsdetails.css";

function VerifyUserDocumentsDetails() {
  const location = useLocation();
  const uploadedDocId = location.state;
  const [documentData, setDocumentData] = useState(null);

  const fetchData = async () => {
    const uploadedDocumentData =
      await uploadedByUsersDocumentService.getDocumentFromId(uploadedDocId);
    setDocumentData(uploadedDocumentData);
    // console.log(uploadedDocumentData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="vudd-container">
      {documentData && (
        <div className="vudd-details">
          <h1>{documentData.title}</h1>
          <p>{documentData.ministry}</p>
          <img src={documentData.banner} alt="Banner" className="vudd-banner" />
          <div className="vudd-user-info">
            <img
              src={documentData.userProfileImage}
              alt="User Profile"
              className="vudd-profile-image"
            />
            <div>
              <p>
                <i className="material-icons">person</i>{" "}
                {documentData.userFullName}
              </p>
              <p>
                <i className="material-icons">phone</i>{" "}
                {documentData.userMobile}
              </p>
            </div>
          </div>
          <div className="vudd-fields">
            {Object.entries(documentData.fields).map(
              ([fieldName, fieldValue]) => (
                <div className="vudd-field" key={fieldName}>
                  <h2>{fieldName}</h2>
                  {fieldValue === "file" ||
                  fieldValue === "image" ||
                  fieldValue === "video" ? (
                    <a
                      href={documentData[fieldName]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Document
                    </a>
                  ) : (
                    <p>{documentData[fieldName]}</p>
                  )}
                </div>
              )
            )}
          </div>
          <p className="vudd-updatedat">
            <i className="material-icons">schedule</i> &nbsp;
            {documentData.updatedAt}
          </p>
          <p className="vudd-progress-text">
            Verification Progress: {documentData.verifyRatio}%
          </p>
          {parseInt(documentData.verifyRatio) >= 0 && (
            <div className="vudd-progress-bar">
              <div
                className="vudd-progress-fill"
                style={{ width: `${documentData.verifyRatio}%` }}
              />
            </div>
          )}
          <div className="vudd-hr"></div>
          <div className="vudd-dc-verify-remarks">
            <textarea
              placeholder="Add remarks here"
              className="data-center-remark-input"
              type="text"
              rows={3}
              maxLength={300}
            ></textarea>
          </div>
          <div className="vudd-buttons">
            <button>Approve</button>
            <button>Reject</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyUserDocumentsDetails;
