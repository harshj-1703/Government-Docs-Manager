import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import "../../css/user-query.css";

function UserQueries({ isMenuShow }) {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [queryError, setQueryError] = useState("");

  const validateQueries = (value) => {
    if (value.trim() === "") {
      setQueryError("Address is required.");
      return false;
    } else if (value.length > 500) {
      setQueryError("Address Length Must Less Then 500 letters");
      return false;
    } else {
      setQueryError("");
      return true;
    }
  };

  const submitQuery = () => {
    const isQueryValid = validateQueries(content);
  };

  return (
    <div className="user-query-content-main">
      <div
        className={
          isMenuShow
            ? "user-query-main-content-blur"
            : "user-query-main-content"
        }
      >
        <h2>Enter Your Query</h2>
        <div className="joi-editor-container">
          <JoditEditor
            className="joi-editor-query"
            ref={editor}
            value={content}
            tabIndex={1}
            onChange={(newContent) => {
              setContent(newContent);
            }}
          />
        </div>
        {queryError && <span className="error">{queryError}</span>}
      </div>
    </div>
  );
}

export default UserQueries;
