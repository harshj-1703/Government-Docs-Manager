import React from "react";

function MyUploadedDocs({ isMenuShow }) {
  return (
    <div className="document-detail-main-div">
      <div
        className={
          isMenuShow ? "document-detail-div-blur" : "document-detail-div"
        }
      >
        
      </div>
    </div>
  );
}

export default MyUploadedDocs;
